using FourSquare.SharpSquare.Entities;
using foursquare_places.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTestProject
{
    [TestClass]
    public class VenueCategoriesManagerTests
    {
        private VenueCategoriesManager manager;

        [TestInitialize]
        public void Initialize()
        {
            manager = new VenueCategoriesManager();
        }

        [TestCleanup]
        public void CleanUp()
        {
            manager = null;
        }

        [TestMethod]
        public void Construction_ShouldBeSetToObject()
        {
            Assert.IsNotNull(manager);
        }

        [TestMethod]
        public void GetOurCategories_WhenCategoriesNull_ShouldReturnUnknownCategory()
        {
            string category = manager.GetOurCategory(null);

            Assert.IsNotNull(category);
            Assert.AreEqual("Unknown", category);
        }

        [TestMethod]
        public void GetOurCategories_WhenCategoriesEmpty_ShouldReturnUnknownCategory()
        {
            string category = manager.GetOurCategory(new List<Category>());

            Assert.IsNotNull(category);
            Assert.AreEqual("Unknown", category);
        }

        [TestMethod]
        public void GetOurCategories_WhenIvnvalidCategory_ShouldReturnUnknownCategory()
        {
            Category cat = new Category { id = "4bf58dd8d481452e5931735" };
            List<Category> cats = new List<Category> { cat };
            string category = manager.GetOurCategory(cats);

            Assert.IsNotNull(category);
            Assert.AreEqual(category, "Unknown");
        }

        [TestMethod]
        public void GetOurCategories_WhenCategoryMusicVenue_ShouldReturnArtsEntertainmentCategory()
        {
            Category cat = new Category { id = "4bf58dd8d48988d1e5931735" };
            List<Category> cats = new List<Category> { cat };
            string category = manager.GetOurCategory(cats);

            Assert.IsNotNull(category);
            Assert.AreEqual(category, "Arts & Entertainment");
        }        
    }
}
