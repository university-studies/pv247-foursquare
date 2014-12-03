define(["foursquare-module"], function (app) {

    var injectParams = [];
    var InfoboxFormatter = function () {
        function createContent(venue) {
            var container = document.createElement('div');
            container.className = container.className + " infobox";
            var name = document.createElement('h5');
            name.innerHTML = venue.Name;
            container.appendChild(name);

            var description = document.createElement('p');
            description.innerHTML = venue.Description;
            if (venue.Description) {
                container.appendChild(description);
            }

            var linkContainer = document.createElement('p');
            var link = document.createElement('a');
            link.innerHTML = "Homepage";
            link.setAttribute('href', venue.Url);
            linkContainer.appendChild(link);
            if (venue.Url) {
                container.appendChild(linkContainer);
            }

            var checkins = document.createElement('p');
            checkins.innerHTML = "Checkins count: " + venue.CheckinsCount;
            container.appendChild(checkins);

            var hereNow = document.createElement('p');
            hereNow.innerHTML = "Here now: " + venue.HereNow;
            container.appendChild(hereNow);

            return container;

        }

        return {
            createContent: createContent
            }
        }

    InfoboxFormatter.$inject = injectParams;
    app.factory("InfoboxFormatter", InfoboxFormatter);
});
