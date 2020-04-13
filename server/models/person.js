"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ssn_1 = require("./ssn");
class Person {
    constructor(nom, prenom, ssn) {
        this.nom = nom;
        this.prenom = prenom;
        this.ssn = new ssn_1.SSN(ssn);
    }
    getSSN() {
        return this.ssn;
    }
    static demoPerson() {
        return new Person('nonTEST', 'prenomTEST', 289101305500115);
    }
    toString() {
        return " nom: " + this.nom + " prenom: " + this.prenom + " " + this.ssn.toString();
    }
}
exports.Person = Person;
