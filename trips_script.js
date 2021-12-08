

    $("#new_trip").click(function(){
        $("#new_trip_body").html();
    });
    

    let trips = [];

    function Event(date, name, start, end, loc, desc) {
        this.date = date;
        this.name = name;
        this.start = start;
        this.end = end;
        this.loc = loc;
        this.desc = desc;
    }
    var tripCreated = false;
    function Trip(user, name, origin, destination, minBudget, maxBudget, interests, start, end) {
        this.user = user;
        this.users = [];
        this.userEmails = [];
        this.name = name;
        this.origin = origin;
        this.destination = destination;
        this.minBudget = minBudget;
        this.maxBudget = maxBudget;
        this.interests = interests;
        this.start = start;
        this.end = end;
        this.stops = [origin];
        this.events = [];

        this.addEvent = function(event) {
            this.events.push(event);
        }

        this.addStop = function(stop) {
            this.stops.push(stop);
        }

        this.addUser = function(newUser) {
            this.users.push(newUser);
        }

        this.addUserEmail = function(newUserEmail) {
            this.userEmails.push(newUserEmail);
        }
        
        this.getUser = function() {
            return this.user;
        }
        this.getUsers = function() {
            return this.users;
        }
        this.getUserEmails = function() {
            return this.userEmails;
        }
        this.getName = function() {
            return this.name;
        }
        this.getOrigin = function() {
            return this.origin;
        }
        this.getDestination = function() {
            return this.destination;
        }
        this.getMinBudget = function() {
            return this.minBudget;
        }
        this.getMaxBudget = function() {
            return this.maxBudget;
        }
        this.getInterests = function() {
            return this.interests;
        }
        this.getStart = function() {
            return this.start;
        }
        this.getEnd = function() {
            return this.end;
        }
        this.getStops = function() {
            return this.stops;
        }
    }

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
        var Trip1 = new Trip("example user", name, origin, destination, minBudget, maxBudget, interests, start, end);

        tripCreated = true;
        
        trips.push(Trip1);

        alert("Trip Created!\nName: " + name +"\nOrigin: " + origin + "\nDestination: " + destination + "\n" + "Budget: $" + minBudget + 
        " - $" + maxBudget +"\nInterests: " + interests +"\nStart Date: " + start + "\nEnd Date: " + end);
        document.getElementById("trip_members_container").style.display = "block";
        max = document.getElementById("maxBudget").value;
        min = document.getElementById("minBudget").value;
    });
    $("#addUser").click(function() {
        if (tripCreated) {
            trips[0].addUserEmail($("#userInfo").val());
            alert("New user added! Current users on trip: " + trips[0].getUserEmails());
        } else 
        alert("No Active Trip!");
    });

    $("#addEvent").click(function() {
        if (tripCreated) {

            var eventConflict = false;
            let eventDate = $("#eventDate").val();
            let eventName = $("#eventName").val();
            let startTime = $("#startTime").val();
            let endTime = $("#endTime").val();
            let eventLoc = $("#eventLoc").val();
            let eventDesc = $("#eventDesc").val();
            
            for (let i = 0; i < trips[0].events.length; i++) {

                if (trips[0].events[i].name == eventName) {
                    alert("Conflict with event " + trips[0].events[i].name);
                    eventConflict = true;
                    break;
                }
                
                if (trips[0].events[i].start == startTime && trips[0].events[i].date == eventDate) {
                    alert("Conflict with event " + trips[0].events[i].name + " on " + trips[0].events[i].date + " at time " + trips[0].events[i].start);
                    eventConflict = true;
                    break;
                }
                if (trips[0].events[i].end == endTime && trips[0].events[i].date == eventDate) {
                    alert("Conflict with event " + trips[0].events[i].name + " on " + trips[0].events[i].date + " at time " + trips[0].events[i].end);
                    eventConflict = true;
                    break;
                }
                
            }
            if (!eventConflict) {
                trips[0].addEvent(new Event(eventDate, eventName, startTime, endTime, eventLoc, eventDesc));
            }
        } else
        alert("No Active Trip!");
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
    
                const output = document.querySelector('#tripOutput');
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

    var input3 = document.getElementById("stop");
    var autocomplete3 = new google.maps.places.Autocomplete(input3, options);


    let stopCounter = 0;

    function addStop() {
        if (tripCreated) {
        stopCounter = stopCounter + 1;
        trips[0].addStop(document.getElementById("stop").value);
    
        var request = {
            origin: trips[0].getStops()[stopCounter-1],
            destination: trips[0].getStops()[stopCounter],
            travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
            unitSystem: google.maps.UnitSystem.IMPERIAL
        }
        
        directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
    
                const output = document.querySelector('#tripOutput');
                output.innerHTML = "<br><div class='alert-info'>From: " + trips[0].getStops()[stopCounter-1] + ".<br />To: " + trips[0].getStops()[stopCounter] + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
    
                //display route
                directionsDisplay.setDirections(result);
            } else {
                //delete route from map
                directionsDisplay.setDirections({ routes: [] });
                
                map.setCenter(myLatLng);
    
                output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
            }
        });
    } else 
    alert("No Active Trip!");
        
    }

    
    function addMember(){
        trips[0].addUser(document.getElementById("memberName").value);
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
