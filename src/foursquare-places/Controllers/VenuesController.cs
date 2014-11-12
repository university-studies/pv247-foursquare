using FourSquare.SharpSquare.Entities;
using foursquare_places.Models;
using System;
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
        private FoursquareClient client = new FoursquareClient();

        // POST /api/venues
        [HttpPost]
        public HttpResponseMessage Post([FromBody]Models.Location location)
        {
            if (!string.IsNullOrEmpty(location.ToString()))
            {
                try
                {
                    var places = client.SearchPlaces(location);
                    return Request.CreateResponse<List<FPlace>>(HttpStatusCode.OK, places, "application/json");
                }
                catch (WebException webEx)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Bad location data");
                }
                catch (ArgumentNullException ex)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Bad location data");
                }
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, "Empty location");
            }

        }
    }
}
