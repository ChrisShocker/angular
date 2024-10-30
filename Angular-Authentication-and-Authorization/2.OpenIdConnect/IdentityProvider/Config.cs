using Duende.IdentityServer.Models;

namespace Globomantics.Idp;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            // requested to get identity token 
            new IdentityResources.OpenId(),
            // requested to get user profile
            new IdentityResources.Profile(),
        };

    public static IEnumerable<Client> Clients =>
        new Client[]
        {
            // interactive client using code flow + pkce
            new Client
            {
                ClientId = "angular",
                ClientSecrets = { new Secret("49C1A7E1-0C79-4A89-A3D6-A37998FB86B0".Sha256()) },

                AllowedGrantTypes = GrantTypes.Code,
                RequirePkce = true,

                RedirectUris = { "https://localhost:7180/signin-oidc" },
                BackChannelLogoutUri = "https://localhost:7180/account/backchannel",
                PostLogoutRedirectUris = { "https://localhost:7180/signout-callback-oidc" },

                AlwaysIncludeUserClaimsInIdToken = true,
                // scopes client can request
                AllowedScopes = { "openid", "profile" }
            },
        };
}