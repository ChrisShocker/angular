using Globomantics.Backend.Models;
using Globomantics.Backend.Repositories;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSpaYarp();
builder.Services.AddAuthorization();
builder.Services.AddSingleton<HouseRepository>();
builder.Services.AddSingleton<BidRepository>();

builder.Services.AddBff(o => o.ManagementBasePath = "/account")
// reserve memory space for each user where claims and access tokens are stored
// instead of having it all in the identity cookie
    .AddServerSideSessions();

builder.Services.AddAuthentication(o =>
    {
        // set authentication schemes
        o.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        o.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
        o.DefaultSignOutScheme = OpenIdConnectDefaults.AuthenticationScheme;
    })
    .AddCookie(o =>
    {
        o.Cookie.Name = "__Host-spa";
        o.Cookie.SameSite = SameSiteMode.Strict;
        o.Events.OnRedirectToLogin = (context) =>
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        };
    })
    // Add OpenIdConnect authentication
    .AddOpenIdConnect(options =>
    {
        // url to the identity server
        options.Authority = "https://localhost:5001";

        options.ClientId = "angular";
        //Store in application secrets
        options.ClientSecret = "49C1A7E1-0C79-4A89-A3D6-A37998FB86B0";
        options.ResponseType = "code";
        options.SaveTokens = true;
        //options.GetClaimsFromUserInfoEndpoint = true;
    });

var app = builder.Build();

app.UseBff();

app.MapGet("/houses", [Authorize](HouseRepository repo) => repo.GetAll());
app.MapGet("/houses/{id:int}", [Authorize](int id, HouseRepository repo) => repo.GetHouse(id));
app.MapPost("/houses", [Authorize](House house, HouseRepository repo) =>
{
    repo.Add(house);
    return Results.Created($"/houses/{house.Id}", house);
});

app.MapGet("/houses/{id:int}/bids", [Authorize] (int id, BidRepository repo) => repo.GetBids(id));
app.MapPost("houses/{id:int}/bids", [Authorize] (Bid bid, BidRepository repo) =>
{
    repo.Add(bid);
    return Results.Created($"/houses/{bid.HouseId}/bids", bid);
});

app.UseAuthorization();

app.MapBffManagementEndpoints();
app.UseSpaYarp();

app.Run();