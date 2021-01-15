const emploiClasseController = require('../controllers/emploiclasse');

module.exports = (app)  => {
	app.route("/api/emploiclasse")
	.post(async (req, res) => {
		try{
			const body = {
			  classe: req.body.classe,
			  lundi: req.body.lundi,
			  mardi: req.body.mardi,
			  mercredi: req.body.mercredi,
			  jeudi: req.body.jeudi,
			  vendredi: req.body.vendredi,
			}
			const emploiClasse = await emploiClasseController.postOne(body);
			res.send(emploiClasse);
		} catch(err){
			console.log(err);
		}
	})

	app.route("/api/emploiclasse/:id")
	.get(async (req, res) => {
		try{
			const emploiClasse = await emploiClasseController.getById(req.params.id);
			res.send(emploiClasse);
		} catch(err){
			console.log(err);
		}
	})
	.put(async (req, res) => {
		try{
			const emploiclasse = await emploiClasseController.getById(req.params.id);
			if(req.body.classe){
				emploiclasse.classe = req.body.classe
			}
			if(req.body.lundi){
				emploiclasse.lundi = req.body.lundi
			}
			if(req.body.mardi){
				emploiclasse.mardi = req.body.mardi
			}
			if(req.body.mercredi){
				emploiclasse.mercredi = req.body.mercredi
			}
			if(req.body.jeudi){
				emploiclasse.jeudi = req.body.jeudi
			}
			if(req.body.vendredi){
				emploiclasse.vendredi = req.body.vendredi
			}	
			const newEmploiClasse = emploiClasseController.updateOne(emploiclasse)
			res.send(newEmploiClasse);
		} catch(err){
			console.log(err);
		}
	})
	.delete(async (req, res) => {
		try{
			const emploiClasse = await emploiClasseController.deleteOne(req.params.id);
			res.send(emploiClasse);
		} catch(err){
			console.log(err);
		}
	})

	app.route('/api/emploiclasse/:champ/:value')
	.get(async (req, res) =>{
		try{
			let classes = req.params.value.split(",")
			const emploiClasses = await emploiClasseController.getSome(classes)
			res.send(emploiClasses)
		} catch(err){
			console.log(err)
		}
	})
}