using FourSquare.SharpSquare.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace foursquare_places.Models
{
    public static class TransformerHelpers
    {
        private static VenueCategoriesManager venueCatManager = new VenueCategoriesManager();

        /// <summary>
        /// Transforms provided list of Venues to list of FPlaces. If list of recent Checkins is provided, places will contain names of friends that checked at specific place.
        /// </summary>
        /// <param name="venues">list of Venue objects to transform</param>
        /// <param name="checkins">list of Checkin objects to include in places</param>
        /// <returns>list of transformed FPlaces</returns>
        public static List<FPlace> TransformToFPlaces(List<Venue> venues, List<Checkin> checkins)
        {
            if (venues == null)
                throw new ArgumentNullException("venues");

            List<FPlace> places = new List<FPlace>();

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

            return places;
        }

        /// <summary>
        /// Transforms User object to lighter FUser object
        /// </summary>
        /// <param name="user">user object to transform</param>
        /// <returns>transformed lighter FUser object</returns>
        public static FUser TransformToFUser(User user)
        {
            if (user == null)
                throw new ArgumentNullException("user");

            return new FUser
            {
                Id = user.id,
                Name = user.firstName + " " + user.lastName,
                Photo = user.photo.prefix + user.photo.suffix.Substring(1),
                HomeCity = user.homeCity,
                FriendsCount = user.friends.count
            };
        }
    }
}