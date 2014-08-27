using Nop.Core.Configuration;

namespace Nop.Plugin.ExternalAuth.SinaWeb
{
    public class SinaWebExternalAuthSettings : ISettings
    {
        /// <summary>
        /// 新浪微博 第三方认证key
        /// </summary>
        public string AppKey { get; set; }

        /// <summary>
        /// 新浪微博 第三方认证密码
        /// </summary>
        public string AppSecret { get; set; }

        /// <summary>
        /// 回调地址
        /// </summary>
        public string CallBackURI { get; set; }

        ///// <summary>
        ///// 新浪微博授权网址
        ///// </summary>
        //public string AuthorizeURL { get; set; }
    }
}
