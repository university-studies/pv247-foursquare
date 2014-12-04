using FourSquare.SharpSquare.Core;
using FourSquare.SharpSquare.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace foursquare_places.Models
{
    public class VenueCategoriesManager
    {
        private List<Category> VenueCategories;
        private Dictionary<Category, Category> RootCategoryMappings;
        private SharpSquare sharpSquare = new SharpSquare(
            System.Configuration.ConfigurationManager.AppSettings["ClientId"],
            System.Configuration.ConfigurationManager.AppSettings["ClientSecret"]);

        /// <summary>
        /// Gets string represetation one of our 7 modified categories based on provided list of categories
        /// </summary>
        /// <param name="categories">categories of venue</param>
        /// <returns>Our category as string</returns>
        public string GetOurCategory(List<Category> categories)
        {
            if (categories == null || categories.Count == 0)
                return "Unknown";

            var rootCategory = RootCategoryMappings[categories[0]];
            if (rootCategory == null)
                return "Unknown";

            switch(rootCategory.id)
            {
                case "4d4b7104d754a06370d81259":
                case "4d4b7105d754a06373d81259":
                case "4d4b7105d754a06376d81259":
                    return "Arts & Entertainment";

                case "4d4b7105d754a06374d81259":
                    return "Restaurant";

                case "4d4b7105d754a06372d81259":
                case "4d4b7105d754a06375d81259":
                    return "School & Business";

                case "4e67e38e036454776db1fb3a":
                case "4d4b7105d754a06377d81259":
                    return "Residence & Recreation";

                case "4d4b7105d754a06379d81259":
                    return "Travel & Transport";

                case "4d4b7105d754a06378d81259":
                    return "Shop & Service";

                default:
                    return "Unknown";
            }
        }

        public VenueCategoriesManager()
        {
            this.VenueCategories = sharpSquare.GetVenueCategories();
            this.RootCategoryMappings = new Dictionary<Category, Category>(new CategoryComparer());

            CreateRootCategoryMappings(VenueCategories);
        }

        private void CreateRootCategoryMappings(List<Category> venueCategories)
        {
            venueCategories.ForEach(cat =>
                {
                    RootCategoryMappings.Add(cat, cat);
                    SetAsRootCategory(cat, cat.categories);
                });
        }

        private void SetAsRootCategory(Category rootCategory, List<Category> subcategories)
        {
            if (subcategories != null)
                subcategories.ForEach(category =>
                {
                    RootCategoryMappings.Add(category, rootCategory);
                    SetAsRootCategory(rootCategory, category.categories);
                });
        }
    }

    public class CategoryComparer : IEqualityComparer<Category>
    {
        public bool Equals(Category x, Category y)
        {
            if (x != null && y != null)
                return x.id == y.id;
            else
                return false;
        }

        public int GetHashCode(Category obj)
        {
            if (obj == null)
	            return 0;

            return obj.id.GetHashCode(); 
        }
    }
}