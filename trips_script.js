

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

    function Stop(number, name, distance, duration) {
        this.number = number;
        this.name = name;
        this.distance = distance;
        this.duration = duration;
    }

    function Expense(date, name, amount, owedTo) {
        this.date = date;
        this.name = name;
        this.amount = amount;
        this.owedTo = owedTo;
        this.users = [];
    }

    function tripImage(date, name, src, loc) {
        this.date = date;
        this.name = name;
        this.src = src;
        this.loc = loc;
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
        this.stopNames = [origin];
        this.stops = [];
        this.events = [];
        this.distances = [];
        this.durations = [];
        this.expenses=[];
        this.images=[];
    

        this.addEvent = function(event) {
            this.events.push(event);
        }

        this.addStopName = function(stop) {
            this.stopNames.push(stop);
        }

        this.addUser = function(newUser) {
            this.users.push(newUser);
        }

        this.addUserEmail = function(newUserEmail) {
            this.userEmails.push(newUserEmail);
        }

        this.getStopNames = function() {
            return this.stopNames;
        }
    }
    var max, min;

    //create trip object, add stop/trip members/event control
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
        document.getElementById("add_image_container").style.display = "block";


        max = document.getElementById("maxBudget").value;
        min = document.getElementById("minBudget").value;
    });


    
    const inpFile = document.getElementById("inpFile");
    const previewContainer = document.getElementById("imagePreview");
    const previewImage = previewContainer.querySelector(".image-preview__image");
    const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");

    //display image preview 
    inpFile.addEventListener("change", function(){
        const file = this.files[0];

        if (file) {
            const reader = new FileReader();

            previewDefaultText.style.display = "none";
            previewImage.style.display = "block";

            reader.addEventListener("load", function() {
                previewImage.setAttribute("src", this.result);
            });
            reader.readAsDataURL(file); 
        } else {
            //remove image preview when no file selected
            previewDefaultText.style.display = "block";
            previewImage.style.display = "none";
            previewImage.setAttribute("src", "");
        }
    });

    //add image to trip object and html row site
    $("#addImage").click(function() {
        document.getElementById("images_container").style.display = "block";
        imageName = $('#imageName').val();
        imageDate = $('#imageDate').val();
        imageLocation = $('#imageLocation').val();


        Hsrc = previewImage.src;
        newImage = new tripImage(imageDate, imageName, Hsrc, imageLocation);
        trips[0].images.push(newImage);


        $(".image-table tbody").append("<tr image-src = '"+Hsrc+"'image-date ='"+imageDate+"' image-name='"+imageName+"' image-loc='"+imageLocation+
        "'><td class = 'table-image'><img src='"+Hsrc+"' class='image-table__image'></td><td>"+imageDate+"</td><td>"+imageName+
        "</td><td>"+imageLocation+"</td><td><button class='btn btn-danger btn-lg btn-image-delete mr-3' type ='button'>Delete</button><button class='btn btn-info btn-lg btn-image-edit' type ='button'>Edit</button></td></tr>");

    });

    //remove image from trip object and html row site
    $('body').on('click', '.btn-image-delete', function() {
        let imageToDel = $(this).parents('tr').attr('image-name');
        var nameFound = false;
        let index = 0;
        for (let i = 0; i<= trips[0].images.length; i++) {
            if (trips[0].images[i].name == imageToDel) {
                
                index = i;
                nameFound = true;
                break;
            }
        }
        if (nameFound) {
            trips[0].images.splice(index, 1);
            
            
        }
        else {
            alert("Event not found!");
        }
        $(this).parents('tr').remove();
        
    });

    //open forms to edit image values
    $('body').on('click', '.btn-image-edit', function() {
        var date =$(this).parents('tr').attr('image-date');
        var name =$(this).parents('tr').attr('image-name');  
        var loc =$(this).parents('tr').attr('image-loc');

        $(this).parents('tr').find('td:eq(1)').html("<input type ='date' name='edit_image_date' value='"+date+"'>");
        $(this).parents('tr').find('td:eq(2)').html("<input type ='text' name='edit_image_name' value='"+name+"'>");
        $(this).parents('tr').find('td:eq(3)').html("<input type ='text' id = 'edit_image_loc' name='edit_image_loc' value='"+loc+"'>");

        $(this).parents('tr').find('td:eq(4)').prepend("<button type='button' class ='btn btn-info btn-image-update mr-3'>Update</button>");  
        $(this).hide()

        var updateLoc = document.getElementById("edit_image_loc"); 
        var autocompleteImage = new google.maps.places.Autocomplete(updateLoc, options);
    });

    //save edited values to trip object and site 
    $('body').on('click', '.btn-image-update',function(){
        var date=$(this).parents('tr').find("input[name='edit_image_date']").val();
        var name=$(this).parents('tr').find("input[name='edit_image_name']").val();
        var loc=$(this).parents('tr').find("input[name='edit_image_loc']").val();

        let imageToEdit = $(this).parents('tr').attr('image-src');
        var imageFound = false;
        let index = 0;
        for (let i = 0; i<= trips[0].images.length; i++) {
            if (trips[0].images[i].src == imageToEdit) {
                
                index = i;
                imageFound = true;
                break;
            }
        }

        $(this).parents('tr').find('td:eq(1)').text(date);
        $(this).parents('tr').find('td:eq(2)').text(name);
        $(this).parents('tr').find('td:eq(3)').text(loc);

        $(this).parents('tr').attr('image-date', date);
        $(this).parents('tr').attr('image-name', name);
        $(this).parents('tr').attr('image-loc', loc);

    
        if (imageFound) {
            trips[0].images[index].name = name;
            trips[0].images[index].date = date;
            trips[0].images[index].loc = loc;
            
        }
        
        else {
            alert("Image not found!");
        }
        


        $(this).parents('tr').find('.btn-image-edit').show();
        $(this).parents('tr').find('.btn-image-update').remove();
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
                // trips[0].distances.push(result.routes[0].legs[0].distance.text);
                // trips[0].durations.push(result.routes[0].legs[0].duration.text);
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
    var owes = [];
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

    var input5 = document.getElementById("imageLocation"); 
    var autocomplete4 = new google.maps.places.Autocomplete(input5, options);

    let stopCounter = 0;
    function calcStop() {
        if (tripCreated) {
        stopCounter = stopCounter + 1;
        trips[0].addStopName(document.getElementById("stop").value);

        var request = {
            origin: trips[0].getStopNames()[stopCounter-1],
            destination: trips[0].getStopNames()[stopCounter],
            travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
            unitSystem: google.maps.UnitSystem.IMPERIAL
        }
        
        directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
    
                const output = document.querySelector('#output');
                output.innerHTML = "<br><div class='alert-info'>From: " + trips[0].getStopNames()[stopCounter-1] + ".<br />To: " + trips[0].getStopNames()[stopCounter] +
                 ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text +
                  ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
                trips[0].distances.push(result.routes[0].legs[0].distance.text);
                trips[0].durations.push(result.routes[0].legs[0].duration.text);
                
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

    //save stop to trip object and site html, set stop table to active
    function addStop() {
        document.getElementById("stop_list_container").style.display = "block";
        var newStop = new Stop(stopCounter, trips[0].getStopNames()[stopCounter], trips[0].distances[stopCounter-1], trips[0].durations[stopCounter-1]);
        trips[0].stops.push(newStop);
        let stopNumber = trips[0].stops[stopCounter-1].number;
        let stopName = trips[0].stops[stopCounter-1].name;
        let stopDistance = trips[0].stops[stopCounter-1].distance;
        let stopDuration = trips[0].stops[stopCounter-1].duration;


        

        $(".stop-table tbody").append("<tr stop-num='"+stopNumber+"' stop-name='"+stopName+ "' stop-dist='"+stopDistance+  "' stop-dur='"+stopDuration+ 
        "'><td>"+stopNumber+"</td><td>"+stopName+"</td><td>"+stopDistance+"</td><td>"+stopDuration+
        "</td><td><button class='btn btn-danger btn-lg btn-stop-delete mr-3' type ='button'>Delete</button></td></tr>");

        $("input[stop='']").val("");

    
    }

    //delete stop from row on site and trip object
    $('body').on('click', '.btn-stop-delete', function() {
        let stopToDel = $(this).parents('tr').attr('stop-name');
        var nameFound = false;
        let index = 0;
        for (let i = 0; i<= trips[0].stops.length; i++) {
            if (trips[0].stops[i].name == stopToDel) {
                
                index = i;
                nameFound = true;
                break;
            }
        }
        if (nameFound) {
            trips[0].stops.splice(index, 1);
            
            
        }
        else {
            alert("Event not found!");
        }
        stopCounter = stopCounter - 1;
        $(this).parents('tr').remove();
        
    });

    //add event to trip object and site row display
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
                    //show event table and calendar
                    document.getElementById("event_list_container").style.display = "block";
                    document.getElementById("calendar_container").style.display = "block";

                    $(".data-table tbody").append("<tr data-date='"+eventDate+"' data-name='"+eventName+ "' data-start='"+startTime+  "' data-end='"+endTime+ "' data-loc='"+eventLoc+ "' data-desc='"+eventDesc+
                    "'><td>"+eventDate+"</td><td>"+eventName+"</td><td>"+startTime+"</td><td>"+endTime+"</td><td>"+eventLoc+"</td><td>"+eventDesc+
                    "</td><td><button class='btn btn-danger btn-lg btn-delete mr-3' type ='button'>Delete</button><button class='btn btn-info btn-lg btn-edit' type ='button'>Edit</button></td></tr>");

                    $("input[eventName='']").val("");
                    
                }
            } else
            alert("No Active Trip!");
        
    }

    //delete event from site row and trip object
    $('body').on('click', '.btn-delete', function() {
        let eventToDel = $(this).parents('tr').attr('data-name');
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
            
            
        }
        else {
            alert("Event not found!");
        }
        $(this).parents('tr').remove();
        
    });

    //open forms to edit event values
    $('body').on('click', '.btn-edit', function() {
        var date =$(this).parents('tr').attr('data-date');
        var name =$(this).parents('tr').attr('data-name');
        var start =$(this).parents('tr').attr('data-start');
        var end =$(this).parents('tr').attr('data-end');
        var loc =$(this).parents('tr').attr('data-loc');
        var desc =$(this).parents('tr').attr('data-desc');

        $(this).parents('tr').find('td:eq(0)').html("<input type ='date' name='edit_date' value='"+date+"'>");
        $(this).parents('tr').find('td:eq(1)').html("<input type ='text' name='edit_name' value='"+name+"'>");
        $(this).parents('tr').find('td:eq(2)').html("<input type ='text' name='edit_start' value='"+start+"'>");
        $(this).parents('tr').find('td:eq(3)').html("<input type ='text' name='edit_end' value='"+end+"'>");
        $(this).parents('tr').find('td:eq(4)').html("<input type ='text' id = 'edit_loc' name='edit_loc' value='"+loc+"'>");
        $(this).parents('tr').find('td:eq(5)').html("<input type ='text' name='edit_desc' value='"+desc+"'>");

        $(this).parents('tr').find('td:eq(6)').prepend("<button type='button' class ='btn btn-info btn-update mr-3'>Update</button>");  
        $(this).hide()

        var input5 = document.getElementById("edit_loc"); 
        var autocomplete5 = new google.maps.places.Autocomplete(input5, eventOptions);
    });

    //save edited values to trip object and site 
    $('body').on('click', '.btn-update',function(){
        var date=$(this).parents('tr').find("input[name='edit_date']").val();
        var name=$(this).parents('tr').find("input[name='edit_name']").val();
        var start=$(this).parents('tr').find("input[name='edit_start']").val();
        var end=$(this).parents('tr').find("input[name='edit_end']").val();
        var loc=$(this).parents('tr').find("input[name='edit_loc']").val();
        var desc=$(this).parents('tr').find("input[name='edit_desc']").val();

        let nameToEdit = $(this).parents('tr').attr('data-name');
        var nameFound = false;
        let index = 0;
        for (let i = 0; i<= trips[0].events.length; i++) {
            if (trips[0].events[i].name == nameToEdit) {
                
                index = i;
                nameFound = true;
                break;
            }
        }

        $(this).parents('tr').find('td:eq(0)').text(date);
        $(this).parents('tr').find('td:eq(1)').text(name);
        $(this).parents('tr').find('td:eq(2)').text(start);
        $(this).parents('tr').find('td:eq(3)').text(end);
        $(this).parents('tr').find('td:eq(4)').text(loc);
        $(this).parents('tr').find('td:eq(5)').text(desc);

        $(this).parents('tr').attr('data-date', date);
        $(this).parents('tr').attr('data-name', name);
        $(this).parents('tr').attr('data-start', start);
        $(this).parents('tr').attr('data-end', end);
        $(this).parents('tr').attr('data-loc', loc);
        $(this).parents('tr').attr('data-desc', desc);

    
        if (nameFound) {
            trips[0].events[index].name = name;
            trips[0].events[index].date = date;
            trips[0].events[index].start = start;
            trips[0].events[index].end = end;
            trips[0].events[index].loc = loc;
            trips[0].events[index].desc = desc;
            
        }
        
        else {
            alert("Event not found!");
        }
        


        $(this).parents('tr').find('.btn-edit').show();
        $(this).parents('tr').find('.btn-update').remove();
    });

    
    //add member to trip object and expense list table
    function addMember(){
        document.getElementById("budget_split_container").style.display = "block";
        document.getElementById("trip_expense_container").style.display = "block";
        members.push(document.getElementById("memberName").value);
        contact.push(document.getElementById("contact").value)
        owes.push(0);
        
        var rowCount = members.length;        
        var table = document.getElementById("memberTable");        
        var tbody = table.lastElementChild;        
        var row = tbody.insertRow(rowCount - 1);
        
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        row.insertCell(2);
        cell1.innerHTML = members[rowCount - 1];
        cell2.innerHTML = contact[rowCount - 1];
        
        document.getElementById("max").innerHTML = "Max Budget:"+max;
        document.getElementById("min").innerHTML = "Min Budget:"+min;

        var txt2 = $("<li><input type=checkbox class=member /> <label name=memberName> </label></li>");
            $("#memberList").append(txt2);

            document.getElementsByClassName("member")[rowCount - 1].setAttribute("value", rowCount - 1);
            var nlabel = document.getElementsByName("memberName");
            nlabel[rowCount - 1].textContent = members[rowCount - 1];

    }

    //split budget between memebers
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

    var expenditure;

    //add expense to trip object and owed amounts
    function addExpense(){
        var n = 0;
        expenditure = document.getElementById("expend").value;
        var exName = $("#exName").val();
       
        alert("Expense Created!\nName: " + exName +"\nExpenditure: " + expenditure );
        var e = document.getElementsByClassName("member");
        for(var checked of e){
            if(checked.checked){
                n++;
            }   
        }

        for(var checked of e){
            if(checked.checked){
                owes[checked.value] += (expenditure / n);    
                           
            }   
        }
       
        var table = document.getElementById("memberTable");
        let length = members.length;
        for(let i = 1; i<= length; i++ ){
            table.rows[i].cells[2].innerHTML = owes[i - 1];
        }
        
        let expenseDate = $("#exDate").val();
        let expenseName = $("#exName").val();
        let expenseAmount = $("#expend").val();
        let expenseOwed = $("#owedTo").val();
        let expenseUsers = "";

        
        document.getElementById("expense_list_container").style.display = "block";
        var newExpense = new Expense(expenseDate, expenseName, expenseAmount, expenseOwed);

        for(var checked of e){
            if(checked.checked){
                newExpense.users.push(members[checked.value]);
                if (checked.value == members.length -1){
                expenseUsers = expenseUsers + members[checked.value];
                } else {
                expenseUsers = expenseUsers + members[checked.value] + ", ";
                }
                         
            }   
        }
        
        trips[0].expenses.push(newExpense);


        $(".expense-table tbody").append("<tr ex-date='"+expenseDate+"' ex-name='"+expenseName+ "' ex-amount='"+expenseAmount+ "' ex-users='"+expenseUsers+  "' ex-owe='"+expenseOwed+ 
        "'><td>"+expenseDate+"</td><td>"+expenseName+"</td><td>"+expenseAmount+"</td><td>"+expenseUsers+"</td><td>"+expenseOwed+
        "</td><td><button class='btn btn-danger btn-lg btn-exp-delete mr-3' type ='button'>Delete</button><button class='btn btn-info btn-lg btn-exp-edit' type ='button'>Edit</button></td></tr></td></tr>");

        $("input[stop='']").val("");
    }

    //delete expense row from site and trip object
    $('body').on('click', '.btn-exp-delete', function() {
        let expToDel = $(this).parents('tr').attr('ex-name');
        var nameFound = false;
        let index = 0;
        for (let i = 0; i<= trips[0].expenses.length; i++) {
            if (trips[0].expenses[i].name == expToDel) {
                
                index = i;
                nameFound = true;
                alert("found");
                break;
                
            }
        }
        if (nameFound) {
            trips[0].expenses.splice(index, 1);
            
            
        }
        else {
            alert("Event not found!");
        }
        $(this).parents('tr').remove();
        
    });

// open forms to edit expense values
    $('body').on('click', '.btn-exp-edit', function() {
        var date =$(this).parents('tr').attr('ex-date');
        var name =$(this).parents('tr').attr('ex-name');
        var amount =$(this).parents('tr').attr('ex-amount');
        var users =$(this).parents('tr').attr('ex-users');
        var owe =$(this).parents('tr').attr('ex-owe');
        

        $(this).parents('tr').find('td:eq(0)').html("<input type ='date' name='edit_ex_date' value='"+date+"'>");
        $(this).parents('tr').find('td:eq(1)').html("<input type ='text' name='edit_ex_name' value='"+name+"'>");
        $(this).parents('tr').find('td:eq(2)').html("<input type ='text' name='edit_ex_amount' value='"+amount+"'>");
        $(this).parents('tr').find('td:eq(3)').html("<input type ='text' name='edit_ex_users' value='"+users+"'>");
        $(this).parents('tr').find('td:eq(4)').html("<input type ='text' name='edit_ex_owe' value='"+owe+"'>");

        $(this).parents('tr').find('td:eq(5)').prepend("<button type='button' class ='btn btn-info btn-exp-update mr-3'>Update</button>");  
        $(this).hide()

        var input5 = document.getElementById("edit_loc"); 
        var autocomplete5 = new google.maps.places.Autocomplete(input5, eventOptions);
    });

    //update values on site and trip object
    $('body').on('click', '.btn-exp-update',function(){
        var date=$(this).parents('tr').find("input[name='edit_ex_date']").val();
        var name=$(this).parents('tr').find("input[name='edit_ex_name']").val();
        var amount=$(this).parents('tr').find("input[name='edit_ex_amount']").val();
        var users=$(this).parents('tr').find("input[name='edit_ex_users']").val();
        var owe=$(this).parents('tr').find("input[name='edit_ex_owe']").val();
        

        let nameToEdit = $(this).parents('tr').attr('ex-name');
        
        var nameFound = false;
        let index = 0;
        for (let i = 0; i<= trips[0].expenses.length; i++) {
            if (trips[0].expenses[i].name == nameToEdit) {
                
                index = i;
                nameFound = true;
                break;
            }
        }

        $(this).parents('tr').find('td:eq(0)').text(date);
        $(this).parents('tr').find('td:eq(1)').text(name);
        $(this).parents('tr').find('td:eq(2)').text(amount);
        $(this).parents('tr').find('td:eq(3)').text(users);
        $(this).parents('tr').find('td:eq(4)').text(owe);

        $(this).parents('tr').attr('ex-date', date);
        $(this).parents('tr').attr('ex-name', name);
        $(this).parents('tr').attr('ex-amount', amount);
        $(this).parents('tr').attr('ex-users', users);
        $(this).parents('tr').attr('ex-owe', owe);

    
        if (nameFound) {
            trips[0].expenses[index].name = name;
            trips[0].expenses[index].date = date;
            trips[0].expenses[index].amount = amount;
            trips[0].expenses[index].owe = owe;
            trips[0].expenses[index].users = users.split(', ');
            
        }
        
        else {
            alert("Event not found!");
        }
        
        alert(trips[0].expenses[0].users);


        $(this).parents('tr').find('.btn-edit').show();
        $(this).parents('tr').find('.btn-update').remove();
    });
