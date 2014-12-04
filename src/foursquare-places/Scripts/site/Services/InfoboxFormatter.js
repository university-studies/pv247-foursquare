define(["foursquare-module"], function (app) {

    var injectParams = [];
    var InfoboxFormatter = function () {
        function createContent(venue) {
            var container = document.createElement('div');
            container.className = container.className + " infobox";
            console.log(container.className);
            var name = document.createElement('h5');
            name.classList.add('name');
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

            var p = document.createElement('p');
            p.innerHTML = "Checkins count: " + venue.CheckinsCount + "<br/>" + "Here now: " + venue.HereNow;
            container.appendChild(p);

            return container;

        }

        return {
            createContent: createContent
            }
        }

    InfoboxFormatter.$inject = injectParams;
    app.factory("InfoboxFormatter", InfoboxFormatter);
});
