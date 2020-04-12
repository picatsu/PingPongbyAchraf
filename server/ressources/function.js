const express = require("express"),
  ENV = require("../config/variables"),
  fs = require("fs"),
  request = require("request"),
  fetch = require("node-fetch");

///////// FIREBASE

const firebase = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://pong-7a384.firebaseio.com",
});

var db = firebase.database();

///////////////   POST
module.exports.saveUser = function (req, res) {
  console.log("recu : ", req.body);
  var ref = db.ref("users");
  ref.once("value", function (snapshot) {
    console.log("valuueeeeee", snapshot.val());
  });

  var usersRef = ref.child("users");
  usersRef.set({
    players: {
      username: req.body.username,
      email: req.body.email,
      first_Name: req.body.firstName,
      last_name: req.body.lastName,
      adress: req.body.adress,
      BestScore: req.body.bestscore,
    },
  });
};
module.exports.createPeople = async function (req, res) {
  await fetch(ENV.URLTD2)
    .then((res) => res.json())
    .then((data) => {
      externalDataCallCommune = { data };
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
