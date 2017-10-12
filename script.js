console.log("hello world!")
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
            //document.getElementById("result").innerHTML = this.responseText;
            window.location.href = "page1.html";
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
    //console.log(booleanStr);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            document.getElementById("result").innerHTML = "";    
            for (var i = 0; i < response.length; i++) {
              document.getElementById("result").innerHTML += response[i].name + "<br>" + response[i].email + "<br>";

            }
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
            window.location.href = "page3.html";
        }
        else if (this.readyState == 4 && this.status == 401) {
            alert("Wrong username or password!");
        }

    };
    xhttp.open("GET", LoginEndpoint + "?username=" + name + "&password=" + password, true);
    xhttp.send();    
}

function toggleCheckBox() {
    var checkboxes = document.getElementsByClassName("subscriptions");
    console.log(source.checked);

  for(var i = 0, j = checkboxes.length; i < j; i++) {
    console.log(checkboxes[i]);
    console.log(checkboxes[i].checked);
    checkboxes[i].checked = source.checked;
    }
}

function test (){
    var xhttp = new XMLHttpRequest();   

    var checkboxes = document.getElementsByClassName("subscriptions");
    var booleanStr = "?";
    var heading = ["name", "email"];
    for (var i = 0, j = checkboxes.length; i < j; i++){    
      booleanStr += checkboxes[i].name + "=" + checkboxes[i].checked + "&";
      if (checkboxes[i].checked == true) {
        heading.push(checkboxes[i].name);
      }
      
    }    
    booleanStr = booleanStr.slice(0, -1);

    xhttp.onreadystatechange = function() {

        console.log(response);
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);

            var myTableDiv = document.getElementById("table");
            myTableDiv.innerHTML = "";
            var table = document.createElement('TABLE');
            var tableBody = document.createElement('TBODY');
            table.border = '1';
            table.appendChild(tableBody);  
            //var heading = ["name", "email", "entertainment", "shopping", "business", "sport", "technology", "performingArts", 
            //"outdoors", "theatre", "exercise", "sketching", "nightLife", "socialDancing", "girlsNightOut", "boysNightOut"]; 

            //TABLE COLUMNS
            var tr = document.createElement('TR');
            tableBody.appendChild(tr);
            for (i = 0; i < heading.length; i++) {
                var th = document.createElement('TH')
                th.width = '75';
                th.appendChild(document.createTextNode(heading[i]));
                tr.appendChild(th);
            }
            //TABLE ROWS
            for (i = 0; i < response.length; i++) {
                var tr = document.createElement('TR');
                for (j = 0; j < heading.length; j++) {
                    var td = document.createElement('TD')
                    td.appendChild(document.createTextNode(response[i][heading[j]]));
                    if (response[i][heading[j]] == false) {
                        td.setAttribute("class", "false"); 
                    }
                    tr.appendChild(td)
                }
                tableBody.appendChild(tr);
            }
            myTableDiv.appendChild(table);
        }
    };
    xhttp.open("GET", URL + booleanStr, true);
    xhttp.send();
}

// entertainment='false' AND shopping='true'

function pieChart (){
    // Load google charts
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    // Draw the chart and set the chart values
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work', 8],
      ['Friends', 2],
      ['Eat', 2],
      ['TV', 3],
      ['Gym', 2],
      ['Sleep', 7]
    ]);

      // Optional; add a title and set the width and height of the chart
      var options = {'title':'My Average Day', 'width':400, 'height':300};

      // Display the chart inside the <div> element with id="piechart"
      var chart = new google.visualization.PieChart(document.getElementById('piechart'));
      chart.draw(data, options);
    }
}