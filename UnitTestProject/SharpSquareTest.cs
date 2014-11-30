using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using FourSquare.SharpSquare.Core;
using foursquare_places.Models;
using System.Configuration;
using System.Collections.Generic;
using FourSquare.SharpSquare.Entities;

namespace UnitTestProject
{
    [TestClass]
    public class SharpSquareTest
    {
        [TestMethod]
        public void Test1()
        {
            SharpSquare sharpSquare = new SharpSquare(
             ConfigurationManager.AppSettings["ClientId"],
             ConfigurationManager.AppSettings["ClientSecret"]);

            Assert.IsNotNull(sharpSquare);
        }

        [TestMethod]
        public void Test2()
        {
            SharpSquare sharpSquare = new SharpSquare(
             ConfigurationManager.AppSettings["ClientId"],
             ConfigurationManager.AppSettings["ClientSecret"]);

            Dictionary<string, string> parameters = new Dictionary<string, string>();
            parameters.Add("ll", "49.2027699, 16.5989538");
            parameters.Add("limit", "50");
            parameters.Add("radius", "5000");   
            List<Venue> venues = sharpSquare.SearchVenues(parameters);
            Assert.IsTrue(venues.Count > 0);
        }
    }
}
