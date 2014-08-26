using System.Web.Routing;
using Nop.Core.Plugins;
using Nop.Services.Authentication.External;
using Nop.Services.Configuration;
using Nop.Services.Localization;

namespace Nop.Plugin.ExternalAuth.SinaWeb
{
  public  class SinaWebExternalAuthMethod : BasePlugin, IExternalAuthenticationMethod
    {
     #region Fields

        private readonly ISettingService _settingService;

        #endregion

        #region Ctor

        public SinaWebExternalAuthMethod(ISettingService settingService)
        {
            this._settingService = settingService;
        }

        #endregion

        #region Methods

        /// <summary>
        /// Gets a route for provider configuration
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller name</param>
        /// <param name="routeValues">Route values</param>
        public void GetConfigurationRoute(out string actionName, out string controllerName, out RouteValueDictionary routeValues)
        {
            actionName = "Configure";
            controllerName = "ExternalAuthSinaWeb";
            routeValues = new RouteValueDictionary() { { "Namespaces", "Nop.Plugin.ExternalAuth.SinaWeb.Controllers" }, { "area", null } };
        }

        /// <summary>
        /// Gets a route for displaying plugin in public store
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller name</param>
        /// <param name="routeValues">Route values</param>
        public void GetPublicInfoRoute(out string actionName, out string controllerName, out RouteValueDictionary routeValues)
        {
            actionName = "PublicInfo";
            controllerName = "ExternalAuthSinaWeb";
            routeValues = new RouteValueDictionary() { { "Namespaces", "Nop.Plugin.ExternalAuth.SinaWeb.Controllers" }, { "area", null } };
        }

        /// <summary>
        /// Install plugin
        /// </summary>
        public override void Install()
        {
            //settings
            var settings = new SinaWebExternalAuthSettings()
            {
                AppKey = "",
                AppSecret = "",
                CallBackURI = ""
               // AuthorizeURL = ""
            };
            _settingService.SaveSetting(settings);

            //locales
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.SinaWeb.Login", "使用新浪微博登录");
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.SinaWeb.AppKey", "新浪微博第三方AppKey");
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.SinaWeb.AppKey.Hint", "请输入你的新浪微博第三方AppKey,你将发现AppKey在你的新浪微博应用页面");
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.SinaWeb.AppSecret", "新浪微博第三方AppSecret");
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.SinaWeb.AppSecret.Hint", "请输入你的新浪微博第三方AppSecret,你将发现AppSecret在你的新浪微博应用页面");
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.SinaWeb.CallBackURI", "回调地址");
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.SinaWeb.CallBackURI.Hint", "请输入你的新浪微博登录回调地址,你将发现回调地址在你的新浪微博应用页面");
            //this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.SinaWeb.AuthorizeURL", "新浪微博第三方授权网址");
            //this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.SinaWeb.AuthorizeURL.Hint", "新浪微博第三方授权网址暗示");

            base.Install();
        }

        public override void Uninstall()
        {
            //settings
            _settingService.DeleteSetting<SinaWebExternalAuthSettings>();

            //locales
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.SinaWeb.Login");
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.SinaWeb.AppKey");
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.SinaWeb.AppKey.Hint");
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.SinaWeb.AppSecret");
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.SinaWeb.AppSecret.Hint");
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.SinaWeb.CallBackURI");
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.SinaWeb.CallBackURI.Hint");
            //this.DeletePluginLocaleResource("Plugins.ExternalAuth.SinaWeb.AuthorizeURL");
            //this.DeletePluginLocaleResource("Plugins.ExternalAuth.SinaWeb.AuthorizeURL.Hint");

            base.Uninstall();
        }

        #endregion
    }
}
