const Ressource = require('../models/ressource');

module.exports = {
	getAll: () => {
		return Ressource.find({});
	},
	getById: (id)  => {
		return Ressource.findOne({_id: id})
	},
	getByAuteur: (auteur)  => {
		return Ressource.find({auteur})
	},
	postOne: (data) => {
		const ressource = new Ressource(data);
		return ressource.save();
	},
	updateOne: (item) => {
		return item.save()
	},
	deleteOne: (id) => {
		return Ressource.deleteOne({_id: id})
	}
	
} 

