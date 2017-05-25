// Dependencies
var mongoose        = require('mongoose');
var User            = require('./model.js');
// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/users', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = User.find({});
        query.exec(function(err, users){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all users
            res.json(users);
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    app.post('/users', function(req, res){

        // Creates a new User based on the Mongoose schema and the post bo.dy
        var newuser = new User(req.body);

        // New User is saved in the db.
        newuser.save(function(err){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new user
            res.json(req.body);
        });
    });

    // Retrieves JSON records for all users who meet a certain set of query conditions
    app.post('/query/', function(req, res){

        // Grab all of the query parameters from the body.
        var lat             = req.body.latitude;
        var long            = req.body.longitude;
        var distance        = req.body.distance;
        var cricket           = req.body.cricket;
        var tennis          = req.body.tennis;
        var football           = req.body.football;

        // Opens a generic Mongoose Query. Depending on the post body we will...
        var query = User.find({});

        // ...include filter by Max Distance (converting miles to meters)
        if(distance){

            // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
            query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

                // Converting meters to miles. Specifying spherical geometry (for globe)
                maxDistance: distance * 1609.34, spherical: true});

        }

        if(cricket ||tennis ||football){
            query.or([{ 'groundtype': cricket }, { 'groundtype': tennis }, {'groundtype': football}]);
        }
        // Execute Query and Return the Query Results
        query.exec(function(err, users){
            if(err)
                res.send(err);

            // If no errors, respond with a JSON of all users that meet the criteria
            res.json(users);
            console.log(users);
        });
    });
app.post("/deleteapi",function(req,res){
    var phone           = req.body.phone;
    console.log(phone);
   var query = User.remove( {contact:phone});
   query.exec(function(err, users){
            if(err){
                res.send(err);
            }
            // If no errors, respond with a JSON of all users that meet the criteria
            else{res.json("Deleted");
    }
        });
});
app.post("/findapi",function(req,res){
    var phone           = req.body.phone;
    console.log(phone);
   var query = User.find( {contact:phone});
   query.exec(function(err, users){
            if(err){
                res.send(err);
            }
            // If no errors, respond with a JSON of all users that meet the criteria
            else{res.json(users);
    }
        });
});
app.post("/updateapi",function(req,res){
    var groundname = req.body.groundname;
    var groundtype=req.body.groundtype;
    var contact=req.body.contact;
    var location1=req.body.location1;
    var location2=req.body.location2;
    var address=req.body.address;
    groundname=groundname.toString();
    groundtype=groundtype.toString();
    contact=Number(contact);
    location1=Number(location1);
    location2=Number(location2);
    address=address.toString();
   var query = User.update({location:{ $in:[location1,location2]}},{$set:{groundname:groundname,groundtype:groundtype,favlan:address,contact:contact}});
   query.exec(function(err, users){
            if(err){
                res.send(err);
            }
            // If no errors, respond with a JSON of all users that meet the criteria
            else{res.send({message:"The data is updated"});
    }
        });
});
};
