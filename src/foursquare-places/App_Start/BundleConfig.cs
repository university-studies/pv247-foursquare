using System.Web;
using System.Web.Optimization;

namespace foursquare_places
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/angular")
                .Include("~/Scripts/site/Controllers/*.js")
                .Include("~/Scripts/site/Services/*.js"));

            bundles.Add(new ScriptBundle("~/bundles/angularUI").Include("~/Scripts/ui-bootstrap-tpls-0.11.2.js"));

            bundles.Add(new ScriptBundle("~/bundles/foursquare-module").Include("~/Scripts/site/foursquare-module.js"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = false;
        }
    }
}
