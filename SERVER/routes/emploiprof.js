const emploiProfController = require('../controllers/emploiprof');

module.exports = (app)  => {
	app.route("/api/emploiprof")
	.post(async (req, res) => {
		try{
			const body = {
			  codeProf: req.body.codeProf,
			  lundi: req.body.lundi,
			  mardi: req.body.mardi,
			  mercredi: req.body.mercredi,
			  jeudi: req.body.jeudi,
			  vendredi: req.body.vendredi,
			}
			const emploiProf = await emploiProfController.postOne(body);
			res.send(emploiProf);
		} catch(err){
			console.log(err);
		}
	})

	app.route("/api/emploiprof/:id")
	.get(async (req, res) => {
		try{
			const emploiProf = await emploiProfController.getById(req.params.id);
			res.send(emploiProf);
		} catch(err){
			console.log(err);
		}
	})
	.put(async (req, res) => {
		try{
			const emploiProf = await emploiProfController.updateOne(req.params.id, req.body);
			res.send(emploiProf);
		} catch(err){
			console.log(err);
		}
	})
	.delete(async (req, res) => {
		try{
			const emploiProf = await emploiProfController.deleteOne(req.params.id);
			res.send(emploiProf);
		} catch(err){
			console.log(err);
		}
	})
}