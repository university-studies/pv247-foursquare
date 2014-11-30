define(["foursquare-module"], function (app) {

    var injectParams = [];
    var InfoboxFormatter = function () {
        function getContent(venue) {
            var container = document.createElement('div');
            var name = document.createElement('h6');
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

            /*category in infobox for debug 
            var cat = document.createElement('p');
            cat.innerHTML = venue.Category
            container.appendChild(cat);*/

            var checkins = document.createElement('p');
            checkins.innerHTML = "Checkins count: " + venue.CheckinsCount;
            container.appendChild(checkins);

            return container;

        }

        return {

            addElement: function (venue) {
                var ni = document.getElementById('infobox-holder');
                var newdiv = document.createElement('div');

                newdiv.setAttribute('id', "infobox");
                newdiv.appendChild(getContent(venue));
                ni.appendChild(newdiv);
            }
        }

    }

    InfoboxFormatter.$inject = injectParams;
    app.factory("InfoboxFormatter", InfoboxFormatter);
});
