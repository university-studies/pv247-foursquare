using foursquare_places.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FourSquare.SharpSquare.Entities;
using System.Web;

namespace foursquare_places.Controllers
{
    public class UserController : ApiController
    {
        private FoursquareClient client = new FoursquareClient();

        // GET /api/user
        [HttpGet]
        public HttpResponseMessage GetUser()
        {
            try
            {
                User user = client.GetAuthenticatedUser(HttpContext.Current.Session["AccessToken"] as string);
                return Request.CreateResponse<User>(HttpStatusCode.OK, user, "application/json");
            }
            catch (WebException webEx)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, webEx.Message);
            }
            catch (InvalidOperationException ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }            
        }
    }
}
