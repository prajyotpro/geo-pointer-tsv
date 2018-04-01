const API_HOST = window.location.href +"api/v1/search/";

$("#error-msg").hide();

var search = function() {

    var radius      = $("#radius").val();
    var latitude    = $("#latitude").val();
    var longitude   = $("#longitude").val(); 

    if(isNaN(radius) || isNaN(latitude) || isNaN(longitude)) {
        $("#error-msg").show();
        return null;
    }

    $("#error-msg").hide();

    $.get( API_HOST + "?radius="+radius+"&latitude="+latitude+"&longitude="+longitude, 
        function( data ) {
            console.log(data);
            if(data.data != undefined && data.data.length > 0) {

                fillFoundTable(data.data);
                plotCoordinates(data.data, {lat: latitude, lng: longitude});
            }
    });
}


var plotCoordinates = function(result, mapPoint) { 
    
    mapPoint.lat = parseFloat(mapPoint.lat);
    mapPoint.lng = parseFloat(mapPoint.lng);
    
    var map = new google.maps.Map(document.getElementById('map_switch'), {
          zoom: 12,
          center: mapPoint
    });    

    // From the point you are searching
    var  marker = new google.maps.Marker({
        position: mapPoint,
        label: "HERE",
        map: map                    
    });
    
    marker.setMap(map);


    // Mark the found points
    result.forEach(function(val) {
        
        coordinates = {
            lat : parseFloat(val.coordinates.latitude),
            lng : parseFloat(val.coordinates.longitude)
        };

        var  marker = new google.maps.Marker({
            position: coordinates,
            label: val.type,
            map: map                    
        });
        
        marker.setMap(map);
    }); 
};


var fillFoundTable = function(data) { 

    var template = $('#template').html();
    Mustache.parse(template);   // optional, speeds up future uses
    var rendered = Mustache.render(template, {"points": data});
    $('#target').html(rendered);
};