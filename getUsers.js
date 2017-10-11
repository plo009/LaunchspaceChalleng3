var api = {
     get: function (request, response, next) {
        console.log(request.query);
        var list  = [];
        Object.keys(request.query).forEach(function(key) {
            if (request.query[key] == "true") {
                list.push(key + "='" + request.query[key] + "'");    
            }

        });
        console.log(list);
        var str = Array.prototype.join.call(list, " AND ");
        console.log(str);
        console.log("SELECT * FROM Users WHERE " + str);         
        
        
        var query = {
            sql: "SELECT * FROM Users WHERE " + str
        };
        
        request.azureMobile.data.execute(query)
            .then(function (results) {
                response.json(results);
            })
            .catch(next);
    },
    post: function (request, response, next) {
        console.log(request.query);
        
        var columnNames = Object.keys(request.query);
        //console.log(columnNames);
        
        var names = Array.prototype.join.call(columnNames, ", ");
        //console.log(names);
        
        var recordValues = Object.keys(request.query).map((k) => request.query[k]);
        //console.log(recordValues);
        
        var values = Array.prototype.join.call(recordValues, "', '");
        //console.log(values);

        var query = {
            sql: "INSERT INTO Users (" + names + ") VALUES ('" + values +"')"
        };
        console.log(query["sql"]);
        request.azureMobile.data.execute(query)
            .then(function (results) {
                response.json(results);
            })
            .catch(next);
    }
};

module.exports = api;