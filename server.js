const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;
const data = require("./latLongData.json");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(process.cwd()+"/client/dist/client/"));

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
let getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  let ManagementClient = require('auth0').ManagementClient;
  let auth0 = new ManagementClient({
    domain: 'geoguessr.us.auth0.com',
    clientId: 'gQ268z33kCD3ID97sclZSIdmUhFDp5xm',
    clientSecret: 'z-n1T1_oBA9HByhhq4vu1rTcPdMquSUui9wLdvDvvzD_Ss568g4LYEI41O_WCvI4',
    scope: 'read:users update:users'
  });

app.get('/api/users',(req,res) => {

    auth0.getUsers((err,users) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(users);
            res.json(users);
        }
    });

});

app.get('/api/locations', (req, res) => {
    res.json(data);
});

app.get('/api/location', (req, res) => {
    res.json(data[getRandomInt(0,data.length-1)]);
});

app.get('/', (req,res) => {
    res.sendFile(process.cwd()+"/client/dist/client/index.html")
});

app.listen(port, () => {
    console.log(`Server listening on the port:${port}`);
});