using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using foursquare_places.Models;

namespace foursquare_places.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View(Foursquare.SearchVenues("49.211417, 16.597629"));
        }

        public ActionResult About()
        {
            ViewBag.Message = "About Foursquare places";
            return View();
        }
    }
}