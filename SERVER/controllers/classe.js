const Classe = require('../models/classe');

module.exports = {
	getAll: (anneeScolaire) => {
		return Classe.find({
			anneeScolaire
		});
	},
	getByChamp: (anneeScolaire, champ, value) =>{
		switch(champ){
			case 'prof':
				return Classe.find({
					anneeScolaire,
					"enseignements.codeProf": value
				})
		}
	},
	getByNom: (nom, anneeScolaire) =>{
		return Classe.findOne({
			anneeScolaire,
			nom
		})
	},
	getById: (id) =>{
		return Classe.findOne({
			_id: id
		})
	},
	postOne: (data) => {
		const classe = new Classe(data);
		return classe.save();
	},
	updateOne: (item) => {
		return item.save()
	},
	deleteOne: (id) => {
		return Classe.deleteOne(
			{_id: id}
		)
	},
} 

