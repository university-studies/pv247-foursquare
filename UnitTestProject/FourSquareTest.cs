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
    public class FourSquareTest
    {
        [TestMethod]
        public void TestClietNotNull()
        {
            FoursquareClient client = new FoursquareClient();
            Assert.IsNotNull(client);
        }

        [TestMethod]
        public void TestClietReturnsData()
        {
            FoursquareClient client = new FoursquareClient();

            Dictionary<string, string> parameters = new Dictionary<string, string>();
            foursquare_places.Models.Location location = new foursquare_places.Models.Location();
            location.Latitude = 49.2027699;
            location.Longitude = 16.5989538;
            List<FPlace> venues = client.SearchPlaces(location, null);
            Assert.IsTrue(venues.Count > 0);
        }
    }
}
