using FourSquare.SharpSquare.Entities;
using foursquare_places.Models;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace foursquare_places.Controllers
{
    public class VenuesController : ApiController
    {
        // POST /api/venues
        [HttpPost]
        public HttpResponseMessage Post([FromBody]Models.Location location)
        {
            if (!string.IsNullOrEmpty(location.ToString()))
            {
                try
                {
                    var venues = Foursquare.SearchVenues(location.ToString());
                    return Request.CreateResponse<List<Venue>>(HttpStatusCode.OK, venues, "application/json");
                }
                catch (WebException webEx)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, "Bad location data");
                }
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, "Empty location");
            }

        }
    }
}
