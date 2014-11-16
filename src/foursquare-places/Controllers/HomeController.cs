using FourSquare.SharpSquare.Core;
using System.Configuration;
using System.Web.Mvc;

namespace foursquare_places.Controllers
{
    public class HomeController : Controller
    {
        private const string BASE_URL = "https://foursquare-places.azurewebsites.net/";

        private static string redirectUri = BASE_URL + "Home/AuthorizeCallback";
        
        private SharpSquare service = new SharpSquare(
            ConfigurationManager.AppSettings["ClientId"],
            ConfigurationManager.AppSettings["ClientSecret"]);

        public ActionResult Login()
        {
            string url = service.GetAuthenticateUrl(redirectUri);
            return new RedirectResult(url,false);
        }

        public ActionResult AuthorizeCallback(string temp, string code)
        {
            var accessToken = service.GetAccessToken(redirectUri, code);
            
            //Session["AccessToken"] = accessToken;
            ConfigurationManager.AppSettings["AccessToken"] = accessToken;

            return new RedirectResult(BASE_URL, false);
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}