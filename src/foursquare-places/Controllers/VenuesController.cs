using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using foursquare_places.Models;
using FourSquare.SharpSquare.Entities;
using System.Threading.Tasks;
using System.Diagnostics;

namespace foursquare_places.Controllers
{
    public class VenuesController : ApiController
    {
        // POST /api/venues
        [HttpPost]
        public HttpResponseMessage Post([FromBody]foursquare_places.Models.Location location)
        {

            Debug.WriteLine(location);
            if (!string.IsNullOrEmpty(location.ToString()))
            {
                var venues = Foursquare.SearchVenues(location.ToString());
                return Request.CreateResponse<List<Venue>>(HttpStatusCode.OK, venues, "application/json");
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, "Empty location");
            }

        }
    }
}
