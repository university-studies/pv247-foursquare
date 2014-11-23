using FourSquare.SharpSquare.Core;
using FourSquare.SharpSquare.Entities;
using System;
using System.Collections.Generic;
using System.Configuration;

namespace foursquare_places.Models
{
    public class FoursquareClient
    {
        private static VenueCategoriesManager venueCatManager = new VenueCategoriesManager();
        private static SharpSquare sharpSquare = new SharpSquare(
                ConfigurationManager.AppSettings["ClientId"],
                ConfigurationManager.AppSettings["ClientSecret"]);
        
        /// <summary>
        /// Searches for nearest venues based on provided location. If authenticated user, gets venues with friend's checkins
        /// </summary>
        /// <param name="location">location where to search for venues</param>
        /// <param name="accessToken">access token of authenticated user</param>
        /// <returns>List of nearest places</returns>
        public List<FPlace> SearchPlaces(Models.Location location, string accessToken)
        {
            if (location == null)
                throw new ArgumentNullException("location");

            Dictionary<string, string> parameters = new Dictionary<string, string>();
            parameters.Add("ll", location.ToString());
            parameters.Add("limit", "50");
            parameters.Add("radius", "5000");   
         
            List<Venue> venues = sharpSquare.SearchVenues(parameters);
            List<Checkin> friendsCheckins = string.IsNullOrEmpty(accessToken) ? null : GetFriendsCheckins(accessToken);

            return TransformToFPlaces(venues, friendsCheckins);
        }

        /// <summary>
        /// Gets current authenticated user on Foursquare
        /// </summary>
        /// <param name="accessToken">access token of authenticated user</param>
        /// <returns>current User</returns>
        public User GetAuthenticatedUser(string accessToken)
        {
            if (string.IsNullOrEmpty(accessToken))
                throw new InvalidOperationException("No user is logged in.");

            sharpSquare.SetAccessToken(accessToken);

            return sharpSquare.GetUser("self");
        }

        private List<Checkin> GetFriendsCheckins(string accessToken)
        {
            // set access token for SharpSquare service
            sharpSquare.SetAccessToken(accessToken);

            Dictionary<string, string> parameters = new Dictionary<string, string>();
            parameters.Add("limit", "100");
            parameters.Add("afterTimestamp", "14515200" /* 1 week in seconds */); 

            List<Checkin> checkins = sharpSquare.GetRecentCheckin(parameters);

            return checkins;
        }

        private List<FPlace> TransformToFPlaces(List<Venue> venues, List<Checkin> checkins)
        {
            List<FPlace> places = new List<FPlace>();
            
            if (venues != null)
            {
                venues.ForEach(venue =>
                    {
                        FPlace place = new FPlace
                            {
                                Id = venue.id,
                                Name = venue.name,
                                Location = new Location { Latitude = venue.location.lat, Longitude = venue.location.lng },
                                Address = venue.location.address,
                                City = venue.location.city,
                                Country = venue.location.country,
                                FormattedAddress = venue.location.formattedAddress,
                                Phone = venue.contact.phone,
                                Category = venueCatManager.GetOurCategory(venue.categories),
                                CheckinsCount = venue.stats.checkinsCount,
                                HereNow = venue.hereNow.count,
                                Url = venue.url
                            };

                        if (checkins != null)
                        {
                            checkins.ForEach(checkin =>
                            {
                                if (checkin.venue != null && checkin.venue.id == venue.id)
                                    place.FriendsHere.Add(checkin.user.firstName + " " + checkin.user.lastName);
                            });
                        }

                        places.Add(place);
                    });
            }

            return places;
        }
    }
}