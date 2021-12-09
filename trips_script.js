

    $("#new_trip").click(function(){
        $("#new_trip_body").html();
    });
    
    var dropdown;
    function getDropValue(event){
        dropdown = event.target.value;
        console.log(dropdown);
    }

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
        let interests = dropdown;
        let start = $("#startDate").val();
        let end = $("#endDate").val();

        var Trip1 = new Trip("example user", name, origin, destination, minBudget, maxBudget, interests, start, end);

        tripCreated = true;
        
        trips.push(Trip1);

        alert("Trip Created!\nName: " + name +"\nOrigin: " + origin + "\nDestination: " + destination + "\n" + "Budget: $" + minBudget + 
        " - $" + maxBudget +"\nInterests: " + interests +"\nStart Date: " + start + "\nEnd Date: " + end);
        document.getElementById("trip_members_container").style.display = "block";
        document.getElementById("add_stop_container").style.display = "block";
        document.getElementById("add_event_container").style.display = "block";
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
    var contact = [];
    var options = {
        //optional constraints on autocomplete
        // types: ['(cities)']
    }

    var eventOptions = {
        types: ['establishment']
    }
    //create autocomplete objects for inputs
    var input1 = document.getElementById("from");
    var autocomplete1 = new google.maps.places.Autocomplete(input1, options);
    
    var input2 = document.getElementById("to");
    var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

    var input3 = document.getElementById("stop");
    var autocomplete3 = new google.maps.places.Autocomplete(input3, options);

    var input4 = document.getElementById("eventLoc"); 
    var autocomplete4 = new google.maps.places.Autocomplete(input4, eventOptions);


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
    
                const output = document.querySelector('#output');
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


        document.getElementById("stop_list_container").style.display = "block";
        var rowCount = trips[0].stops.length;        
        var table = document.getElementById("stopTable");     
        var tbody = table.lastElementChild;  
        var row = tbody.insertRow(rowCount - 1);
        
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        
        for (let i = 0; i <=rowCount; i++ ) {
        cell1.innerHTML = i + 1;
        cell2.innerHTML = trips[0].stops[i];
        cell3.innerHTML = result.routes[0].legs[0].distance.text;
        cell4.innerHTML = result.routes[0].legs[0].duration.text;
        
        }
        

    } else 
    alert("No Active Trip!");
        
    }
    function addEvent() {
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
                        alert("Name conflict with event " + trips[0].events[i].name);
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
                    document.getElementById("event_list_container").style.display = "block";

                    var rowCount = trips[0].events.length;        
                    var table = document.getElementById("eventTable");        
                    var tbody = table.lastElementChild;        
                    var row = tbody.insertRow(rowCount - 1);

                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);
                    
                    for (let i = 0; i <=rowCount; i++ ) {
                    cell1.innerHTML = trips[0].events[i].date;
                    cell2.innerHTML = trips[0].events[i].name;
                    cell3.innerHTML = trips[0].events[i].start;
                    cell4.innerHTML = trips[0].events[i].end;
                    cell5.innerHTML = trips[0].events[i].loc;
                    cell6.innerHTML = trips[0].events[i].desc;
                    }
                }
            } else
            alert("No Active Trip!");
        
    }

    function deleteEvent() {
        let eventToDel = document.getElementById("nameToRemove").value;
        
        var nameFound = false;
        let index = 0;
        for (let i = 0; i<= trips[0].events.length; i++) {
            if (trips[0].events[i].name == eventToDel) {
                
                index = i;
                nameFound = true;
                break;
            }
        }
        if (nameFound) {
            trips[0].events.splice(index, 1);
            addEvent();
            
        }
        else {
            alert("Event not found!");
        }
    }

    function addMember(){
        document.getElementById("budget_split_container").style.display = "block";
        trips[0].addUser(document.getElementById("memberName").value);
        trips[0].addUserEmail(document.getElementById("email").value);

        members.push(document.getElementById("memberName").value);
        contact.push(document.getElementById("contact").value)
        
        var rowCount = members.length;        
        var table = document.getElementById("memberTable");        
        var tbody = table.lastElementChild;        
        var row = tbody.insertRow(rowCount - 1);
        
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        row.insertCell(2);
        row.insertCell(3);
        cell1.innerHTML = members[rowCount - 1];
        cell2.innerHTML = contact[rowCount - 1];
        
        document.getElementById("max").innerHTML = "Max Budget:"+max;
        document.getElementById("min").innerHTML = "Min Budget:"+min;
    }

    function split(){
        let length = members.length;
        var table = document.getElementById("memberTable");

        let maxValue = max / length;
        let minValue = min / length;
        
        for(let i = 1; i<= length; i++ ){
            table.rows[i].cells[2].innerHTML = minValue;
            table.rows[i].cells[3].innerHTML = maxValue;
        }
    }
