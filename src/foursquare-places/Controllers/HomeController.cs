using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using foursquare_places.Models;
using FourSquare.SharpSquare.Core;
using FourSquare.SharpSquare.Entities;
using System.Web.UI.WebControls;
using System.Diagnostics;
using System.Net;

namespace foursquare_places.Controllers
{
    public class HomeController : Controller
    {
        static string clientId = "T4JTQ1SK5CDOD4HSBA00HIZRTR1H04JP43RXCSIOLE0IDWRK";
        static string clientSecret = "BSKKMLGAFHZ1VSUL4FL5CP0D31QIGJIZV0WPNII3KQUZQVLG";
        static string redirectUri = "http://foursquare-places.azurewebsites.net/Home/AuthorizeCallback";
        SharpSquare service = new SharpSquare(clientId, clientSecret);

        public ActionResult Login()
        {

            //string url = "https://foursquare.com/oauth2/authenticate?client_id=" + clientId + "&response_type=code&redirect_uri=" + redirectUri;
            //string url = "https://foursquare.com/oauth2/authenticate?display=touch&client_id=" + clientId + "&client_secret=" + clientSecret + "&response_type=token&redirect_uri=" + redirectUri;

            string url = service.GetAuthenticateUrl(redirectUri);
            return new RedirectResult(url,false);
        }

        public ActionResult AuthorizeCallback(string code,string token)
        {
            var accessToken = service.GetAccessToken(redirectUri, token);

            return View("Index");

            //Session["AccessToken"] = acctoken;
        }


        public ActionResult Index()
        {
            return View();
        }


        /*public ActionResult About()
        {
            ViewBag.Message = "About Foursquare places";
            return View();
        }*/
    }
}