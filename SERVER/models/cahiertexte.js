const mongoose = require('mongoose');

const cahiertexteSchema = new mongoose.Schema({
    classe: String,
    partage: {}

});

module.exports = mongoose.model('Cahiertexte', cahiertexteSchema);