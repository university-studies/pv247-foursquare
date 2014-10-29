﻿using FourSquare.SharpSquare.Core;
using FourSquare.SharpSquare.Entities;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace foursquare_places.Models
{
    public class Foursquare
    {
        private const string CLIENT_ID = "GDHBR0DWONQMGKS0SAFMLUKLZ2GZADYBYZGOKC3LTPGLTONF";
        private const string CLIENT_SECRET = "WP5HNM3YCUOIPW2FKHC2G1BETQWE5LVTUBRNYCU2CG2ONJQL";

        public static List<Category> VenueCategories { get; set; }

        public static List<Venue> SearchVenues(string location)
        {
            var sharpSquare = new SharpSquare(CLIENT_ID, CLIENT_SECRET);

            Dictionary<string, string> parameters = new Dictionary<string, string>();
            parameters.Add("ll", location);
            parameters.Add("limit", "50");
            parameters.Add("radius", "5000");

            var venues = sharpSquare.SearchVenues(parameters);
            if (venues != null && VenueCategories != null)
                SetRootVenueCategories(venues);

            return venues;
        }

        public static void LoadVenueCategories()
        {
            var sharpSquare = new SharpSquare(CLIENT_ID, CLIENT_SECRET);

            VenueCategories = sharpSquare.GetVenueCategories();
        }

        private static void SetRootVenueCategories(List<Venue> venues)
        {
            if (venues != null)
            {
                foreach (Venue venue in venues)
                {
                    foreach (Category category in venue.categories.ToArray())
                    {
                        var newCategory = GetRootCategory(category);
                        venue.categories.Remove(category);
                        venue.categories.Add(newCategory);
                    }
                }
            }
        }

        private static Category GetRootCategory(Category category)
        {
            foreach (Category cat in VenueCategories)
            {
                if (IsSubcategory(category, cat))
                    return cat;
            }

            return category;
        }

        private static bool IsSubcategory(Category categoryToFind, Category rootCategory)
        {
            if (categoryToFind.id == rootCategory.id)
                return true;
            else
            {
                if (rootCategory.categories == null)
                    return false;
                else
                {
                    foreach (Category cat in rootCategory.categories)
                    {
                        if (IsSubcategory(categoryToFind, cat))
                            return true;
                    }

                    return false;
                }
            }
        }
    }
}