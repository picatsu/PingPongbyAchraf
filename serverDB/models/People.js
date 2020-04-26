const mongoose = require('mongoose');

const PeopleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    lastname: { type: String, required: true },
    birthname: { type: String, required: true },
    ssn: { type: Number, required: true },
    departement : String,
    commune: String,
    pays: String,
    naissance: String
});

module.exports = mongoose.model('Peoples', PeopleSchema);
