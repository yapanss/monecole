const mongoose = require('mongoose');

const ressourceSchema = new mongoose.Schema({
    auteur: String,
    titre: String,
    niveau: String,
    type: String,
    liens: {
        video: String,
        pdf: String,
        ppt: String,
        doc: String
    },
    datePublicaton: Date,
    derniereModif: Date
});

module.exports = mongoose.model('Ressource', ressourceSchema);
