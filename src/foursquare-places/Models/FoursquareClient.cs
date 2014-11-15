using FourSquare.SharpSquare.Core;
using FourSquare.SharpSquare.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace foursquare_places.Models
{
    public class FoursquareClient
    {
        private VenueCategoriesManager venueCatManager = new VenueCategoriesManager();
        private SharpSquare sharpSquare = new SharpSquare(
                System.Configuration.ConfigurationManager.AppSettings["FoursquareclientId"],
                System.Configuration.ConfigurationManager.AppSettings["FoursquareclientSecret"]);
        
        /// <summary>
        /// Searches for nearest venues based on provided location
        /// </summary>
        /// <param name="location">location where to search for venues</param>
        /// <returns>List of nearest places</returns>
        public List<FPlace> SearchPlaces(Models.Location location)
        {
            if (location == null)
                throw new ArgumentNullException("location");

            Dictionary<string, string> parameters = new Dictionary<string, string>();
            parameters.Add("ll", location.ToString());
            parameters.Add("limit", "50");
            parameters.Add("radius", "5000");

            var venues = sharpSquare.SearchVenues(parameters);
            return TransformToFPlaces(venues);
        }

        private List<FPlace> TransformToFPlaces(List<Venue> venues)
        {
            List<FPlace> places = new List<FPlace>();

            if (venues != null)
            {
                venues.ForEach(venue =>
                    {
                        places.Add(new FPlace
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
                            });
                    });
            }

            return places;
        }
    }
}