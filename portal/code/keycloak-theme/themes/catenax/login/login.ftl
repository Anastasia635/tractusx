<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=social.displayInfo displayWide=(realm.password && social.providers??); section>
    <#if section = "header">
    <span></span>
    <div id="logo-diplay"></div>
    <h2 class="kc-text-account-title">Create Your</h2>
    <h2 class="kc-text-account-title">Catena-X Account</h2>
    <div id="kc-text-account">To create your account and join the Catena-X automotive network. Please enter the password you received via text-message</div>
    <#elseif section = "form">
    <div id="kc-form" <#if realm.password && social.providers??>class="${properties.kcContentWrapperClass!}"</#if>>
        <div id="kc-form-wrapper" <#if realm.password && social.providers??>class="${properties.kcFormSocialAccountContentClass!} ${properties.kcFormSocialAccountClass!}"</#if>>
            <#if realm.password>
                <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
                    <div class="${properties.kcFormGroupClass!}">
                     <label>Company</label>
                     <div class='kc-realm-name'>${realm.name}</div>
                    </div>
                    <div class="${properties.kcFormGroupClass!}">
                     <label>Email</label>
                     <div class='kc-realm-name'>dorran.s.grey@xamplcorp.com</div>
                        <#if usernameEditDisabled??>
                            <input tabindex="1"  id="username" class="${properties.kcInputClass!} kc-form-hideborder" name="username" value="${(login.username!'')}" type="hidden" disabled placeholder="<#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if>" />
                        <#else>
                            <input tabindex="1" id="username" class="${properties.kcInputClass!} kc-form-hideborder" name="username" value="admin"  type="hidden" autocomplete="off" placeholder="<#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if>" />
                        </#if>
                    </div>

                    <div class="${properties.kcFormGroupClass!}">
                        <input tabindex="2" id="password" class="${properties.kcInputClass!}" name="password" type="password" autocomplete="off" placeholder="${msg("password")}" />
                    </div>

                    <div class="${properties.kcFormGroupClass!} ${properties.kcFormSettingClass!}">
                        <div id="kc-form-options">
                            <#if realm.rememberMe && !usernameEditDisabled??>
                                <div class="checkbox">
                                    <label>
                                        <div class="toggle">
                                            <#if login.rememberMe??>
                                                <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox" checked>
                                            <#else>
                                                <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox">
                                            </#if>
                                            <div class="dot"></div>
                                        </div>
                                        <div class="label-text">${msg("rememberMe")}</div>
                                    </label>
                                </div>
                            </#if>
                        </div>
                        <div id="kc-form-reset-psw" class="${properties.kcFormOptionsWrapperClass!}">
                            <#if realm.resetPasswordAllowed>
                                <span><a tabindex="5" href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a></span>
                            </#if>
                        </div>

                    </div>

                    <div id="kc-form-buttons" class="${properties.kcFormGroupClass!}">
                        <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                        <input tabindex="4" class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" name="login" id="kc-login" type="submit" value="Sign Up"/>
                    </div>
                </form>
                 <div id="kc-registration-footer">
                <div>Already Have an account <a tabindex="6" href="#">Log In</a></div>
                <div>Need <a tabindex="7" href="#">Help</a></div>
            </div>
            </#if>
        </div>
        <#if realm.password && social.providers??>
            <div id="kc-social-providers" class="${properties.kcFormSocialAccountContentClass!} ${properties.kcFormSocialAccountClass!}">
                <ul class="${properties.kcFormSocialAccountListClass!} <#if social.providers?size gt 4>${properties.kcFormSocialAccountDoubleListClass!}</#if>">
                    <#list social.providers as p>
                        <li class="${properties.kcFormSocialAccountListLinkClass!}"><a href="${p.loginUrl}" id="zocial-${p.alias}" class="zocial ${p.providerId}"> <span>${p.displayName}</span></a></li>
                    </#list>
                </ul>
            </div>
        </#if>
    </div>
    <#elseif section = "info" >
            <div id="kc-registration">
                <span>${msg("noAccount")} <a tabindex="6" href="${url.registrationUrl}">${msg("doRegister")}</a></span>
            </div>
    </#if>
</@layout.registrationLayout>
