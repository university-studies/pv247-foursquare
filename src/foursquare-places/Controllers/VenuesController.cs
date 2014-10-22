using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using foursquare_places.Models;
using FourSquare.SharpSquare.Entities;
using System.Threading.Tasks;

namespace foursquare_places.Controllers
{
    public class VenuesController : ApiController
    {
        // POST /api/venues
        [HttpPost]
        public HttpResponseMessage Post([FromBody]string location)
        {
            location = "49.19506,16.606837";

            if (!string.IsNullOrEmpty(location))
            {
                var venues = Foursquare.SearchVenues(location);
                return Request.CreateResponse<List<Venue>>(HttpStatusCode.OK, venues, "application/json");
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, "Empty location");
            }

        }
    }
}
