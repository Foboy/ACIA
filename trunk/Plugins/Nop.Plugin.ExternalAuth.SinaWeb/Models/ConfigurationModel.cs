using Nop.Web.Framework;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.ExternalAuth.SinaWeb.Models
{
    public class ConfigurationModel
    {
        public int ActiveStoreScopeConfiguration { get; set; }

        [NopResourceDisplayName("Plugins.ExternalAuth.SinaWeb.AppKey")]
        public string AppKey { get; set; }
        public bool AppKey_OverrideForStore { get; set; }

        [NopResourceDisplayName("Plugins.ExternalAuth.SinaWeb.AppSecret")]
        public string AppSecret { get; set; }
        public bool AppSecret_OverrideForStore { get; set; }

        [NopResourceDisplayName("Plugins.ExternalAuth.SinaWeb.CallBackURI")]
        public string CallBackURI { get; set; }

        public bool CallBackURI_OverrideForStore { get; set; }


        [NopResourceDisplayName("Plugins.ExternalAuth.SinaWeb.AuthorizeURL")]
        public string AuthorizeURL { get; set; }

        public bool AuthorizeURL_OverrideForStore { get; set; }
    }
}
