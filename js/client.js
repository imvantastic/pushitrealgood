//onclick() function for userList
$("#userList").on('click', function() {
    
    $("div#page-wrapper").empty();
    $("div#page-wrapper").append(userList);

    //grab all users
    var url = "http://localhost:3000/users"
    $.ajax({
      url: url,
	  type: 'GET',
      dataType: 'json',
	  error: function(XMLHttpRequest, textStatus, errorThrown) {
		alert(textStatus + ': ' + errorThrown);
	 },
      success: function(users) {
         console.log("YAY");
		 users.forEach(function(user){
			 console.log("in for");
		    })
	  }
	})
});


//register user
function register() {
	var serverUrl = "http://localhost:3000/users";
	var formData = JSON.stringify($("#registerForm").serializeArray());
    if ($("#firstname").val() != "") {
        
            console.log("First Name" + $("#firstname").val());
            alert("user submitted");
            /*$.post("http://localhost:3000/users", {firstname: $("#firstname").val(), 
            	lastname: $("#lastname").val(), emailaddress: $("#emailaddress").val(),
            	password: $("#password").val()}, function(data, status) {
                console.log("Data:" + data + "\n Status: " + status);
            });*/

            $.ajax({
  			type: "POST",
  			url: "serverUrl",
  			data: formData,
  			success: function(){},
  			dataType: "json",
  			contentType : "application/json"
			});

        
    } else {
        alert("You need to fill out the form");
    }
}