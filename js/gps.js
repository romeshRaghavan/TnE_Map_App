/*jQuery(function($) {
    // Asynchronously Load the map API 

    var script = document.createElement('script');
    script.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyD0NPtKMfbajOEb9di_dt7MU1Qgf78bOd4";
    document.body.appendChild(script);
});*/

function setUpMapLocation(resp) {
    var map;
    var bounds = new google.maps.LatLngBounds();

    var mapOptions = {
        zoom : 12,
    };
    // Display a map on the page
    
    document.getElementById('gpsInputId').style.display="none";
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        
    // call our own api to fetch location data for a user.
    // Multiple Markers
    console.log("resp.formatted_address    "+resp.formatted_address);
    console.log("resp.geometry.location    "+resp.geometry.location.lat);
    console.log("resp.geometry.formatted_address    "+resp.geometry.location.lng);
    var markers = 
        [ resp.formatted_address, resp.geometry.location.lat,resp.geometry.location.lng]
    ;
        
    // Display markers on a map
    var infowindow = new google.maps.InfoWindow({
          content: resp.formatted_address,
           maxWidth: 200
        });

   var lbl =  String.fromCharCode(labels);
    var image = '';
        var position = new google.maps.LatLng(markers[1], markers[2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            label:lbl,
            title: markers[0],
            icon: image
        });

        // Allow each marker to have an info window    
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'idle', function(event) {
        this.setZoom(17);
        google.maps.event.removeListener(boundsListener);
    });
    labels++;console.log("labels   "+labels)
}



