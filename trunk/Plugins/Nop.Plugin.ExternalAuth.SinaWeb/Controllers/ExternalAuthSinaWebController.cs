using NetDimension.Weibo;
using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Core.Plugins;
using Nop.Plugin.ExternalAuth.SinaWeb.Core;
using Nop.Plugin.ExternalAuth.SinaWeb.Models;
using Nop.Services.Authentication.External;
using Nop.Services.Configuration;
using Nop.Services.Security;
using Nop.Services.Stores;
using Nop.Web.Framework.Controllers;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Nop.Web.Framework;

namespace Nop.Plugin.ExternalAuth.SinaWeb.Controllers
{
    public class ExternalAuthSinaWebController : BasePluginController
    {
        private readonly IExternalAuthorizer _authorizer;
        private readonly ISettingService _settingService;
        private readonly IPermissionService _permissionService;
        private readonly IOpenAuthenticationService _openAuthenticationService;
        private readonly ExternalAuthenticationSettings _externalAuthenticationSettings;
        private readonly IStoreContext _storeContext;
        private readonly IStoreService _storeService;
        private readonly IWorkContext _workContext;
        private readonly IPluginFinder _pluginFinder;
        public ExternalAuthSinaWebController(IExternalAuthorizer authorizer,
            ISettingService settingService,
            IPermissionService permissionService,
            IOpenAuthenticationService openAuthenticationService,
            ExternalAuthenticationSettings externalAuthenticationSettings,
            IStoreContext storeContext,
            IStoreService storeService,
            IWorkContext workContext,
            IPluginFinder pluginFinder)
        {
            this._authorizer = authorizer;
            this._settingService = settingService;
            this._permissionService = permissionService;
            this._openAuthenticationService = openAuthenticationService;
            this._externalAuthenticationSettings = externalAuthenticationSettings;
            this._storeContext = storeContext;
            this._storeService = storeService;
            this._workContext = workContext;
            this._pluginFinder = pluginFinder;
        }

        [AdminAuthorize]
        [ChildActionOnly]
        public ActionResult Configure()
        {
            if (!_permissionService.Authorize(StandardPermissionProvider.ManageExternalAuthenticationMethods))
                return Content("Access denied");

            //load settings for a chosen store scope
            var storeScope = this.GetActiveStoreScopeConfiguration(_storeService, _workContext);
            var sinaExternalAuthSettings = _settingService.LoadSetting<SinaWebExternalAuthSettings>(storeScope);

            var model = new ConfigurationModel();
            model.AppKey = sinaExternalAuthSettings.AppKey;
            model.AppSecret = sinaExternalAuthSettings.AppSecret;
            model.CallBackURI = sinaExternalAuthSettings.CallBackURI;
            //model.AuthorizeURL = sinaExternalAuthSettings.AuthorizeURL;
            model.ActiveStoreScopeConfiguration = storeScope;
            if (storeScope > 0)
            {
                model.AppKey_OverrideForStore = _settingService.SettingExists(sinaExternalAuthSettings, x => x.AppKey, storeScope);
                model.AppSecret_OverrideForStore = _settingService.SettingExists(sinaExternalAuthSettings, x => x.AppSecret, storeScope);
                model.CallBackURI_OverrideForStore = _settingService.SettingExists(sinaExternalAuthSettings, x => x.CallBackURI, storeScope);
                //model.AuthorizeURL_OverrideForStore = _settingService.SettingExists(sinaExternalAuthSettings, x => x.AuthorizeURL, storeScope);
            }

            return View("~/Plugins/ExternalAuth.SinaWeb/Views/ExternalAuthSinaWeb/Configure.cshtml", model);
        }

        [HttpPost]
        [AdminAuthorize]
        [ChildActionOnly]
        public ActionResult Configure(ConfigurationModel model)
        {
            if (!_permissionService.Authorize(StandardPermissionProvider.ManageExternalAuthenticationMethods))
                return Content("Access denied");

            if (!ModelState.IsValid)
                return Configure();

            //load settings for a chosen store scope
            var storeScope = this.GetActiveStoreScopeConfiguration(_storeService, _workContext);
            var sinaExternalAuthSettings = _settingService.LoadSetting<SinaWebExternalAuthSettings>(storeScope);

            //save settings
            sinaExternalAuthSettings.AppKey = model.AppKey;
            sinaExternalAuthSettings.AppSecret = model.AppSecret;
            sinaExternalAuthSettings.CallBackURI = model.CallBackURI;
            //sinaExternalAuthSettings.AuthorizeURL = model.AuthorizeURL;

            /* We do not clear cache after each setting update.
             * This behavior can increase performance because cached settings will not be cleared 
             * and loaded from database after each update */
            if (model.AppKey_OverrideForStore || storeScope == 0)
                _settingService.SaveSetting(sinaExternalAuthSettings, x => x.AppKey, storeScope, false);
            else if (storeScope > 0)
                _settingService.DeleteSetting(sinaExternalAuthSettings, x => x.AppKey, storeScope);

            if (model.AppSecret_OverrideForStore || storeScope == 0)
                _settingService.SaveSetting(sinaExternalAuthSettings, x => x.AppSecret, storeScope, false);
            else if (storeScope > 0)
                _settingService.DeleteSetting(sinaExternalAuthSettings, x => x.AppSecret, storeScope);
            if (model.CallBackURI_OverrideForStore || storeScope == 0)
                _settingService.SaveSetting(sinaExternalAuthSettings, x => x.CallBackURI, storeScope, false);
            else if (storeScope > 0)
                _settingService.DeleteSetting(sinaExternalAuthSettings, x => x.CallBackURI, storeScope);
            //if (model.AuthorizeURL_OverrideForStore || storeScope == 0)
            //    _settingService.SaveSetting(sinaExternalAuthSettings, x => x.AuthorizeURL, storeScope, false);
            //else if (storeScope > 0)
            //    _settingService.DeleteSetting(sinaExternalAuthSettings, x => x.AuthorizeURL, storeScope);

            //now clear settings cache
            _settingService.ClearCache();

            return Configure();
        }

        [ChildActionOnly]
        public ActionResult PublicInfo()
        {
            return View("~/Plugins/ExternalAuth.SinaWeb/Views/ExternalAuthSinaWeb/PublicInfo.cshtml");
        }


        [HttpGet]
        public ActionResult Login(string returnUrl)
        {
            var processor = _openAuthenticationService.LoadExternalAuthenticationMethodBySystemName("新浪微博外部认证");
            if (processor == null ||
                !processor.IsMethodActive(_externalAuthenticationSettings) ||
                !processor.PluginDescriptor.Installed ||
                !_pluginFinder.AuthenticateStore(processor.PluginDescriptor, _storeContext.CurrentStore.Id))
                throw new NopException("新浪微博模块没有被装载");
            var viewModel = new LoginModel();
            TryUpdateModel(viewModel);
            var authenticationUrl = RequestAuthentication();
            return new RedirectResult(authenticationUrl);
        }

        [ChildActionOnly]
        public string RequestAuthentication()
        {
            var storeScope = this.GetActiveStoreScopeConfiguration(_storeService, _workContext);
            var sinaExternalAuthSettings = _settingService.LoadSetting<SinaWebExternalAuthSettings>(storeScope);
            Client SinaClient = null;
            string authenticationUrl = string.Empty;
            if (Session["SinaWebOauth"] != null)
            {
                SinaClient = Session["SinaWebOauth"] as Client;
                authenticationUrl = SinaClient.OAuth.GetAuthorizeURL();
            }
            else
            {
                var oAuth = new OAuth(sinaExternalAuthSettings.AppKey, sinaExternalAuthSettings.AppSecret, sinaExternalAuthSettings.CallBackURI);
                authenticationUrl = oAuth.GetAuthorizeURL();
            }
            return authenticationUrl;
        }
        /// <summary> 
        /// 回调页面 
        /// </summary>

        public ActionResult LoginCallback(LoginModel model, string returnUrl)
        {
            Client sinaWebzone = this.Session["SinaWebOauth"] as Client;
            var verifier = Request.Params["code"];
            if (verifier != null)
            {
                if (sinaWebzone == null)
                {
                    var storeScope = this.GetActiveStoreScopeConfiguration(_storeService, _workContext);
                    var sinaWebExternalAuthSettings = _settingService.LoadSetting<SinaWebExternalAuthSettings>(storeScope);
                    sinaWebzone = new Client(new OAuth(sinaWebExternalAuthSettings.AppKey, sinaWebExternalAuthSettings.AppSecret, sinaWebExternalAuthSettings.CallBackURI));
                    sinaWebzone.OAuth.GetAccessTokenByAuthorizationCode(verifier);
                    if (sinaWebzone != null)
                    {
                        this.Session["SinaWebOauth"] = sinaWebzone;
                    }
                }
                else
                {
                    sinaWebzone = (Client)this.Session["SinaWebOauth"];
                }
                if (sinaWebzone.OAuth != null)
                {
                    if (string.IsNullOrEmpty(sinaWebzone.API.Entity.Account.GetUID()))
                        throw new Exception("Authentication result does not contain openid");

                    if (string.IsNullOrEmpty(sinaWebzone.OAuth.AccessToken))
                        throw new Exception("Authentication result does not contain accesstoken data");
                    var parameters = new OAuthAuthenticationParameters(Provider.SystemName)
                    {
                        ExternalIdentifier = sinaWebzone.API.Entity.Account.GetUID(),
                        OAuthToken = sinaWebzone.OAuth.AccessToken,
                        OAuthAccessToken = sinaWebzone.API.Entity.Account.GetUID(),

                    };
                    UserClaims claims = new UserClaims();
                    claims.Contact = new ContactClaims();
                    parameters.AddClaim(claims);
                    Session["SinaWebAuthorizeParameters"] = parameters;
                    var result = _authorizer.Authorize(parameters);
                    switch (result.Status)
                    {
                        case OpenAuthenticationStatus.Error:
                            {
                                if (!result.Success)
                                    foreach (var error in result.Errors)
                                        ExternalAuthorizerHelper.AddErrorsToDisplay(error);
                                return RedirectToRoute("ThirdAccountRegister", new { styleId = 2 });
                            }
                        case OpenAuthenticationStatus.AssociateOnLogon:
                            {
                                return new RedirectResult(Url.LogOn(returnUrl));
                            }
                        case OpenAuthenticationStatus.AutoRegisteredEmailValidation:
                            {
                                //result
                                return RedirectToRoute("RegisterResult", new { resultId = (int)UserRegistrationType.EmailValidation });
                            }
                        case OpenAuthenticationStatus.AutoRegisteredAdminApproval:
                            {
                                return RedirectToRoute("RegisterResult", new { resultId = (int)UserRegistrationType.AdminApproval });
                            }
                        case OpenAuthenticationStatus.AutoRegisteredStandard:
                            {
                                return RedirectToRoute("RegisterResult", new { resultId = (int)UserRegistrationType.Standard });
                            }
                        default:
                            break;
                    }

                }
                return Redirect(Url.Action("Index", "Home"));
            }
            return View();
        }
    }
}
