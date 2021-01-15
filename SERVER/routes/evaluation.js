const evaluationController = require('../controllers/evaluation');

module.exports = (app)  => {
	app.route("/api/evaluation")
	.post(async (req, res) =>{
		try{
			const evaluation = await evaluationController.postOne(req.body);
			res.send(evaluation)
		}catch(err){
			console.log(err)
		}
	})

	app.route("/api/evaluation/:eleve")
	.get(async (req, res) => {
		try{
			const evaluations = await evaluationController.getAll(req.params.eleve);
			res.send(req.params);
		} catch(err){
			console.log(err);
		}
	})
	
}