

window.onload = function(){
    $("#new_trip").click(function(){
        $("#new_trip_body").html();
    });

    


}

function initMap(){
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.397, lng: -80.844 },
        zoom: 8,
    });
}

