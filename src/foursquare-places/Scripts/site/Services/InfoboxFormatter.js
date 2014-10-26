angular.module('FoursquareModule').factory('InfoboxFormatter', function () {

    function getContent(venue) {
        
        var container = document.createElement('div');
        var name = document.createElement('h6');
        name.innerHTML = venue.name;
        container.appendChild(name);

        var description = document.createElement('p');        
        description.innerHTML = venue.description;
        container.appendChild(description);

        var linkContainer = document.createElement('p');
        var link = document.createElement('a');
        link.innerHTML = "Homepage";
        link.setAttribute('href', venue.url);
        linkContainer.appendChild(link);

        if (venue.url !== null) {
            container.appendChild(linkContainer);
        }
        
        return container;

    }

    function addElement(venue) {

        var ni = document.getElementById('infobox-holder');
        var newdiv = document.createElement('div');

        newdiv.setAttribute('id', "infobox");
        newdiv.appendChild(getContent(venue));
        ni.appendChild(newdiv);
    }


    return {

        addElement: addElement
    }   
});