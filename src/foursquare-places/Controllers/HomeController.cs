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
        static string clientId = System.Configuration.ConfigurationManager.AppSettings["FoursquareclientId"];
        static string clientSecret = System.Configuration.ConfigurationManager.AppSettings["FoursquareclientSecret"];
        //Test url
        //static string redirectUri = "https://localhost:44301/Home/AuthorizeCallback";
        static string redirectUri = "https://foursquare-places.azurewebsites.net/Home/AuthorizeCallback";
        SharpSquare service = new SharpSquare(clientId, clientSecret);

        public ActionResult Login()
        {
            string url = service.GetAuthenticateUrl(redirectUri);
            return new RedirectResult(url,false);
        }

        public ActionResult AuthorizeCallback(string temp, string code)
        {
            var accessToken = service.GetAccessToken(redirectUri, code);

            Session["AccessToken"] = accessToken;

            string rUrl = "http://foursquare-places.azurewebsites.net/";

            return new RedirectResult(rUrl, false);
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