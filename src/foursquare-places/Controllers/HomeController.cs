using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using foursquare_places.Models;
using FourSquare.SharpSquare.Core;
using FourSquare.SharpSquare.Entities;

namespace foursquare_places.Controllers
{
    public class HomeController : Controller
    {
        static string clientId = "T4JTQ1SK5CDOD4HSBA00HIZRTR1H04JP43RXCSIOLE0IDWRK";
        static string clientSecret = "BSKKMLGAFHZ1VSUL4FL5CP0D31QIGJIZV0WPNII3KQUZQVLG";
        static string redirectUri = "http://foursquare-places.azurewebsites.net/";
        static SharpSquare sharpSquare;

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult UserClicksAuthenticate()
        {
            var redirectUri = Request.Url.Authority + this.Url.Action("AuthorizeCallback", new { userCode = "userCode" });
            var sharpSquare = new SharpSquare(clientId, clientSecret);
            var authUrl = sharpSquare.GetAuthenticateUrl(redirectUri);

            return new RedirectResult(authUrl, permanent: false);
        }

        public ActionResult AuthorizeCallback(string code, string userCode)
        {
            var redirectUri = Request.Url.Authority + this.Url.Action("AuthorizeCallback", new { userCode = userCode });

            var sharpSquare = new SharpSquare(clientId, clientSecret);
            var accessToken = sharpSquare.GetAccessToken(redirectUri, code);

            sharpSquare.SetAccessToken(accessToken);

            List<VenueHistory> venues = sharpSquare.GetUserVenueHistory();

            return View("Index");
        }

        /*public ActionResult About()
        {
            ViewBag.Message = "About Foursquare places";
            return View();
        }*/
    }
}