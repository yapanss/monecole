const Personnel = require('../models/personnel');

module.exports = {
	getAll: () => {
		return Personnel.find({});
	},
	getById: (id)  => {
		return Personnel.findOne({matricule: id})
	},
	getByChamp: (champ, value)  => {
		return Personnel.find({[champ]: {$in: value}})
	},
	postOne: (data) => {
		const personnel = new Personnel(data);
		return personnel.save();
	},
	updateOne: (item) => {
		return item.save()
	},
	deleteOne: (matricule) => {
		return Personnel.deleteOne({matricule})
	}
	
} 

