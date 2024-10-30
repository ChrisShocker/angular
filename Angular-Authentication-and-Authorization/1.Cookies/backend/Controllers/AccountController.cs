using Globomantics.Backend.Models;
using Globomantics.Backend.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Globomantics.Backend.Controllers;

[Route("/account/[action]")]
public class AccountController : Controller
{
    private readonly UserRepository userRepository;
    public AccountController(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    // endpoints with the Authorize decorator require a valid cookie
    [Authorize]
    public IEnumerable<UserClaim> GetUserClaims()
    {
        // get all calims for the user
        foreach (var claim in User.Claims)
            yield return new UserClaim { Type = claim.Type, Value = claim.Value };
    }

    public IActionResult Login() => View(new LoginModel());

    [HttpPost]
    public async Task<IActionResult> Login(LoginModel model)
    {
        // check if valid user
        var user = userRepository.GetByUsernameAndPassword(model.Username, model.Password);
        if (user == null)
            return Unauthorized();

        // build claims for user form db
        var claims = new List<Claim>
        {
            new Claim("sub", user.Id.ToString()),
            new Claim("name", user.Name),
            new Claim("role", user.Role),
            new Claim("FavoriteColor", user.FavoriteColor)
        };

        // user identity with all user claims 
        var identity = new ClaimsIdentity(claims, 
            CookieAuthenticationDefaults.AuthenticationScheme);
        // contains one or more user idenities
        var principal = new ClaimsPrincipal(identity);

        // sign in user with cookie
        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, 
            principal);

        // redirect user back to root
        return Redirect("/");
    }

    // endpoints with the Authorize decorator require a valid cookie
    [Authorize]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(
            CookieAuthenticationDefaults.AuthenticationScheme);
        return Redirect("/");
    }
}
