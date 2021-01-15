const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const eleveSchema = new mongoose.Schema({
	// credentials
	motDePasse: {
		type: String,
	},
	// Infos personnelles
	matricule: {
		type: String,
		unique: true
	},
	nom: String,
	prenoms: String,
	dateNaissance: Date,
	lieuNaissance: String,
  	genre: String,
	domicile: String,
	contact: String,
	// Infos parents
	pere: {
		nomEtPrenoms: String,
		contact: String,
		profession: String
	},
	mere: {
		nomEtPrenoms: String,
		contact: String,
		profession: String
	},
	tuteur: {
		nomEtPrenoms: String,
		contact: String,
		profession: String
	},
	// Cursus scolaire
	dateEntreeEtablissement: Date,
	etablissementOrigine: String,
	cursus: [{
		annee: String,
		niveau: String,
		classe: String,
		redoublant: String,
		resultats: {},
		decisionFinAnnee: String
	}],
	diplomes: [String],
	radiation: {
		estRadie: false,
		dateDeSortie: Date,
		motif: String
	},
	photoUrl: String
  	
});

eleveSchema.pre('save', async function(next){
	try{
		let eleve = this;
		if(!eleve.isModified('motDePasse')){
			return next();
		}
		eleve.motDePasse = await bcrypt.hash(eleve.motDePasse, 10);
		next();
	}catch(err){
		console.log(err);
	}
})

eleveSchema.methods.compareMotDePasse = function(motDePasse) {
	const eleve = this;
	return bcrypt.compareSync(motDePasse, eleve.motDePasse);
} 

module.exports = mongoose.model('Eleve', eleveSchema);
