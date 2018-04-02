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
            if(data.data.found != undefined && data.data.found.length > 0) {

                fillFoundTable(data.data.stats);
                drawChat(data.data.stats);
                plotCoordinates(data.data.found, {lat: latitude, lng: longitude});
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


var drawChat = function(stats) { 

    var actualSet = [];
    var foundSet  = [];
    _.each(stats, function(value) {
        actualSet.push(value.actual);
        foundSet.push(value.found);
    });

    new Chart(document.getElementById("bar-chart-grouped"), {
        type: 'bar',
        data: {
            labels: _.pluck(stats, 'key'),
            datasets: [
                {
                label: "Actual",
                backgroundColor: "#3e95cd",
                data: actualSet
                }, {
                label: "Found",
                backgroundColor: "#8e5ea2",
                data: foundSet
                }
            ]
        },
        options: { 
            responsive: false,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Found Points'
            }
        }
    });
};

