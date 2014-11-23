describe("Factory: MarkerFormatter", function () {
    var venue, location, map, categories, marker;


    beforeEach(module('FoursquareModule'));

    beforeEach(inject(function ($injector) {

        MarkerFormatter = $injector.get('MarkerFormatter');
        map = new google.maps.Map(document.createElement("p"), {});
        location = { Latitude: 58.68, Longitude: 48.24 }

    }));

    it("should return marker", function () {
        venue = { Location: location };
        categories = {};

        marker = MarkerFormatter.markVenue(venue, map, categories);

        expect(marker).toBeDefined();
        expect(marker).toBeTruthy();
    });

    it("should return marker with id, title, category, clickable, map", function () {
        venue = {
            Id: 1,
            Name: 'mocked venue',
            Location: location,
            Category: 'Unknown',
            CheckinsCount: 150,

        };
        categories = { 'Unknown': true };

        marker = MarkerFormatter.markVenue(venue, map, categories);

        expect(marker.clickable).toBe(true);
        expect(marker.title).toBe(venue.Name);
        expect(marker.category).toBe(venue.Category);
        expect(marker.id).toBe(venue.Id);
        expect(marker.map).toBe(map);

    });

    it("should return marker with position set", function () {
        venue = { Location: location };
        categories = { 'Unknown': true };

        marker = MarkerFormatter.markVenue(venue, map, categories);

        expect(marker.position.k).toBeCloseTo(58.68);
        expect(marker.position.B).toBeCloseTo(48.24);
    });

    it("should return marker without map set if category is filtered", function () {
        venue = { Location: location, Category: 'Unknown' };
        categories = { 'Unknown': false };

        maker = MarkerFormatter.markVenue(venue, map, categories);

        expect(marker.map).toBeNull();
    });
});