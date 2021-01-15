const Evaluation = require('../models/evaluation');

module.exports = {
	getAll: (eleve) => {
		return Evaluation.find({eleve});
	},
	getByChamp: (eleve, champ) => {
		return Evaluation.find({
			eleve,
			[champ]: champ
		});
	},
	getOne: (eleve, periode, matiere) =>{
		return Evaluation.find({
			eleve,
			periode,
			matiere
		})
	},
	postOne: (data) =>{
		const evaluation = new Evaluation(data);
		return evaluation.save()
	},
	updateOne: (item) => {
		return item.save()
	},
	deleteOne: (eleve, periode, matiere) => {
		return Evaluation.deleteOne({
			eleve,
			periode,
			matiere
		})
	}
} 

