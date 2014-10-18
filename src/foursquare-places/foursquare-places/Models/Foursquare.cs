using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FourSquare.SharpSquare.Core;
using FourSquare.SharpSquare.Entities;

namespace foursquare_places.Models
{
    public class Foursquare
    {
        private const string CLIENT_ID = "GDHBR0DWONQMGKS0SAFMLUKLZ2GZADYBYZGOKC3LTPGLTONF";
        private const string CLIENT_SECRET = "WP5HNM3YCUOIPW2FKHC2G1BETQWE5LVTUBRNYCU2CG2ONJQL";

        public static List<Venue> SearchVenues()
        {
            var sharpSquare = new SharpSquare(CLIENT_ID, CLIENT_SECRET);

            Dictionary<string, string> parameters = new Dictionary<string, string>();
            parameters.Add("ll", "49.211417, 16.597629");
            parameters.Add("limit", "50");
            parameters.Add("radius", "5000");

            return sharpSquare.SearchVenues(parameters);
        }
    }
}