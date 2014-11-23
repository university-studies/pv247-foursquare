using System.Web.Mvc;
using System.Web.Routing;

namespace foursquare_places
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}",
                defaults: new { controller = "Home", action = "Index" }
            );
             
            routes.MapRoute(
                name: "AuthorizeCallback",
                url: "{controller}/{action}",
                defaults: new { controller = "Home", action = "AuthorizeCallback" });

        }
    }
}
