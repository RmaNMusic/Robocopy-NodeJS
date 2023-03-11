const express = require("express");
const expressApp = express();
const bodyParser= require("body-parser");
const { dirname } = require("path");
const fileSystem = require('fs');
const { Console } = require("console");
const PowerShell = require("powershell");



expressApp.use(bodyParser.urlencoded({ extended: false }))
expressApp.use(express.static(__dirname));



expressApp.get("/",function(req,res){
    //console.log(req)
    res.sendFile(__dirname+"/index.html")
})


expressApp.post("/robocopy", function (req,res) {

    const sourcePath = req.body.SourcePath;
    const destinPath = req.body.TargetPath;

    //console.log(req.body.UnrealProject);
    
    console.log(req.body);

 

    // Start the process
    let ExecuatedRobocopyCommand = "robocopy " + '"' + sourcePath + '"' + " " + '"' + destinPath + '"' + " /e /z /mir /xf *.lnk" 

    if (req.body.UnrealProject === "on") {
        ExecuatedRobocopyCommand = ExecuatedRobocopyCommand + " /xd DerivedDataCache Intermediate Platforms Saved Import"
    } else {
        
    }


    let ps = new PowerShell(ExecuatedRobocopyCommand);

    // Handle process errors (e.g. powershell not found)
    ps.on("error", err => {
        console.error(err);
    });
    
    // Stdout
    ps.on("output", data => {
        console.log(data);
    });
    
    // Stderr
    ps.on("error-output", data => {
        console.error(data);
    });
    
    // End
    ps.on("end", code => {
        // Do Something on end
    }); 

    res.send("Execuated Command: " + ExecuatedRobocopyCommand);
})






expressApp.listen(3000,function () {
    console.log("server started on port 3000")
})