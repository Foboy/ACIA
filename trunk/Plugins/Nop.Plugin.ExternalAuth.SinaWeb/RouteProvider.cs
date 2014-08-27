using System.Web.Mvc;
using System.Web.Routing;
using Nop.Web.Framework.Mvc.Routes;
namespace Nop.Plugin.ExternalAuth.SinaWeb
{
    public partial class RouteProvider : IRouteProvider
    {
        public void RegisterRoutes(RouteCollection routes)
        {
            routes.MapRoute("Plugin.ExternalAuth.SinaWeb.Login",
                 "Plugins/ExternalAuthSinaWeb/Login",
                 new { controller = "ExternalAuthSinaWeb", action = "Login" },
                 new[] { "Nop.Plugin.ExternalAuth.SinaWeb.Controllers" }
            );

            routes.MapRoute("Plugin.ExternalAuth.SinaWeb.LoginCallback",
                 "Plugins/ExternalAuthSinaWeb/LoginCallback",
                 new { controller = "ExternalAuthSinaWeb", action = "LoginCallback" },
                 new[] { "Nop.Plugin.ExternalAuth.SinaWeb.Controllers" }
            );
        }
        public int Priority
        {
            get
            {
                return 0;
            }
        }
    }
}
