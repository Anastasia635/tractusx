using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Keycloak.Net.Models.Users;
using CatenaX.NetworkServices.Provisioning.Library.Models;

namespace CatenaX.NetworkServices.Provisioning.Library
{
    public partial class ProvisioningManager
    {
        private Task<string> CreateSharedRealmUserAsync(string realm, UserProfile profile)
        {
            var newUser = CloneUser(_Settings.SharedUser);
            newUser.UserName = profile.UserName;
            newUser.FirstName = profile.FirstName;
            newUser.LastName = profile.LastName;
            newUser.Email = profile.Email;
            newUser.Credentials ??= profile.Password == null ? null : Enumerable.Repeat( new Credentials { Type = "Password", Value = profile.Password }, 1);
            return _SharedIdp.CreateAndRetrieveUserIdAsync(realm, newUser);
        }

        private Task<string> CreateCentralUserAsync(string alias, UserProfile profile, string companyName)
        {
            var newUser = CloneUser(_Settings.CentralUser);
            newUser.UserName = profile.UserName;
            newUser.FirstName = profile.FirstName;
            newUser.LastName = profile.LastName;
            newUser.Email = profile.Email;
            newUser.Attributes ??= new Dictionary<string,IEnumerable<string>>();
            newUser.Attributes[_Settings.MappedIdpAttribute] = Enumerable.Repeat<string>(alias,1);
            newUser.Attributes[_Settings.MappedCompanyAttribute] = Enumerable.Repeat<string>(companyName,1);
            return _CentralIdp.CreateAndRetrieveUserIdAsync(_Settings.CentralRealm, newUser);
        }

        private Task<bool> LinkCentralSharedRealmUserAsync(string alias, string centralUserId, string sharedUserId, string sharedUserName) =>
            _CentralIdp.AddUserSocialLoginProviderAsync(_Settings.CentralRealm, centralUserId, alias, new FederatedIdentity {
                IdentityProvider = alias,
                UserId = sharedUserId,
                UserName = sharedUserName
            });

        private async Task<string> GetCentralUserIdForProviderIdAsync(string idpName, string providerUserId)
        {
            var user = (await _CentralIdp.GetUsersAsync(_Settings.CentralRealm, username: idpName + "." + providerUserId, max: 1, briefRepresentation: true).ConfigureAwait(false))
                .SingleOrDefault();
            return user==null ? null : user.Id;
        }

        private async Task<string> GetSharedUserProviderIdAsync(string idpName, string userName)
        {
            var user = (await _SharedIdp.GetUsersAsync(idpName, username: userName, max: 1, briefRepresentation: true).ConfigureAwait(false))
                .SingleOrDefault();
            return user==null ? null : user.Id;
        }

        private async Task<string> GetCentralUserIdForSharedUserName(string idpName, string userName)
        {
            var sharedUserId = await GetSharedUserProviderIdAsync(idpName, userName).ConfigureAwait(false);
            if (sharedUserId == null) return null;
            return await GetCentralUserIdForProviderIdAsync(idpName, sharedUserId);
        }

        private User CloneUser(User user) =>
            JsonSerializer.Deserialize<User>(JsonSerializer.Serialize(user));
    }
}
