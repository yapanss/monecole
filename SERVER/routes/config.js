const configController = require('../controllers/config');

module.exports = {
	getRoutes : (app) =>{
		app.route('/api/config')
		.get(async (req, res) =>{
			try{
				const config = await configController.getAll();
				res.send(config);
			}catch(err){
				console.log(err);
			}
		})

		app.route("/api/config/:id")
		.get(async (req, res) =>{
			try{
				const config = await configController.getById(req.params.id)
				res.send(config)
			}catch(err){
				console.log(err)
			}
		})
	},
	postPutDeleteRoutes: (app) =>{
		app.route('/api/config')
		.post(async (req, res) =>{
			try{
				const body = {
					
				}
				const config = await configController.postOne(body);
				res.send(config);
			}catch(err){
				console.log(err);
			}
		})

		app.route("/api/config/:id")
		.put(async (req, res) =>{
			try{
				const config = await configController.getById(req.params.id);
				if(req.body.nomEcole){
					config.nomEcole = req.body.nomEcole
				}
				if(req.body.dateFin){
					config.dateFin = req.body.dateFin
				}
				if(req.body.anneeScolaire){
					config.anneeScolaire = req.body.anneeScolaire
				}
				if(req.body.typePeriodes){
					config.typePeriodes = req.body.typePeriodes
				}
				if(req.body.titreChef){
					config.titreChef = req.body.titreChef
				}
				if(req.body.nomChef){
					config.nomChef = req.body.nomChef
				}
				if(req.body.periodes){
					config.periodes = req.body.periodes
				}
				if(req.body.periodesEvaluation){
					config.periodesEvaluation = req.body.periodesEvaluation
					console.log(req.body.periodesEvaluation)
				}
				if(req.body.salles){
					config.salles = req.body.salles
				}
				if(req.body.niveaux){
					config.niveaux = req.body.niveaux
				}
				if(req.body.codesPersonnel){
					config.codesPersonnel = req.body.codesPersonnel
				}
				const newConfig = await configController.updateOne(config)
				res.send(newConfig);
			} catch(err){
				console.log(err);
			}
		})
	}
}
