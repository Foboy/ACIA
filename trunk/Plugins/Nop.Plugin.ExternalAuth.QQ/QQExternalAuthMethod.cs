using System.Web.Routing;
using Nop.Core.Plugins;
using Nop.Services.Authentication.External;
using Nop.Services.Configuration;
using Nop.Services.Localization;

namespace Nop.Plugin.ExternalAuth.QQ
{
    /// <summary>
    /// QQ 外部认证处理器
    /// </summary>
    public class QQExternalAuthMethod : BasePlugin, IExternalAuthenticationMethod
    {
         #region Fields

        private readonly ISettingService _settingService;

        #endregion

        #region Ctor

        public QQExternalAuthMethod(ISettingService settingService)
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
            controllerName = "ExternalAuthQQ";
            routeValues = new RouteValueDictionary() { { "Namespaces", "Nop.Plugin.ExternalAuth.QQ.Controllers" }, { "area", null } };
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
            controllerName = "ExternalAuthQQ";
            routeValues = new RouteValueDictionary() { { "Namespaces", "Nop.Plugin.ExternalAuth.QQ.Controllers" }, { "area", null } };
        }

        /// <summary>
        /// Install plugin
        /// </summary>
        public override void Install()
        {
            //settings
            var settings = new QQExternalAuthSettings()
            {
                AppKey = "",
                AppSecret = "",
                CallBackURI="",
                AuthorizeURL=""
            };
            _settingService.SaveSetting(settings);

            //locales
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.QQ.Login", "使用QQ账号登录");
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.QQ.AppKey", "QQ第三方AppKey");
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.QQ.AppKey.Hint", "请输入你的QQ第三方AppKey,你将发现AppKey在你的QQ应用页面");
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.QQ.AppSecret", "QQ第三方AppSecret");
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.QQ.AppSecret.Hint", "请输入你的QQ第三方AppSecret,你将发现AppSecret在你的QQ应用页面");
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.QQ.CallBackURI", "回调地址");
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.QQ.CallBackURI.Hint", "请输入你的QQ登录回调地址,你将发现回调地址在你的QQ应用页面");
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.QQ.AuthorizeURL", "QQ第三方授权网址");
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.QQ.AuthorizeURL.Hint", "QQ第三方授权网址暗示");

            base.Install();
        }

        public override void Uninstall()
        {
            //settings
            _settingService.DeleteSetting<QQExternalAuthSettings>();

            //locales
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.QQ.Login");
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.QQ.AppKey");
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.QQ.AppKey.Hint");
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.QQ.AppSecret");
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.QQ.AppSecret.Hint");
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.QQ.CallBackURI");
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.QQ.CallBackURI.Hint");
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.QQ.AuthorizeURL");
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.QQ.AuthorizeURL.Hint");

            base.Uninstall();
        }

        #endregion
    }
}
