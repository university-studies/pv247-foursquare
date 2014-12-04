using FourSquare.SharpSquare.Core;
using FourSquare.SharpSquare.Entities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net;

namespace foursquare_places.Models
{
    public class FoursquareClient
    {
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

            List<Checkin> friendsCheckins = GetFriendsRecentCheckins(accessToken);
            List<Venue> venues = null;
            try
            {
                venues = sharpSquare.SearchVenues(parameters);
            }
            catch (WebException webEx)
            {
                throw new InvalidOperationException("Bad location data");
            }

            return TransformerHelpers.TransformToFPlaces(venues, friendsCheckins);
        }

        /// <summary>
        /// Gets current authenticated user on Foursquare
        /// </summary>
        /// <param name="accessToken">access token of authenticated user</param>
        /// <returns>current User</returns>
        public FUser GetAuthenticatedUser(string accessToken)
        {
            if (string.IsNullOrEmpty(accessToken))
                throw new InvalidOperationException("No user is logged in.");

            // set access token for SharpSquare service
            sharpSquare.SetAccessToken(accessToken);

            User user = null;
            try
            {
                user = sharpSquare.GetUser("self");
            }
            catch (WebException webEx)
            {
                throw new InvalidOperationException("No user is logged in.", webEx);
            }

            return TransformerHelpers.TransformToFUser(user);
        }

        /// <summary>
        /// Gets recent friends checkins of user which is authenticated under provided access token.
        /// </summary>
        /// <param name="accessToken">access token under which a specific user is logged in</param>
        /// <returns>list of recent Checkins</returns>
        public List<Checkin> GetFriendsRecentCheckins(string accessToken)
        {
            if (accessToken != null)
            {
                // set access token for SharpSquare service
                sharpSquare.SetAccessToken(accessToken);

                Dictionary<string, string> parameters = new Dictionary<string, string>();
                parameters.Add("limit", "100");
                parameters.Add("afterTimestamp", "14515200" /* 1 week in seconds */);

                List<Checkin> checkins = null;
                try
                {
                    checkins = sharpSquare.GetRecentCheckin(parameters);
                }
                catch (WebException webEx)
                {
                    return null;
                }

                return checkins;
            }
            else
                return null;
        }
    }
}