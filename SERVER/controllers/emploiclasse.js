const EmploiClasse = require('../models/emploiclasse');

module.exports = {
	// getAll: () => {
	// 	return Classe.find({});
	// },
	getById: (classe) => {
		return EmploiClasse.findOne({classe})
	},
	getSome: (classes) => {
		return EmploiClasse.find({classe: {$in: classes}})
	},
	postOne: (data) => {
		const emploiClasse = new EmploiClasse(data);
		return emploiClasse.save();
	},
	updateOne(item) {
		return item.save();
	},
	deleteOne: (classe) => {
		return EmploiClasse.deleteOne(
			{classe}
		)
	},
} 

