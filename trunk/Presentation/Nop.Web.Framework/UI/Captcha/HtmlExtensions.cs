using System.IO;
using System.Web.Mvc;
using System.Web.UI;
using Nop.Core.Infrastructure;
using CaptchaLib;
using Nop.Services.Localization;

namespace Nop.Web.Framework.UI.Captcha
{
    public static class HtmlExtensions
    {
        private const string CAPTCHA_FIELD_KEY = "fourboy_captcha";
        public static string GenerateCaptcha(this HtmlHelper helper)
        {
            //var captchaSettings = EngineContext.Current.Resolve<CaptchaSettings>();
            var localizationService = EngineContext.Current.Resolve<ILocalizationService>();

            //var theme = !string.IsNullOrEmpty(captchaSettings.ReCaptchaTheme) ? captchaSettings.ReCaptchaTheme : "white";
            //var captchaControl = new Recaptcha.RecaptchaControl
            //{
            //    ID = "recaptcha",
            //    Theme = theme,
            //    PublicKey = captchaSettings.ReCaptchaPublicKey,
            //    PrivateKey = captchaSettings.ReCaptchaPrivateKey
            //};
            var refreshScript = @"<script type=""text/javascript"">$(function () {
    $('.newCaptcha').click(function (e) {
        var cmd = $(this);
        var url = cmd.prev('.captchaContainer').find('img').first().attr('src');
        url = url.replace(/(.*?)\?r=\d+\.\d+$/, '$1')
        console.log(url);
        var img = new Image();
        $(img).load(function () {
            cmd.prev('.captchaContainer').empty().append(img);
        });
        img.src = url + '?r=' + Math.random();
        e.preventDefault();
    });
});</script>";
            return helper.Captcha(CAPTCHA_FIELD_KEY, "GetCaptcha", "Captcha", localizationService.GetResource("Common.CaptchaRefreshLabel")).ToString() + refreshScript;
            //var htmlWriter = new HtmlTextWriter(new StringWriter());
            
            //captchaControl.RenderControl(htmlWriter);

            //return htmlWriter.InnerWriter.ToString();
        }
    }
}
