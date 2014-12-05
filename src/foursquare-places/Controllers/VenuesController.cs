using FourSquare.SharpSquare.Entities;
using foursquare_places.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace foursquare_places.Controllers
{
    public class VenuesController : ApiController
    {
        private FoursquareClient client = new FoursquareClient();

        // GET /api/venues
        [HttpGet]
        public HttpResponseMessage Get([FromUri]Models.Location location)
        { 
            if(!string.IsNullOrEmpty(location.ToString()))
            {
                try
                {
                    var places = client.SearchPlaces(location, HttpContext.Current.Session["AccessToken"] as string);
                    return Request.CreateResponse<List<FPlace>>(HttpStatusCode.OK, places, "application/json");
                }
                catch (InvalidOperationException ioEx)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, ioEx.Message);
                }
                catch (ArgumentNullException anEx)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Bad location data");
                }
                catch (Exception ex)
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                }
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, "Empty location");
            }
        }
    }
}
