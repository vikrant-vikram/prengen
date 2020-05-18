
const express=require("express");
const body= require("body-parser");
const mongoose=require("mongoose");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const  cors = require("cors");
const fs = require('fs');
const port=5555;
// =================================================================modules========================================
const Path= require("./models/path");
const Predict=require("./models/prediction");


// ====================================================================================================================

app=express();
app.use(cookieParser());

var corsOptions = 
{
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// todo.use(session({secret: "Shh, its a secret!"}));
app.use(require("express-session")(
{
    secret:"i don't have any",
    resave:false,
    saveUninitialized:false
}));

app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});


app.use(body.urlencoded({extended:true}));


//mongoose.connect("mongoosedb://localhost/defarm");
// DBSERVER="mongodb+srv://abhishek:abhishek@786@cluster0-18gre.mongodb.net/test?retryWrites=true&w=majority"
// DBSERVER='mongodb+srv://admin:abhishek@786@cluster0-b3zab.mongodb.net/test?retryWrites=true&w=majority';
DBSERVER="mongodb+srv://abhishek:abhishek@cluster0-b3zab.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(DBSERVER, {useNewUrlParser: true,useUnifiedTopology: true});

app.set("view engine","ejs");
app.use(express.static("public"));

// =====================================ROUTS===========================================================================


app.get("/",ip,function(req,res){
    res.send("homepage");
});



app.post("/register",ip,function(req,res){
    res.render("register");
});



app.post("/contact",ip,function(req,res){
    res.render("contact")
});



app.post("/project",ip,function(req,res){
    res.render("project");
});

app.post('/about',ip,function(req,res){
    console.log("in the /about page");
    res.render("about");

});

// ==========================================================special routs==========================================================================================
app.post("/nextpage/:next/:method",function(req,res){
    console.log("current page "+req.params.next);
    var path= "/"+req.params.next+":"+req.params.method;
    console.log(path);
    var test=false;

    filter={userIp:req.header('x-forwarded-for') || req.connection.remoteAddress};
    Predict.findOne(filter,function(err,result){
        if(err){
            
            res.json({path:"false"});

        }
        else if(result){
            var predictedPath =result.path;
            if(predictedPath!=null){
                var splittedPath=predictedPath.split("->");
                var current=splittedPath.indexOf(path);
                if((current!=-1) && (current!=(splittedPath.length-2))){
                    // res.send(splittedPath[current+1]);
                    // var t=splittedPath[current+1].split(":");
                    // console.log(t[0])
                    // res.redirect(t[0]);
                    res.send(splittedPath[current+1]);
                }
                else{
                    test=true;
                }
             }
             else{
                test=true;
             }

        }
        if(!result || test){
            Predict.findOne({userIp:"defalt"},function(err,result){
                if(err){
                    console.log(err)
                    res.send("fail");
                }
                else{
                    try{
                        var splittedPath=result.path.split("->");
                        var current=splittedPath.indexOf(path);
                        if((current!=-1) && (current!=(splittedPath.length-1))){
                            // res.send(splittedPath[current+1]);
                            // var t=splittedPath[current+1].split(":");
                            // console.log(t[0])
                            // res.redirect(t[0]);

                            res.send(splittedPath[current+1]);
                        }
                        else{
                        
                            res.send("false");
                        }
                     }
                    catch(err){
                        console.log(err);
                        res.send("false");
                    }
                }
            })
        }
    })

})

// ==================================================================================================
app.get("/sheed",function(req,res){
    var add={userIp:"defalt",path:"/:G->/project:G->/register:G->/about:G->contact:G->/:G"}
    Predict.create(add,function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send(result)
        }

        
    })
})

// ============================================================================================

app.get("*",function(req,res){

    res.render("error");
});

app.post("*",function(req,res){
    // res.send("Error:404-page not found in the server")
    res.render("error");
});

// =============================================================================================

app.listen(process.env.PORT || port,function()
{
    console.log("server has been started on PORT no "+ port);
});



















//path is  a middleware to trace the users request path

function ip(req,res,next)
{
    console.log(req.header('x-forwarded-for') || req.connection.remoteAddress);
    console.log(req.originalUrl);
    console.log(req.sessionID);
    console.log(req.method);
    var userIp=req.header('x-forwarded-for') || req.connection.remoteAddress;
    var url=req.originalUrl;
    var method= req.method;

    var path= url+":"+method[0];
    var filter={userIp:userIp};

    Path.findOne(filter,function(err,result){
        if(err){
            console.log(err)
            res.send("error")
        }
        else if(result){        
            var temp=result.path;
            temp=temp+"->"+path;
            var update={path:temp};
            Path.findOneAndDelete(filter,function(err,deleted){

                if(deleted){
                    var pathToInsert={userIp:userIp,path:temp};
                     Path.create(pathToInsert,function(err,result){
                        if(err){
                            console.log(err);
                            res.send("errror generated");
                        }
                        else{
                            console.log(" Ip address updated to the databasse with respective path"+result);
                            next();
                        }
                    })
                }
            })
        }
        else{
            var pathToInsert={userIp:userIp,path:path}
            Path.create(pathToInsert,function(err,result){
                if(err){
                    console.log("eroro")
                    res.send("Error occured please try after some time.")
                }
                else{
                    console.log("new Ip address inserted to the databasse with respective path"+result);
                    next();
                }
            })

        }
    })
    // console.log("last")
}


