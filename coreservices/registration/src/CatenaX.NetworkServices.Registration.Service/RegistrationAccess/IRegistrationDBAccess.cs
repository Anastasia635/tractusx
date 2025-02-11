﻿using CatenaX.NetworkServices.Cosent.Library.Data;
using CatenaX.NetworkServices.Registration.Service.Model;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace CatenaX.NetworkServices.Registration.Service.RegistrationAccess
{
    public interface IRegistrationDBAccess
    {
        Task<IEnumerable<CompanyRole>> GetAllCompanyRoles();
        Task<IEnumerable<ConsentForCompanyRole>> GetConsentForCompanyRole(int roleId);
        Task SetCompanyRoles(CompanyToRoles rolesToSet);
        Task SignConsent(SignConsentRequest signedConsent);
        Task<IEnumerable<SignedConsent>> SignedConsentsByCompanyId(string companyId);
        Task SetIdp(SetIdp idpToSet);
    }
}
