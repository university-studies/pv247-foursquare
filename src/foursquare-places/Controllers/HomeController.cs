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
        //Test url
        //static string redirectUri = "https://localhost:44301/Home/AuthorizeCallback";
        static string redirectUri = "https://foursquare-places.azurewebsites.net/Home/AuthorizeCallback";
        
        private SharpSquare service = new SharpSquare(
            System.Configuration.ConfigurationManager.AppSettings["FoursquareclientId"],
            System.Configuration.ConfigurationManager.AppSettings["FoursquareclientSecret"]);

        public ActionResult Login()
        {
            string url = service.GetAuthenticateUrl(redirectUri);
            return new RedirectResult(url,false);
        }

        public ActionResult AuthorizeCallback(string temp, string code)
        {
            var accessToken = service.GetAccessToken(redirectUri, code);

            Session["AccessToken"] = accessToken;

            return new RedirectResult("http://foursquare-places.azurewebsites.net/", false);
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}