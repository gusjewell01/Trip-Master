

window.onload = function(){
    

    $("#login").click(function(){
        $("#content").html(
        "<label for='email'>Email:</label><input type='text' id='email'><br>"+
        "<label for='password'>Password:</label><input type='password' id='password'><br>"+
        "<button id='login_button'>Login</button>");

        $("#login").css("background-color","#ddd");
        $("#login").css("color","rgb(53,53,53)");
        $("#new_user").css("background-color","rgb(53,53,53)");
        $("#new_user").css("color","#ddd");
        
        $("#login_button").click(function(){

            let email = $("#email").val();
            let password = $("#password").val();
            let form_data = {
                email: email,
                password: password
            };

            alert("Logging in...");
            alert(JSON.stringify(form_data));
        });


    });

    $("#login").css("background-color","#ddd");
    $("#login").css("color","rgb(53,53,53)");

    $("#login_button").click(function(){

        let email = $("#email").val();
        let password = $("#password").val();

        let form_data = {
            email: email,
            password: password
        };

        alert("Logging in...");
        alert(JSON.stringify(form_data));
    });

    $("#new_user").click(function(){
        $('#content').html(
        "<label for='name'>Full Name:</label><input type='text' id='name'><br>"+
        "<label for='email'>Email:</label><input type='text' id='email'><br>"+
        "<label for='password'>Password:</label><input type='password' id='password'><br>"+
        "<label for='Cpassword'>Confirm Password:</label><input type='password' id='Cpassword'><br>"+
        "<button id='new_user_button'>Create Account</button>");

        $("#new_user").css("background-color","#ddd");
        $("#new_user").css("color","rgb(53,53,53)");

        $("#login").css("background-color","rgb(53,53,53)");
        $("#login").css("color","#ddd");

        $("#new_user_button").click(function(){
            var name = $("#name").val();
            var email = $("#email").val();
            var password = $("#password").val();
            var form_data = {
                name:name,
                email:email,
                password:password
            };


            alert("new user created...\n");
            alert(JSON.stringify(form_data));


            




        });
    });


}