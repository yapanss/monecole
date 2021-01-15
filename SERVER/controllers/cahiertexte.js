const Cahiertexte = require('../models/cahiertexte');
const MATIERES = [
    "Anglais", "Allemand", "Arts Plastiques", "Conduite", "Couture", 
    "Edhc", "Espagnol", "EPS", "Français", "Histoire-Géographie", 
    "Mathématiques", "Musique", "Philosophie", "Physique-Chimie", "SVT", "TICE"
]

module.exports = {
	getOne: (paramType, param) => {
		return Cahiertexte.findOne({[paramType]: param})
    },
	postOne: (data) => {
		const cahiertexte = new Cahiertexte(data);
		MATIERES.forEach(matiere => {
			cahiertexte.partage[matiere] = [] 
		})
		return cahiertexte.save();
	},
	updateOne(id, matiere, donnee) {

		const query = `partage.${matiere}`;

		return Cahiertexte.updateOne(
			{_id: id},
			{$push: {[query] : donnee}},
		)
		//return item.save();
	},
	deleteOne: (_id) => {
		return Cahiertexte.deleteOne(
			{_id}
		)
	},
}