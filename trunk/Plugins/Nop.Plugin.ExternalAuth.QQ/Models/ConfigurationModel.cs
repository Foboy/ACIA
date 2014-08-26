using Nop.Web.Framework;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.ExternalAuth.QQ.Models
{
    public class ConfigurationModel : BaseNopModel
    {
        public int ActiveStoreScopeConfiguration { get; set; }

        [NopResourceDisplayName("Plugins.ExternalAuth.QQ.AppKey")]
        public string AppKey { get; set; }
        public bool AppKey_OverrideForStore { get; set; }

        [NopResourceDisplayName("Plugins.ExternalAuth.QQ.AppSecret")]
        public string AppSecret { get; set; }
        public bool AppSecret_OverrideForStore { get; set; }

        [NopResourceDisplayName("Plugins.ExternalAuth.QQ.CallBackURI")]
        public string CallBackURI { get; set; }

        public bool CallBackURI_OverrideForStore { get; set; }


        [NopResourceDisplayName("Plugins.ExternalAuth.QQ.AuthorizeURL")]
        public string AuthorizeURL { get; set; }

        public bool AuthorizeURL_OverrideForStore { get; set; }
    }
}
