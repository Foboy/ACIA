using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CaptchaLib;

namespace Nop.Web.Controllers
{
    public class CaptchaController : Controller
    {
        // GET: Captcha
        public ActionResult GetCaptcha()
        {
            var captcha = new CaptchaImage();
            captcha.NoiseCount = 200;
            return this.Captcha(captcha);
        }
    }
}