

    $("#new_trip").click(function(){
        $("#new_trip_body").html();
    });
    
    var max, min;
    $("#create").click(function() {
        
        let name = $("#tripname").val();
        let origin = $("#from").val();
        let destination = $("#to").val();
        let minBudget = $("#minBudget").val();
        let maxBudget = $("#maxBudget").val();
        let interests = $("#interests").val();
        let start = $("#startDate").val();
        let end = $("#endDate").val();
        alert("Trip Created!\nName: " + name +"\nOrigin: " + origin + "\nDestination: " + destination + "\n" + "Budget: $" + minBudget + 
        " - $" + maxBudget +"\nInterests: " + interests +"\nStart Date: " + start + "\nEnd Date: " + end);
        document.getElementById("trip_members_container").style.display = "block";
        max = document.getElementById("maxBudget").value;
        min = document.getElementById("minBudget").value;
    });

    var myLatLng = { lat: 35.397, lng: -80.844 };
    var mapOptions = {
        center: myLatLng,
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    
    };
    
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    var directionsService = new google.maps.DirectionsService();
    
    var directionsDisplay = new google.maps.DirectionsRenderer();
    
    directionsDisplay.setMap(map);
    
    
    function calcRoute() {
        
        var request = {
            origin: document.getElementById("from").value,
            destination: document.getElementById("to").value,
            travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
            unitSystem: google.maps.UnitSystem.IMPERIAL
        }
    
        //pass the request to route 
        directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
    
                const output = document.querySelector('#output');
                output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
    
                //display route
                directionsDisplay.setDirections(result);
            } else {
                //delete route from map
                directionsDisplay.setDirections({ routes: [] });
                
                map.setCenter(myLatLng);
    
                output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
            }
        });
    
    }    
    
    var members = [];
    var options = {
        //optional constraints on autocomplete
        // types: ['(cities)']
    }
    //create autocomplete objects for inputs
    var input1 = document.getElementById("from");
    var autocomplete1 = new google.maps.places.Autocomplete(input1, options);
    
    var input2 = document.getElementById("to");
    var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

    function addMember(){
        document.getElementById("budget_split_container").style.display = "block";
        members.push(document.getElementById("memberName").value);
        var rowCount = members.length;
        var table = document.getElementById("memberTable");
        var row = table.insertRow(rowCount);
        var cell1 = row.insertCell(0);
        row.insertCell(1);
        row.insertCell(2);
        cell1.innerHTML = members[rowCount - 1];
       
        
        document.getElementById("max").innerHTML = max;
        document.getElementById("min").innerHTML = min;
    }

    function split(){
        let length = members.length;
        var table = document.getElementById("memberTable");
        console.log(table);
        let maxValue = max / length;
        let minValue = min / length;
        console.log(maxValue, minValue);
        console.log(table.rows);

        for(let i = 1; i<= length; i++ ){
            table.rows[i].cells[1].innerHTML = minValue;
            table.rows[i].cells[2].innerHTML = maxValue;
        }
    }
