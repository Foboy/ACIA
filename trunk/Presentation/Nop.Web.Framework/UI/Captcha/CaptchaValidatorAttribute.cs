using System.Web.Mvc;
using Nop.Core.Infrastructure;
using CaptchaLib;

namespace Nop.Web.Framework.UI.Captcha
{
    public class CaptchaValidatorAttribute : ActionFilterAttribute
    {
        private const string CHALLENGE_FIELD_KEY = "recaptcha_challenge_field";
        private const string RESPONSE_FIELD_KEY = "recaptcha_response_field";
        private const string CAPTCHA_FIELD_KEY = "fourboy_captcha";
        private const string CaptchaUniqueIdPrefix = "_CAPTCHA_";

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            //bool valid = false;
            //var captchaChallengeValue = filterContext.HttpContext.Request.Form[CHALLENGE_FIELD_KEY];
            //var captchaResponseValue = filterContext.HttpContext.Request.Form[RESPONSE_FIELD_KEY];
            //if (!string.IsNullOrEmpty(captchaChallengeValue) && !string.IsNullOrEmpty(captchaResponseValue))
            //{
            //    var captchaSettings = EngineContext.Current.Resolve<CaptchaSettings>();
            //    if (captchaSettings.Enabled)
            //    {
            //        //validate captcha
            //        var captchaValidtor = new Recaptcha.RecaptchaValidator
            //        {
            //            PrivateKey = captchaSettings.ReCaptchaPrivateKey,
            //            RemoteIP = filterContext.HttpContext.Request.UserHostAddress,
            //            Challenge = captchaChallengeValue,
            //            Response = captchaResponseValue
            //        };

            //        var recaptchaResponse = captchaValidtor.Validate();
            //        valid = recaptchaResponse.IsValid;
            //    }
            //}

            var captcha = filterContext.HttpContext.Request.Form[CAPTCHA_FIELD_KEY];
            var correctValue = filterContext.HttpContext.Session[CaptchaUniqueIdPrefix] as string;
            filterContext.HttpContext.Session.Remove(CaptchaUniqueIdPrefix);
            correctValue = correctValue != null ? correctValue : string.Empty;
            //this will push the result value into a parameter in our Action  
            filterContext.ActionParameters["captchaValid"] = correctValue.Equals(captcha, System.StringComparison.OrdinalIgnoreCase);

            base.OnActionExecuting(filterContext);
        }
    }
}
