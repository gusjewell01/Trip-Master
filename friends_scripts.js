window.onload = function(){
    var people = [{
        name: 'matthew',
        email: 'matthew@gmail.com'
    },{
        name: 'mark',
        email: 'mark@gmail.com'
    },{
        name: 'luke',
        email: 'luke@gmail.com'
    },{
        name: 'john',
        email: 'john@gmail.com'
    },];

    if(!('users' in localStorage)){
        localStorage.users = JSON.stringify(people);
    }

    if(!('friends' in localStorage)){
        localStorage.friends = JSON.stringify([]);
    } 
    
    let friends = JSON.parse(localStorage.friends);
    

    let users = JSON.parse(localStorage.users);


    $('#add_friend').click(function() {
        let new_u_email = $('#new_friend').val();
        if(new_u_email == ''){
            alert('no email was entered');
        } else {
            
            let added = false;
            for(let i = 0; i<users.length; i++){
                console.log(users[i]);
                if(new_u_email == users[i].email){
                    added = true;
                    friends.push(users[i]);
                    localStorage.friends = JSON.stringify(friends);
                    location.reload();
                }
            }

            if(!added){
                alert('User Not Found!');
            }
            
        }
    });

    
    if (friends.length == 0){
        $('#friends').html('You have no friends :(');
    } else {
        html='';
        for(let i = 0; i<friends.length; i++){
            html+="<div class='friend'>"+
                "<div class='info'>"+
                    "<h1>" + friends[i].name + "</h1>"+
                    "<h2>" + friends[i].email + "</h2>"+
                "</div>"+
                "<button class='remove_button'>Remove</button>"+
            "</div>"
        }
        $('#friends').html(html);

        $('.remove_button').each(function(index) {
            $(this).click(function() {
                friends.splice(index, 1);
                localStorage.friends = JSON.stringify(friends);
                location.reload();
            })
        });
    }
}