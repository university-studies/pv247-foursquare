define(["angularMocks", "foursquare-module", "Services/MarkerUtils"], function (mocks, app, MarkerUtils) {

    describe("Factory: MarkerUtils", function () {

        beforeEach(module("FoursquareModule"));
        beforeEach(inject(function ($injector) {
            MarkerUtils = $injector.get('MarkerUtils');
        }));

        describe("filterMarkers function", function () {

            console.log("filterMarkers function");
            console.log(app);
            console.log(mocks);

            var map, markers, categories, m1, m2;

            it("shoud set map for markers when filter is off", function () {
                map = new google.maps.Map(document.createElement('p'), {});
                m1 = new google.maps.Marker({ map: null, category: 'Unknown' }),
                m2 = new google.maps.Marker({ map: null, category: 'Restaurant' });
                markers = [m1, m2];
                categories = { 'Unknown': true, 'Restaurant': true };

                MarkerUtils.filterMarkers(markers, categories, map);

                expect(markers[0].map).toBe(map);
                expect(markers[1].map).toBe(map);
            });

            it("should set map to null for markers when filter is on", function () {
                map = new google.maps.Map(document.createElement('p'), {});
                m1 = new google.maps.Marker({ map: map, category: 'Unknown' }),
                m2 = new google.maps.Marker({ map: map, category: 'Restaurant' });
                markers = [m1, m2];
                categories = { 'Unknown': false, 'Restaurant': false };

                MarkerUtils.filterMarkers(markers, categories, map);

                expect(markers[0].map).toBeNull();
                expect(markers[1].map).toBeNull();
            });
        });

        describe("findDuplicate function", function () {

            beforeEach(function () {
                m1 = new google.maps.Marker({ id: 1, category: 'Unknown' }),
                m2 = new google.maps.Marker({ id:2, category: 'Restaurant' }),
                markers = [m1, m2];
            });

            it("should return null for duplicate venue", function () {
                venue = { Id: 1 };

                val = MarkerUtils.findDuplicate(venue, markers);

                expect(val).toBeNull();
            });

            it("should return venue if duplicate not found", function () {
                venue = { Id: 3 };

                val = MarkerUtils.findDuplicate(venue, markers);

                expect(val).toBe(venue);
            });
        });
    });
});
