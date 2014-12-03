using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace foursquare_places.Models
{
    public class FUser
    {
        public string Id;
        public string Name;
        public string Photo;
        public string HomeCity;
        public long FriendsCount;

        public FUser()
        {
            Id = string.Empty;
            Name = string.Empty;
            Photo = string.Empty;
            HomeCity = string.Empty;
            FriendsCount = 0;
        }

        public override string ToString()
        {
            return Name;
        }
    }
}