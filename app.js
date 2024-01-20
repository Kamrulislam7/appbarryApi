const express =require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html")
})

app.post("/",function(req , res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data={
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME:lastName
        }
      }
    ]
  };

  const jsondata = JSON.stringify(data);

  const url = "https://us17.api.mailchimp.com/3.0/lists/4de25f9305";

  const options ={
    method: "POST",
    auth:"kamrul:542e6cc2ae23891d0da305a420a37148-us17"

  }

  
  const request = https.request(url,options, function(response){

    if (response.statusCode === 200) {
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failer.html");
    }
    response.on( "data", function(data){
      console.log(JSON.parse(data))
    })
  })

  request.write(jsondata);
  request.end();

});

app.post("/success" ,function(req,res){
  res.redirect("/")
});
app.post("/failer" ,function(req,res){
  res.redirect("/")
});
app.listen(process.env.PORT || 3000, function(){
  console.log("Open server")
})


