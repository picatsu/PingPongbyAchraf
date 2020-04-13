
'use strict';

const express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../config/swagger'),
    swaggerJsDoc = require("swagger-jsdoc"),
    mongoose = require('mongoose'),
    request = require('request'),
    myRessource = require('../ressources/function'),
    app = express(),
    ENV = require('../config/variables'),
    url = "mongodb://"+ENV.urlMongo+":27017/test",
    database = mongoose.connect(url, {
        promiseLibrary: require('bluebird'),
        useNewUrlParser: true,
        useUnifiedTopology: true

    }),


    swaggerOptions = {
        swaggerDefinition: {
            info: {
                title: "Achraf API",
                description: "Achraf API Information",
                contact: {
                    name: "Amazing Developer NODEJS"
                },
                servers: ["http://"+ENV.urlApiTd2+":"+ENV.PORT]
            }
        },

        apis: ["server.ts"]
    },
    swaggerDocs = swaggerJsDoc(swaggerOptions)
;




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

mongoose.Promise = global.Promise;
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});



//// END CONFIG   &&   START FUNCTIONS   MY ROUTES

app.post("/people/",myRessource.createPeople);
app.get("/people/", myRessource.getAllPeople);
app.put("/people/", myRessource.updatePeople);

app.get("/peoplebyid/:_id", myRessource.getByIdPeople);
app.put("/peoplebyid/:id", myRessource.updatePeople);
app.delete("/peoplebyid/:_id", myRessource.deletePeopleByID);

app.get("/peoplebylastname/:_lastname", myRessource.getByNamePeople);

app.get("/peoplebyssn/:_ssn", myRessource.getBySSNPeople);
app.delete("/peoplebyssn/:ssn", myRessource.deletePeopleBySSN);


///// END ROUTES  && START SERVER


module.exports = app;



