const classeController = require('../controllers/classe');
// const configController = require('../controllers/config');

module.exports = (app)  => {
	app.route("/api/classe")
	.post(async (req, res) => {
		try{
			const body = {
				anneeScolaire: req.body.form.anneeScolaire,
				niveau: req.body.form.niveau,
				niveauSuivant: req.body.form.niveauSuivant,
				nom: req.body.form.nom,
				salle: req.body.form.salle,
				effectif: 0,
				lv2: req.body.form.lv2,
				art: req.body.form.art,
				educateur: req.body.form.educateur,
				enseignements: [],
				chefDeClasse: null,
				pp: null
			}
			const classe = await classeController.postOne(body);
			res.send(classe);
		} catch(err){
			console.log(err);
		}
	})

	app.route("/api/classe/:anneeScolaire")
	.get(async (req, res) => {
		try{
			const anneeScolaire = req.params.anneeScolaire
			const classes = await classeController.getAll(anneeScolaire);
			res.send(classes);
		} catch(err){
			console.log(err);
		}
	})
	
	app.route("/api/classe/:nom/:anneeScolaire")
	.get(async (req, res) => {
		try{
			const nom = req.params.nom;
			const anneeScolaire = req.params.anneeScolaire;
			const classe = await classeController.getByNom(nom,anneeScolaire);
			res.send(classe);
		} catch(err){
			console.log(err);
		}
	})

	app.route("/api/classe/:id")
	.put(async (req, res) => {
		try{
			const classe = await classeController.getById(req.params.id);
			if(req.body.anneeScolaire){
				classe.anneeScolaire = req.body.anneeScolaire
			}
			if(req.body.nom){
				classe.nom = req.body.nom
			}
			if(req.body.niveau){
				classe.niveau = req.body.niveau
			}
			if(req.body.niveauSuivant){
				classe.niveauSuivant = req.body.niveauSuivant
			}
			if(req.body.salle){
				classe.salle = req.body.salle
			}
			// if(req.body.effectif){
			// 	classe.effectif = req.body.effectif
			// }
			if(req.body.lv2){
				classe.lv2 = req.body.lv2
			}
			if(req.body.art){
				classe.art = req.body.art
			}
			if(req.body.educateur){
				classe.educateur = req.body.educateur
			}
			if(req.body.chefDeClasse){
				classe.chefDeClasse = req.body.chefDeClasse
			}
			if(req.body.pp){
				classe.pp = req.body.pp
			}
			if(req.body.enseignements){
				classe.enseignements = req.body.enseignements
			}
			const newClasse = classeController.updateOne(classe)
			res.send(newClasse);
		} catch(err){
			console.log(err);
		}
	})
	.delete(async (req, res) => {
		try{
			const classe = await classeController.deleteOne(req.params.id);
			res.send(classe);
		} catch(err){
			console.log(err);
		}
	})

	app.route("/api/classe/:champ/:value/:anneeScolaire")
	.get(async (req, res) =>{
		try{
			const champ = req.params.champ;
			const value = req.params.value;
			const anneeScolaire = req.params.anneeScolaire;
			const classes = await classeController.getByChamp(anneeScolaire, champ, value)
			res.send(classes)
		} catch(err) {
			console.log(err)
		}
	})
}