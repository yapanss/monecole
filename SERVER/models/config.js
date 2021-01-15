const mongoose = require('mongoose');
const { stringify } = require('querystring');

const configSchema = new mongoose.Schema({
	nomEcole: String,
	anneeScolaire: String,
	dateFin: Date,
	typePeriodes: String,
	titreChef: String,
	nomChef: String,
	periodesEvaluation: {},
	salles: [String],
	periodes: [{
		titre: String,
		coefficient: Number
	}],
	niveaux: [
		{
			niveau: String,
			classes: [String],
			matieres: [
				{matiere: String , coefficient: Number},
			]
		}
	],
	codesPersonnel: [String]
})

module.exports = mongoose.model('Config', configSchema);