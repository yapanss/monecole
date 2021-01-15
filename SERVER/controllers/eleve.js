const Eleve = require('../models/eleve');

module.exports = {
	getAll: () => {
		return Eleve.find({});
	},
	getById: (id) =>{
		return Eleve.findOne({matricule: id})
	},
	getByChamp: (champ, value, annee) =>{
		switch(champ){
			case 'classe':
				return Eleve.find({
					"cursus.annee": annee,
					"cursus.classe": value
				})
			case  'niveau':
				return Eleve.find({
					"cursus.annee": annee,
					"cursus.niveau": value,
					"cursus.classe": null
				}) 
		}
		
	},
	postOne: (data) => {
		const eleve = new Eleve(data);
		return eleve.save();
	},
	updateOne: (item) => {
		return item.save()
	},
	updateMany: (query, anneeScolaire) => {
		if(Array.isArray(query)){
			return Eleve.find(
				{matricule: {$in: query}},
			)
		}else {
			return Eleve.find({
					"cursus.annee": anneeScolaire,
					"cursus.classe": query
				})
		}
	},
	deleteOne: (matricule) => {
		return Eleve.deleteOne({matricule})
	}
} 

