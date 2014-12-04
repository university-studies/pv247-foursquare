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
                        Location = new Location 
                            {
                                Latitude = venue.location != null ? venue.location.lat : 0,
                                Longitude = venue.location != null ? venue.location.lng : 0 
                            },
                        Address = venue.location != null ? venue.location.address : string.Empty,
                        City = venue.location != null ? venue.location.city : string.Empty,
                        Country = venue.location != null ? venue.location.country : string.Empty,
                        FormattedAddress = venue.location != null ? venue.location.formattedAddress : null,
                        Phone = venue.contact != null ? venue.contact.phone : string.Empty,
                        Category = venue.categories != null ? venueCatManager.GetOurCategory(venue.categories) : string.Empty,
                        CheckinsCount = venue.stats != null ? venue.stats.checkinsCount : 0,
                        HereNow = venue.hereNow != null ? venue.hereNow.count : 0,
                        Url = venue.url
                    };

                    if (checkins != null)
                    {
                        checkins.ForEach(checkin =>
                        {
                            if (checkin.venue != null && checkin.venue.id == venue.id && checkin.user != null)
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
                Name = user.firstName != null && user.lastName != null ?
                        user.firstName + " " + user.lastName : string.Empty,
                Photo = user.photo != null ? user.photo.prefix + user.photo.suffix.Substring(1) : string.Empty,
                HomeCity = user.homeCity,
                FriendsCount = user.friends != null ? user.friends.count : 0
            };
        }
    }
}