"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SSN {


    constructor(number) {
        this.valid = false;
        this.numero = number;
        this.setupOtherFields();
    }
    getSex() {
        return this.sex;
    }
    getAge() {
        return this.age;
    }
    getNaissance() {
        return this.naissance;
    }
    getNumber() {
        return this.numero;
    }
    toString() {
        return " number: " + this.numero + " valid : " + this.valid + " Infos Naissance => { " + this.naissance.toString() + ' }';
    }
    isValid() {
        return this.valid;
    }
    static checkIsValid(numberSSN) {
        return SSN.regex.test(numberSSN);
    }
    setupOtherFields() {
        let tab = String(this.numero).split('');
        switch (tab[0]) {
            case '1': {
                this.sex = 'Male';
            }
            case '2': {
                this.sex = 'Femelle';
            }
            case '3' || '7': {
                this.sex = 'Male Externe';
            }
            case '4' || '8': {
                this.sex = 'Femelle Externe';
            }
            default: {
                this.sex = 'Unkown sex';
            }
        } // END SWITCH FOR SEX
        if ((tab[5] + tab[6]) === '2A' || (tab[5] + tab[6]) === '2B' || (tab[5] + tab[6]) === '18' || (tab[5] + tab[6]) === '19') {
            this.naissance = new Naissance(tab[1] + tab[2], SSN.mois.get(tab[3] + tab[4]), 'Corse ' + (tab[5] + tab[6]), (tab[7] + tab[8] + tab[9]), (tab[10] + tab[11] + tab[12]));
        }
        if (Number((tab[5] + tab[6])) >= 96 || Number((tab[5] + tab[6])) <= 98) {
            this.naissance = new Naissance(tab[1] + tab[2], SSN.mois.get(tab[3] + tab[4]), 'Hors Metropole ' + (tab[5] + tab[6]), (tab[7] + tab[8] + tab[9]), (tab[10] + tab[11] + tab[12]));
        }
        if (Number((tab[5] + tab[6])) == 99) {
            this.naissance = new Naissance(tab[1] + tab[2], SSN.mois.get(tab[3] + tab[4]), 'Etranger ' + (tab[5] + tab[6]), (tab[7] + tab[8] + tab[9]), (tab[10] + tab[11] + tab[12]));
        }
        else {
            this.naissance = new Naissance(tab[1] + tab[2], SSN.mois.get(tab[3] + tab[4]), 'France Metropolitaine ' + (tab[5] + tab[6]), (tab[7] + tab[8] + tab[9]), (tab[10] + tab[11] + tab[12]));
        }
        this.cle = (tab[13] + tab[14]);
        if (this.checkIsValid(String(this.numero))) {
            this.valid = true;
        }
        var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/').split('/')[0];
        if (Number(tab[1] + tab[2]) < Number(utc.split[2] + utc.split[3])) {
            this.age = Number(utc) - Number('20' + tab[1] + tab[2]);
        }
        else {
            this.age = Number(utc) - Number('19' + tab[1] + tab[2]);
        }
    }
}
module.exports.SSN = SSN;

SSN.mois = new Map([
    ['01', 'Janvier'],
    ['02', 'Fevrier'],
    ['03', 'Mars'],
    ['04', 'Avril'],
    ['05', 'Mai'],
    ['06', 'Juin'],
    ['07', 'Juillet'],
    ['08', 'Aout'],
    ['09', 'Septembre'],
    ['10', 'Octobre'],
    ['11', 'Novembre'],
    ['12', 'Decembre']
]);
SSN.regex = new RegExp(/^[12][0-9]{2}[0-1][0-9](2[AB]|[0-9]{2})[0-9]{3}[0-9]{3}[0-9]{2}$/);
class Naissance {
    constructor(annee, mois, departement, commune, numeroOrdre) {
        this.annee = annee;
        this.mois = mois;
        this.departement = departement;
        this.commune = commune;
        this.numeroOrdre = numeroOrdre;
    }
    toString() {
        return " Annee : " + this.annee + " Mois : " + this.mois + " Departement : " + this.departement + " Commune : " + this.commune
            + ' Numero Ordre : ' + this.numeroOrdre;
    }
    getAnnee() {
        return this.annee;
    }
    getMois() {
        return this.mois;
    }
    getDepartement() {
        return this.departement;
    }
    getCommune() {
        return this.commune;
    }
    getNumeroOrdre() {
        return this.numeroOrdre;
    }
}
exports.Naissance = Naissance;
