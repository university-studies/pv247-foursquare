using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace foursquare_places.Models
{
    public class FPlace
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public Location Location { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public List<string> FormattedAddress { get; set; }
        public string Phone { get; set; }
        public string Category { get; set; }
        public List<string> FriendsHere { get; set; }
        public long CheckinsCount { get; set; }
        public long HereNow { get; set; }
        public string Url { get; set; }

        public FPlace()
        {
            Id = string.Empty;
            Name = string.Empty;
            Location = new Location();
            Address = string.Empty;
            City = string.Empty;
            Country = string.Empty;
            FormattedAddress = new List<string>();
            Phone = string.Empty;
            Category = string.Empty;
            FriendsHere = new List<string>();
            CheckinsCount = 0;
            HereNow = 0;
            Url = string.Empty; ;
        }

        public override string ToString()
        {
            return Name;
        }
    }
}