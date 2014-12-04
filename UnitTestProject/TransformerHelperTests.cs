using FourSquare.SharpSquare.Entities;
using foursquare_places.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTestProject
{
    [TestClass]
    public class TransformerHelperTests
    {
        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void TransformToFPlaces_WhenVenuesNull_ShouldThrowArgumentNullException()
        {
            TransformerHelpers.TransformToFPlaces(null, null);
        }

        [TestMethod]
        public void TransformToFPlaces_WhenEmptyVenues_ShouldReturnEmptyListOfFPlaces()
        {
            List<FPlace> places = TransformerHelpers.TransformToFPlaces(new List<Venue>(), null);

            Assert.IsTrue(places.Count == 0);
        }

        [TestMethod]
        public void TransformToFPlaces_WhenCorrectVenues_ShouldReturnListOfFPlaces()
        {
            List<Venue> venues = new List<Venue>();
            venues.Add(new Venue { id = "1" });
            venues.Add(new Venue { id = "2" });
            venues.Add(new Venue { id = "3" });

            List<FPlace> places = TransformerHelpers.TransformToFPlaces(venues, null);

            Assert.IsNotNull(places);
            Assert.IsTrue(places.Count > 0);
        }

        [TestMethod]
        public void TransformToFPlaces_WhenCheckinsProvided_ShouldReturnListOfFPlacesWithFriendsNames()
        {
            List<Venue> venues = new List<Venue>();
            var venue = new Venue { id = "1" };
            venues.Add(venue);
            venue = new Venue { id = "2" };
            venues.Add(venue);
            venue = new Venue { id = "3" };
            venues.Add(venue);
            List<Checkin> checkins = new List<Checkin>();
            checkins.Add(new Checkin 
                            { 
                                venue = venue,
                                user = new User
                                        {
                                            firstName = "John",
                                            lastName = "Luther"
                                        }
                            });

            List<FPlace> places = TransformerHelpers.TransformToFPlaces(venues, checkins);

            Assert.IsNotNull(places);
            Assert.IsTrue(places.Count > 0);

            FPlace place = places.Find(p => p.Id == "3");
            Assert.IsNotNull(place);
            Assert.IsTrue(place.FriendsHere.Contains("John Luther"));
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void TransformToFUser_WhenUserIsNull_ShouldThrowArgumentNullException()
        {
            TransformerHelpers.TransformToFUser(null);
        }

        [TestMethod]
        public void TransformToFUser_WhenCorrectUser_ShouldReturnTransformedFUser()
        {
            User user = new User
            {
                id = "1",
                firstName = "Jimmy",
                lastName = "McNulty",
                photo = new Icon
                    {
                        prefix = "a.b/",
                        suffix = "/c"
                    },
                homeCity = "Baltimore",
                friends = new FourSquareEntityGroups<User>()
            };

            FUser fUser = TransformerHelpers.TransformToFUser(user);

            Assert.IsNotNull(fUser);
            Assert.IsTrue(fUser.Name == "Jimmy McNulty");
            Assert.AreEqual(fUser.FriendsCount, 0);
        }
    }
}
