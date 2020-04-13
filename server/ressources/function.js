
const express = require('express'),
mongoose = require('mongoose'),
PeopleSchema = require('../models/People'),
ENV = require('../config/variables'),
fs = require('fs'),
preparePays = new Map(
        Object.entries(JSON.parse( fs.readFileSync('./utils/pays.json')
            )));
request = require('request'),
fetch   = require('node-fetch')

;


///////////////   POST

module.exports.createPeople = async function ( req, res){
    let exist = false;
    PeopleSchema.find({ssn : req.body.ssn}, function (err, docs) {
        if(docs != null ) {
             if (docs.length) {
            exist = true;


        }
        }
       
    });

    console.log(' j ai recu ', req.body);
    let ssnRequest =  new SSN(new String(req.body.ssn));
    let commune = ssnRequest.getInfo().birthPlace.commune;
    let departement = ssnRequest.getInfo().birthPlace.dept;
    let pays ="FRANCE";
    let externalDataCallCommune ='';
    let externalDataCallDepartement ='';

    if( departement == "Etranger"){
        pays = preparePays.get(myssn.getInfo().birthPlace.pays);
    }

    else{
        await fetch(ENV.URLTD2+'/communes/'+departement+commune+
            '?fields=nom&format=json&geometry=centre')
            .then(res => res.json())
            .then(data => {
                externalDataCallCommune = ({ data });
            })
            .catch(err => {
                res.status(500).send(err);
            });

        await fetch(ENV.URLTD2+'/departements/'+departement+
            '?fields=nom&format=json&geometry=centre')
            .then(res => res.json())
            .then(data => {
                externalDataCallDepartement = ({ data });
            })
            .catch(err => {
                res.status(500).send(err);
            });

    };

    commune = externalDataCallCommune.data.nom;
    departement = externalDataCallDepartement.data.nom;
    shouldAdd = req.body.shouldAdd;
    if(shouldAdd == null){
        shouldAdd = true;
    }
    console.log('should add ? ', shouldAdd);
    let newData = new PeopleSchema({
        _id: new mongoose.Types.ObjectId(),
        lastname: req.body.lastname,
        birthname: req.body.birthname,
        ssn: new String(req.body.ssn),
        commune: commune,
        departement : departement,
        pays:pays,
        naissance: ssnRequest.getInfo().birthDate
    }

);

    if(ssnRequest.controlSsnValue() && !exist && shouldAdd){
        newData
            .save()
            .then((result)=>{
                 res.status(200).json({
                    message: "ADDED SUCCESSFULLY ",
                    DataAdded: newData
                 })
                },(err)=>{
                res.status(400).json(err)
            }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
    }
    else{
        if(!shouldAdd){
            res.status(200).json(newData);
        }
        if(exist){
            res.status(404).json(" SSN Already in DATABASE ")
        }
        else{
            res.status(404).json(" PLEASE GIVE A VALID SSN NUMBER  ")
        }
    }


};


///////////////   PUT

module.exports.updatePeople = async function (req, res) {

    let newData = new PeopleSchema({
        lastname: req.body.lastname,
        birthname: req.body.birthname,
        ssn: new Number(req.body.ssn)
    });
    PeopleSchema.findOneAndUpdate({ssn: new Number(req.body.ssn)},
        newData)
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'People updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

///////////////   DELETE

module.exports.deletePeopleByID  = async function(req, res){

    PeopleSchema.deleteOne({_id: req.params._id})
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'People deleted',
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });;
};


///////////////   DELETE

module.exports.deletePeopleBySSN  = async function(req, res){
    PeopleSchema.deleteOne({ssn: req.params.ssn})
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'People deleted',
            });
        }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });;
};


///////////////   GET

module.exports.getAllPeople = async function ( req, res) {

    PeopleSchema.find({})
        .then((result)=>{
        res.status(200).json(result)
    },(err)=>{
        res.status(400).json(err)
    }).catch( (err, people) => {
        if (err) {
            res.status(404).json(' Something Went Wrong');
        } else {
            res.status(500).json(' Something Went Wrong');
        }
    });
};


///////////////   GET


module.exports.getByIdPeople = async function (req, res) {
    PeopleSchema.findOne( {_id: req.params._id} , (e,result) => {
        if(e) {
            res.status(500).send(e);
            console.log(e.message);
        } else {
            res.send(result);
        }})
        .exec()
        .catch( (err, people) => {
            if (err) {
                res.status(404).json(' Something Went Wrong');
            } else {
                res.status(500).json(' Something Went Wrong');
            }
        });
};



///////////////   GET

module.exports.getByNamePeople = async function (req, res) {
    PeopleSchema.findOne( {lastname: req.params._lastname} , (e,result) => {
        if(e) {
            res.status(500).send(e);
            console.log(e.message);
        } else {
            res.send(result);
        }})
        .exec()
        .catch( (err, people) => {
            if (err) {
                res.status(404).json(' Something Went Wrong');
            } else {
                req.people = people;
                res.status(404).json(' Something Went Wrong');
            }
        });
};


///////////////   GET

module.exports.getBySSNPeople = async function (req, res) {
    PeopleSchema.findOne( {ssn: req.params._ssn} , (e,result) => {
        if(e) {
            res.status(500).send(e);
            console.log(e.message);
        } else {
            res.send(result);
        }})
        .exec()
        .catch( (err, people) => {
            if (err) {
                res.status(404).json(' Something Went Wrong');
            } else {
                req.people = people;
                res.status(404).json(' Something Went Wrong');
            }
        });
};




class SSN {
    constructor(secu) {
        this.secu_number = secu;
    }
    // ------------------------------------------------------------------------------------------------------------
    // VALIDITY STUFF
    // ------------------------------------------------------------------------------------------------------------
    isValid() {
        // ---- is Valid if enough char and key ok
        return this.controlSsnValue() && this.controlSsnKey();
    }
    /**
     * Private function to check value
     */
    controlSsnValue() {
        let regExpSsn = new RegExp("^" +
            "([1-37-8])" +
            "([0-9]{2})" +
            "(0[0-9]|[2-35-9][0-9]|[14][0-2])" +
            "((0[1-9]|[1-8][0-9]|9[0-69]|2[abAB])(00[1-9]|0[1-9][0-9]|[1-8][0-9]{2}|9[0-8][0-9]|990)|(9[78][0-9])(0[1-9]|[1-8][0-9]|90))" +
            "(00[1-9]|0[1-9][0-9]|[1-9][0-9]{2})" +
            "(0[1-9]|[1-8][0-9]|9[0-7])$");
        return regExpSsn.test(this.secu_number);
    }
    /**
     * Private function to check NIR
     */
    controlSsnKey() {
        // -- Extract classic information
        let myValue = this.secu_number.substr(0, 13);
        let myNir = this.secu_number.substr(13);
        // -- replace special value like corsica
        myValue.replace('2B', "18").replace("2A", "19");
        // -- transform as number
        let myNumber = +myValue;
        return (97 - (myNumber % 97) == +myNir);
    }
    // ------------------------------------------------------------------------------------------------------------
    // INFO STUFF
    // ------------------------------------------------------------------------------------------------------------
    getInfo() {
        return {
            sex: this.extractSex(),
            birthDate: this.extractbirthDate(),
            birthPlace: this.extractBirthPlace(),
            birthPosition: this.extractPosition()
        };
    }
    /**
     *
     */
    extractSex() {
        let sex = this.secu_number.substr(0, 1);
        return sex == "1" || sex == "3" || sex == "8" ? "Homme" : "Femme";
    }
    /**
     *
     */
    extractbirthDate() {
        // -- Build a date
        let month = +this.secu_number.substr(3, 2);
        // -- special case
        if (month == 62 || month == 63) {
            month = 1;
        }
        let birth = new Date(+this.secu_number.substr(1, 2), month);
        return birth;
    }
    /**
     *
     */
    extractBirthPlace() {
        let dept = +this.secu_number.substr(5, 2);
        // --- Case DOM TOM
        if (dept == 97 || dept == 98) {
            return {
                dept: this.secu_number.substr(5, 3),
                commune: this.secu_number.substr(8, 2),
            };
        }
        else if (dept == 99) {
            return {
                dept: "Etranger",
                pays: this.secu_number.substr(7, 3)
            };
        }
        else {
            return {
                dept: this.secu_number.substr(5, 2),
                commune: this.secu_number.substr(7, 3),
            };
        }
    }
    /**
     *
     */
    extractPosition() {
        return +this.secu_number.substr(10, 3);
    }
}
