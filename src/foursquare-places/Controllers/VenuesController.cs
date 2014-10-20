using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using foursquare_places.Models;
using FourSquare.SharpSquare.Entities;

namespace foursquare_places.Controllers
{
    public class VenuesController : ApiController
    {
        // POST /api/venues
        public HttpResponseMessage Post(string location)
        {
            if (ModelState.IsValid && !string.IsNullOrEmpty(location))
            {
                var venues = Foursquare.SearchVenues(location);
                return Request.CreateResponse<List<Venue>>(HttpStatusCode.OK, venues, "application/json");
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, "Empty location");
            }

        }
    }
}
