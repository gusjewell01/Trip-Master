

window.onload = function(){
    $("#new_trip").click(function(){
        $("#new_trip_body").html();
    });
    $("#create").click(function() {
        
        let name = $("#tripname").val();
        let destination = $("#tripDestination").val();
        let budget = $("#budget").val();
        let interests = $("#interest").val();
        let start = $("#startDate").val();
        let end = $("#endDate").val();
        alert("Trip Created!\nName: " + name +"\n" + "Destination: " + destination + "\n" + "Budget: " + budget + 
        "\nInterests: " + interests +"\nStart Date: " + start + "\nEnd Date: " + end);
    });


}

function initMap(){
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.397, lng: -80.844 },
        zoom: 8,
    });
}

