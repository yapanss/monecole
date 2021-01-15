const mongoose = require('mongoose');

const personnelSchema = new mongoose.Schema({
	// Infos personnelles
	matricule: {
		type: String,
		unique: true
	},
	motDePasse: String,
	nom: String,
	prenoms: String,
	dateNaissance: Date,
	lieuNaissance: String,
  	genre: String,
	domicile: String,
	contact: String,
	situationMatrimoniale: String,
	nombreEnfants: Number,
	// Carriere
	dateEntreeEtablissement: Date,
	diplomes: [String],
	emploi: String,
	fonction: {
		titre: String,
		specialite: String
	},
	code: String,
	radiation: {
		estRadie: false,
		dateDeSortie: Date,
		motif: String
	},
	photoUrl: String
});

module.exports = mongoose.model('Personnel', personnelSchema);
