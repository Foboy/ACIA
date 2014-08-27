using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Core.Plugins;
using Nop.Plugin.ExternalAuth.QQ.Models;
using Nop.Services.Authentication.External;
using Nop.Services.Configuration;
using Nop.Services.Security;
using Nop.Services.Stores;
using Nop.Web.Framework.Controllers;
using System;
using System.Web.Mvc;
using QConnectSDK.Context;
using QConnectSDK.Api;
using QConnectSDK.Config;
using QConnectSDK;
using Nop.Plugin.ExternalAuth.QQ.Core;
using Nop.Web.Framework;
using System.Collections.Generic;

namespace Nop.Plugin.ExternalAuth.QQ.Controllers
{
    public class ExternalAuthQQController : BasePluginController
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

        public ExternalAuthQQController(IExternalAuthorizer authorizer,
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
            var qqExternalAuthSettings = _settingService.LoadSetting<QQExternalAuthSettings>(storeScope);

            var model = new ConfigurationModel();
            model.AppKey = qqExternalAuthSettings.AppKey;
            model.AppSecret = qqExternalAuthSettings.AppSecret;
            model.CallBackURI = qqExternalAuthSettings.CallBackURI;
            model.AuthorizeURL = qqExternalAuthSettings.AuthorizeURL;
            model.ActiveStoreScopeConfiguration = storeScope;
            if (storeScope > 0)
            {
                model.AppKey_OverrideForStore = _settingService.SettingExists(qqExternalAuthSettings, x => x.AppKey, storeScope);
                model.AppSecret_OverrideForStore = _settingService.SettingExists(qqExternalAuthSettings, x => x.AppSecret, storeScope);
                model.CallBackURI_OverrideForStore = _settingService.SettingExists(qqExternalAuthSettings, x => x.CallBackURI, storeScope);
                model.AuthorizeURL_OverrideForStore = _settingService.SettingExists(qqExternalAuthSettings, x => x.AuthorizeURL, storeScope);
            }

            return View("~/Plugins/ExternalAuth.QQ/Views/ExternalAuthQQ/Configure.cshtml", model);
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
            var qqExternalAuthSettings = _settingService.LoadSetting<QQExternalAuthSettings>(storeScope);

            //save settings
            qqExternalAuthSettings.AppKey = model.AppKey;
            qqExternalAuthSettings.AppSecret = model.AppSecret;
            qqExternalAuthSettings.CallBackURI = model.CallBackURI;
            qqExternalAuthSettings.AuthorizeURL = model.AuthorizeURL;

            /* We do not clear cache after each setting update.
             * This behavior can increase performance because cached settings will not be cleared 
             * and loaded from database after each update */
            if (model.AppKey_OverrideForStore || storeScope == 0)
                _settingService.SaveSetting(qqExternalAuthSettings, x => x.AppKey, storeScope, false);
            else if (storeScope > 0)
                _settingService.DeleteSetting(qqExternalAuthSettings, x => x.AppKey, storeScope);

            if (model.AppSecret_OverrideForStore || storeScope == 0)
                _settingService.SaveSetting(qqExternalAuthSettings, x => x.AppSecret, storeScope, false);
            else if (storeScope > 0)
                _settingService.DeleteSetting(qqExternalAuthSettings, x => x.AppSecret, storeScope);
            if (model.CallBackURI_OverrideForStore || storeScope == 0)
                _settingService.SaveSetting(qqExternalAuthSettings, x => x.CallBackURI, storeScope, false);
            else if (storeScope > 0)
                _settingService.DeleteSetting(qqExternalAuthSettings, x => x.CallBackURI, storeScope);
            if (model.AuthorizeURL_OverrideForStore || storeScope == 0)
                _settingService.SaveSetting(qqExternalAuthSettings, x => x.AuthorizeURL, storeScope, false);
            else if (storeScope > 0)
                _settingService.DeleteSetting(qqExternalAuthSettings, x => x.AuthorizeURL, storeScope);

            //now clear settings cache
            _settingService.ClearCache();

            return Configure();
        }

        [ChildActionOnly]
        public ActionResult PublicInfo()
        {
            return View("~/Plugins/ExternalAuth.QQ/Views/ExternalAuthQQ/PublicInfo.cshtml");
        }


        [HttpGet]
        public ActionResult Login(string returnUrl)
        {
            var processor = _openAuthenticationService.LoadExternalAuthenticationMethodBySystemName("QQ外部认证");
            if (processor == null ||
                !processor.IsMethodActive(_externalAuthenticationSettings) ||
                !processor.PluginDescriptor.Installed ||
                !_pluginFinder.AuthenticateStore(processor.PluginDescriptor, _storeContext.CurrentStore.Id))
                throw new NopException("QQ模块没有被装载");
            var viewModel = new LoginModel();
            TryUpdateModel(viewModel);
            var authenticationUrl = RequestAuthentication();
            return new RedirectResult(authenticationUrl);
        }

        [ChildActionOnly]
        public string RequestAuthentication()
        {
            var storeScope = this.GetActiveStoreScopeConfiguration(_storeService, _workContext);
            var qqExternalAuthSettings = _settingService.LoadSetting<QQExternalAuthSettings>(storeScope);
            var context = new QzoneContext(string.Empty, new QQConnectConfig(qqExternalAuthSettings.AppKey, qqExternalAuthSettings.AppSecret, qqExternalAuthSettings.CallBackURI, qqExternalAuthSettings.AuthorizeURL));
            string state = Guid.NewGuid().ToString().Replace("-", "");
            string scope = "get_user_info,add_share,list_album,upload_pic,check_page_fans,add_t,add_pic_t,del_t,get_repost_list,get_info,get_other_info,get_fanslist,get_idolist,add_idol,del_idol,add_one_blog,add_topic,get_tenpay_addr";
            var authenticationUrl = context.GetAuthorizationUrl(state, scope);
            Session["requeststate"] = state;
            return authenticationUrl;
        }

        /// <summary> 
        /// 回调页面 
        /// </summary>

        public ActionResult LoginCallback(LoginModel model, string returnUrl)
        {
            QOpenClient qzone = (QOpenClient)this.Session["QzoneOauth"];
            var verifier = Request.Params["code"];
            var state = Request.Params["state"];
            if (Request.Params["code"] != null)
            {
                if (qzone == null)
                {
                    var storeScope = this.GetActiveStoreScopeConfiguration(_storeService, _workContext);
                    var qqExternalAuthSettings = _settingService.LoadSetting<QQExternalAuthSettings>(storeScope);
                    qzone = new QOpenClient(verifier, state, new QQConnectConfig(qqExternalAuthSettings.AppKey, qqExternalAuthSettings.AppSecret, qqExternalAuthSettings.CallBackURI, qqExternalAuthSettings.AuthorizeURL));
                    if (qzone != null)
                    {
                        this.Session["QzoneOauth"] = qzone;
                    }
                }
                else
                {
                    qzone = (QOpenClient)this.Session["QzoneOauth"];
                }
                string requestState = Session["requeststate"].ToString();
                if (state == requestState)
                {
                    if (qzone.OAuthToken != null)
                    {
                        if (string.IsNullOrEmpty(qzone.OAuthToken.OpenId))
                            throw new Exception("Authentication result does not contain openid");

                        if (string.IsNullOrEmpty(qzone.OAuthToken.AccessToken))
                            throw new Exception("Authentication result does not contain accesstoken data");
                        var parameters = new OAuthAuthenticationParameters(Provider.SystemName)
                        {
                            ExternalIdentifier = qzone.OAuthToken.OpenId,
                            OAuthToken = qzone.OAuthToken.AccessToken,
                            OAuthAccessToken = qzone.OAuthToken.OpenId,
                            
                        };
                        UserClaims claims = new UserClaims();
                        claims.Contact = new ContactClaims(); 
                        parameters.AddClaim(claims);
                        Session["QQAuthorizeParameters"] = parameters;
                        var result = _authorizer.Authorize(parameters);
                        switch (result.Status)
                        {
                            case OpenAuthenticationStatus.Error:
                                {
                                    if (!result.Success)
                                        foreach (var error in result.Errors)
                                            ExternalAuthorizerHelper.AddErrorsToDisplay(error);
                                    return RedirectToRoute("ThirdAccountRegister", new { styleId = 1 });
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
            }
            return View();
        }

        
    }
}
