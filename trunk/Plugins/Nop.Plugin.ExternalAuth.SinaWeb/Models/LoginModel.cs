
namespace Nop.Plugin.ExternalAuth.SinaWeb.Models
{
    public class LoginModel
    {
        public string ExternalIdentifier { get; set; }
        public string KnownProvider { get; set; }
        public string ReturnUrl { get; set; }
        public string Email { get; set; }
    }
}
