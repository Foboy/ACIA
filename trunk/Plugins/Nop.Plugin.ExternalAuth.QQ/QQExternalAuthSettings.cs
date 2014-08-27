using Nop.Core.Configuration;

namespace Nop.Plugin.ExternalAuth.QQ
{
    public class QQExternalAuthSettings : ISettings
    {
        /// <summary>
        /// QQ 第三方认证key
        /// </summary>
        public string AppKey { get; set; }

        /// <summary>
        /// QQ 第三方认证密码
        /// </summary>
        public string AppSecret { get; set; }
       
        /// <summary>
        /// 回调地址
        /// </summary>
        public string CallBackURI { get; set; }

        /// <summary>
        /// 授权网址
        /// </summary>
        public string AuthorizeURL { get; set; }
    }
}
