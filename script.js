var URL = "http://launchspaceacademy.azurewebsites.net/api/getUsers";
var LoginEndpoint = "http://launchspaceacademy.azurewebsites.net/api/login";

function showAlert() {
    var name = document.getElementById("name").value;
    for (var i = 0; i < name.length; i++) {
        console.log(name[i]);

    }
    var alpha = {a:1, b:2, c:3};
    console.log(alpha[name[0]]);
    document.getElementById("result").innerHTML = "Result " + name.length;

    var form = document.getElementById("form").value;
    console.log(form.ent);
}

function postRecord() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    // var entertainment = document.getElementById("ent").checked;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("result").innerHTML = this.responseText;
        }
    };
    // console.log("POST", URL + "?username=" + name + "&email=" + email + "&ent=" + entertainment, true)
    var checkboxes = document.getElementsByClassName("subscriptions");
    var booleanStr = "";
    for (var i = 0, j = checkboxes.length; i < j; i++){    
      booleanStr += "&" + checkboxes[i].name + "=" + checkboxes[i].checked;
    }

    xhttp.open("POST", URL + "?name=" + name + "&email=" + email + booleanStr, true);
    xhttp.send();
}
  
function getRecord() {
    var xhttp = new XMLHttpRequest();

    var checkboxes = document.getElementsByClassName("subscriptions");
    var booleanStr = "?";
    for (var i = 0, j = checkboxes.length; i < j; i++){    
      booleanStr += checkboxes[i].name + "=" + checkboxes[i].checked + "&";
    }    
    booleanStr = booleanStr.slice(0, -1);
    console.log(booleanStr);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            document.getElementById("result").innerHTML = "";    
            for (var i = 0; i < response.length; i++) {
              document.getElementById("result").innerHTML += response[i].name + "<br>" + response[i].email;

            }
            console.log(response);
        }
    };
    xhttp.open("GET", URL + booleanStr, true);
    xhttp.send();
}

function login() {
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Login Successful!");
        }
        else if (this.readyState == 4 && this.status == 401) {
            alert("Wrong username or password!");
        }

    };
    xhttp.open("GET", LoginEndpoint + "?username=" + name + "&password=" + password, true);
    xhttp.send();    
}

function test (){
  var obj = { entertainment: 'true', shopping: 'true' };
  console.log(obj);
  var list = [];
  Object.keys(obj).forEach(function(key) {
      list.push(key + "='" + obj[key] + "'");
  });
  var str = Array.prototype.join.call(list, " AND ");
  console.log(str);
}

// entertainment='false' AND shopping='true'