const Config = require('../models/config');

module.exports = {
	getAll: () => {
		return Config.find({});
	},
	getById: (id) => {
		return Config.findOne({_id: id})
	}, 
	postOne: (data) => {
		const config = new Config(data);
		return config.save();
	},
	updateOne: (item) => {
		return item.save()
	}, 
}
