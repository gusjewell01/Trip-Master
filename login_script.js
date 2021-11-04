

window.onload = function(){
    $("#login").click(function(){
        $("#content").html("<form id='login_form'>"+
        "<label for='email'>Email:</label><input type='text' id='email'><br>"+
        "<label for='password'>Password:</label><input type='password' id='password'><br>"+
        "<input type='submit' value='login' id='login_button'>"+
        "</form>");

        $("#login").css("background-color","#ddd");
        $("#login").css("color","rgb(53,53,53)");
        $("#new_user").css("background-color","rgb(53,53,53)");
        $("#new_user").css("color","#ddd");


    });

    $("#login").css("background-color","#ddd");
    $("#login").css("color","rgb(53,53,53)");

    $("#new_user").click(function(){
        $('#content').html("<form id='new_user_form'>"+
        "<label for='name'>Full Name:</label><input type='text' is='name'><br>"+
        "<label for='email'>Email:</label><input type='text' id='email'><br>"+
        "<label for='password'>Password:</label><input type='password' id='password'><br>"+
        "<label for='Cpassword'>Confirm Password:</label><input type='password' id='Cpassword'><br>"+
        "<input type='submit' value='Create Account' id='login_button'>"+
        "</form>");

        $("#new_user").css("background-color","#ddd");
        $("#new_user").css("color","rgb(53,53,53)");

        $("#login").css("background-color","rgb(53,53,53)");
        $("#login").css("color","#ddd");
    });
}