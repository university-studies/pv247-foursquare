using FourSquare.SharpSquare.Core;
using System.Configuration;
using System.Web.Mvc;

namespace foursquare_places.Controllers
{
    public class HomeController : Controller
    {
        private const string BASE_URL_SECURE = "https://foursquare-places.azurewebsites.net/";
        private const string BASE_URL = "http://foursquare-places.azurewebsites.net/";
        private const string REDIRECT_URL = BASE_URL_SECURE + "Home/AuthorizeCallback";
        
        private SharpSquare sharpSquare = new SharpSquare(
            ConfigurationManager.AppSettings["ClientId"],
            ConfigurationManager.AppSettings["ClientSecret"]);

        public ActionResult Login()
        {
            return new RedirectResult(sharpSquare.GetAuthenticateUrl(REDIRECT_URL), false);
        }

        public ActionResult AuthorizeCallback(string temp, string code)
        {
            Session["AccessToken"] = sharpSquare.GetAccessToken(REDIRECT_URL, code);
            //ConfigurationManager.AppSettings["AccessToken"] = accessToken;

            return new RedirectResult(BASE_URL, false);
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}