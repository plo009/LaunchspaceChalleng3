var api = {
    get: function (request, response, next) {
        console.log(request.query);
        var username = "admin";
        var password = "password";
        if (request.query.username == username && request.query.password == password) {
            response.status(200).send();
        }
        else {
            response.status(401).send();            
        }
    }
};

module.exports = api;