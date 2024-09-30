using Globomantics.Backend.Models;
using Globomantics.Backend.Repositories;
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSpaYarp();
// data for api
builder.Services.AddSingleton<HouseRepository>();
builder.Services.AddSingleton<BidRepository>();
builder.Services.AddSingleton<UserRepository>();

// registers views to hoop up up to MVC views
builder.Services.AddControllersWithViews();
// adds support for identity cookie
builder.Services.AddAuthentication()
    .AddCookie(o =>
    {
        //Prevents overwrites from subdomains
        o.Cookie.Name = "__Host-spa";
        o.Cookie.SameSite = SameSiteMode.Strict;
        o.Events.OnRedirectToLogin = (context) =>
        {
            context.Response.StatusCode = 
                StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline, API endpoints
// [Authorize] decorator prevents unauthorized access to the endpoint (uses identity cookie)
app.MapGet("/houses", [Authorize](HouseRepository repo) => repo.GetAll());
app.MapGet("/houses/{id:int}", [Authorize](int id, HouseRepository repo) => repo.GetHouse(id));
app.MapPost("/houses", [Authorize] (House house, HouseRepository repo) =>
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

app.MapControllers();

app.UseSpaYarp();

app.Run();
