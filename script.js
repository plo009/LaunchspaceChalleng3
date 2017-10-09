var URL = "http://launchspaceacademy.azurewebsites.net/api/getUsers";

function showAlert() {
    var name = document.getElementById("name").value;
    for (var i = 0; i < name.length; i++) {
        console.log(name[i]);

    }
    var alpha = {a:1, b:2, c:3};
    console.log(alpha[name[0]]);
    document.getElementById("result").innerHTML = "Result " + name.length;
}

function postRecord() {
    var name = document.getElementById("name").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("result").innerHTML = this.responseText;
        }
    };
    xhttp.open("POST", URL + "?username=" + name, true);
    xhttp.send();
}
  
function getRecord() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            for (var i = 0; i < response.length; i++) {
              document.getElementById("result").innerHTML += response[i].name + "<br> ";
            }
        }
    };
    xhttp.open("GET", URL, true);
    xhttp.send();
}