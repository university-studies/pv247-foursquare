using FourSquare.SharpSquare.Entities;
using foursquare_places.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Net;

namespace UnitTestProject
{
    [TestClass]
    public class FoursquareClientTests
    {
        private FoursquareClient client;

        [TestInitialize]
        public void Initialize()
        {
            client = new FoursquareClient();
        }

        [TestCleanup]
        public void Cleanup()
        {
            client = null;
        }

        [TestMethod]
        public void Construction_ClientShouldBeSetToObject()
        {
            Assert.IsNotNull(client);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void SearchPlaces_WhenLocationNull_ShouldThrowArgumentNullException()
        {
            client.SearchPlaces(null, null);
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void SearchPlaces_WhenIncorrectLocation_ShouldThrowInvalidOperationException()
        {
            foursquare_places.Models.Location location = new foursquare_places.Models.Location();
            location.Latitude = 300;
            location.Longitude = -0.18;

            client.SearchPlaces(location, null);
        }

        [TestMethod]
        public void SearchPlaces_WhenLocationProvided_ReturnsListOfFPlaces()
        {
            foursquare_places.Models.Location location = new foursquare_places.Models.Location();
            location.Latitude = 49.2027699;
            location.Longitude = 16.5989538;

            List<FPlace> venues = client.SearchPlaces(location, null);
            
            Assert.IsNotNull(venues);
            Assert.IsTrue(venues.Count > 0);
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void GetAuthenticatedUser_WhenAccessTokenIsNull_ShouldThrowInvalidOperationException()
        {
            client.GetAuthenticatedUser(null);
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void GetAuthenticatedUser_WhenWrongAccessTokenProvided_ShouldThrowInvalidOperationException()
        {
            client.GetAuthenticatedUser("a21fdsf5s4df2fsd1fsd3f5sf1sdf");
        }

        [TestMethod]
        public void GetAuthenticatedUser_WhenAccessTokenProvided_ShouldReturnLoggedFUser()
        {
            FUser user = client.GetAuthenticatedUser("3NEGUZWPAPOGU04G1SERRWIYX0T5LY05H21F31GNMB0IJB00");
            Assert.IsNotNull(user);
            Assert.IsInstanceOfType(user, typeof(FUser));
        }    
    
        [TestMethod]
        public void GetFriendsRecentCheckins_WhenAccessTokenNull_ShouldReturnNull()
        {
            List<Checkin> checkins = client.GetFriendsRecentCheckins(null);

            Assert.IsNull(checkins);
        }

        [TestMethod]
        public void GetFriendsRecentCheckins_WhenWrongAccessToken_ShouldReturnNull()
        {
            List<Checkin> checkins = client.GetFriendsRecentCheckins("a21fdsf5s4df2fsd1fsd3f5sf1sdf");

            Assert.IsNull(checkins);
        }

        [TestMethod]
        public void GetFriendsRecentCheckins_WhenAccessTokenProvided_ShouldReturnListOfCheckins()
        {
            List<Checkin> checkins = client.GetFriendsRecentCheckins("3NEGUZWPAPOGU04G1SERRWIYX0T5LY05H21F31GNMB0IJB00");

            Assert.IsNotNull(checkins);
            Assert.IsInstanceOfType(checkins, typeof(List<Checkin>));
        }
    }
}
