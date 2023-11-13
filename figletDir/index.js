const figlet = require("figlet");

figlet("PocketClinic", function ( err, data){
    if (err) {
        console.log("Something is wrong");
        console.dir(err);
        return;
    } 
    console.log(data);
});