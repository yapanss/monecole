const EmploiProf = require('../models/emploiprof');

module.exports = {
	// getAll: () => {
	// 	return Prof.find({});
	// },
	getById: (Prof)  => {
		return EmploiProf.findOne({Prof})
	},
	postOne: (data) => {
		const emploiProf = new EmploiProf(data);
		return emploiProf.save();
	},
	updateOne: (id, data) => {
		return EmploiProf.updateOne(
			{_id: id},
			{$set: data}
		)
	},
	deleteOne: (Prof) => {
		return EmploiProf.deleteOne(
			{Prof}
		)
	},
} 

