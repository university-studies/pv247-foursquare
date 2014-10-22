using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace foursquare_places.Models
{
    public class Location
    {
        public float Latitude { get; set; }
        public float Longitude { get; set; }

        public override string ToString()
        {
            NumberFormatInfo nfi = new CultureInfo( "en-US", false ).NumberFormat;
            return Latitude.ToString(nfi) + ", " + Longitude.ToString(nfi); 
        }
    }
}