const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const personnelSchema = new mongoose.Schema({
	// Infos personnelles
	nomUtilisateur: {
		type: String,
		unique: true
	},
	matricule: {
		type: String,
		unique: true
	},
	motDePasse: {
		type: String,
		required: true
	},
	nom: {
		type: String,
	},
	prenoms: {
		type: String,
	},
	dateNaissance: Date,
	lieuNaissance: String,
  	genre: String,
	domicile: String,
	contact: String,
	email: {
		type: String,
		unique: true
	},
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

personnelSchema.pre('save', async function(next){
	try{
		let personnel = this;
		if(!personnel.isModified('motDePasse')){
			return next();
		}
		personnel.motDePasse = await bcrypt.hash(personnel.motDePasse, 10);
		next();
	}catch(err){
		console.log(err);
	}
})

personnelSchema.methods.compareMotDePasse = function(motDePasse) {
	const personnel = this;
	return bcrypt.compareSync(motDePasse, personnel.motDePasse);
}

module.exports = mongoose.model('Personnel', personnelSchema);
