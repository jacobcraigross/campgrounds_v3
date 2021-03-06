var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

// SCHEMA SETUP - - - - - - - - - - -

var campgroundSchema = new mongoose.Schema({
   name: String, 
   image: String 
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create({
    
        name: "Palo Duro Canyon",
        image: "http://www.palodurocanyon.com/images/hoodoo3.jpg"
    
}, function(err, campground){
    if (err) {
        console.log(err);
    } else {
        console.log("New campground added!!");
        console.log(campground);
    }
});


app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if (err) {
           console.log(err);
       } else {
           res.render("campgrounds", {campgrounds:allCampgrounds});
       }
    });
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    // create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
       if (err) {
           console.log(err);
       } else {
           res.redirect("/campgrounds");
       }
    });
});

app.get("/campgrounds/new", function(req,res){
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("the road to hell is paved with good servers"); 
});