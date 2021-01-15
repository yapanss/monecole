const eleveController = require('../controllers/eleve');
const { check, validationResult } = require('express-validator');
const multer = require('../middlewares/multer');
const fs = require('fs');

module.exports = (app) => {
	app.route('/api/eleve')
	.get(async (req, res) => {
		try{
			const eleves = await eleveController.getAll();
			res.send(eleves);
		} catch(err){
			console.log(err);
		}
	})
	.post([
		check('matricule').isAlpha().isLength({min: 3}),
		check('nom').isAlpha().isLength({min: 2}),
		check('prenoms').isAlpha().isLength({min: 2}),
		check('dateNaissance').isDate(),
		check('lieuNaissance').isAlpha(),
		check('genre').isAlpha().isLength(1),
		check('domicile').isAlpha(),
		check('contact').isAlpha(),
		//check('pere').,
		check('dateEntreeEtablissement').isDate(),
		//check('dateNaissance').isDate(),
	  ], async (req, res) => {
		try{
			const body = {
				  matricule: req.body.matricule,
				  nom: req.body.nom,
				  prenoms: req.body.prenoms,
				  dateNaissance: req.body.dateNaissance,
				  lieuNaissance: req.body.lieuNaissance,
				  genre: req.body.genre,
				  domicile: req.body.domicile,
				  contact: req.body.contact,
				  // Infos parents
				  pere: req.body.pere,
				  mere: req.body.mere,
				  tuteur: req.body.tuteur,
				  // Cursus scolaire
				  dateEntreeEtablissement: req.body.dateEntreeEtablissement,
				  etablissementOrigine: req.body.etablissementOrigine,
				  cursus: [
				  	{
				  		annee: req.body.anneeScolaire,
				  		niveau: req.body.niveau,
				  		classe: null,
				  		redoublant: req.body.redoublant,
				  		resultats: null
				  	}
				  ],
				  diplomes: [null],
				  radiation: {
				    estRadie: false,
				    dateDeSortie: null,
				    motif: null
				  },
				  photoUrl: null
				}
			//body.motDePasse = await bcrypt.hash(req.body.motDePasse, 10)
			const eleve = await eleveController.postOne(body);
			res.send(eleve);
		} catch(err){
			console.log(err);
		}
	})
	.put(async (req, res) =>{
		try{
			const anneeScolaire = req.body.anneeScolaire;
			const classe = req.body.classe;
			if(req.body.updateQuery == 'resultats'){
				const eleves = await eleveController.getByChamp('classe', classe, anneeScolaire);
				eleves.forEach(async (eleve) =>{
					let eleveCorrespondant = req.body.eleves.filter(item =>{
						return item._id == eleve._id
					})
					eleve.cursus = eleveCorrespondant[0].cursus
					const newEleve = await eleveController.updateOne(eleve)
				})
				res.send(eleves)
			} else if(req.body.updateQuery == 'classe'){
				const matriculeEleves = req.body.matriculeEleves;
				const eleves = await eleveController.updateMany(matriculeEleves, anneeScolaire)
				eleves.forEach(async eleve =>{
					eleve.cursus.forEach(item =>{
						if(item.annee == anneeScolaire){
							item.classe = classe
						}
					})
					let newEleve = await eleveController.updateOne(eleve)
				})
				res.send(eleves);
			}else{
				const eleves = await eleveController.updateMany(classe, anneeScolaire);
				eleves.forEach(async eleve =>{
					eleve.cursus.forEach(item =>{
						if(item.annee == anneeScolaire){
							item.classe = null
						}
					})
					let newEleve = await eleveController.updateOne(eleve)
				})
				res.send(eleves)
			}
		}catch(err){
			console.log(err);
		}
	})

	app.route('/api/eleve/:id')
	.get(async (req, res) =>{
		try{
			const eleve = await eleveController.getById(req.params.id);
			res.send(eleve);
		} catch(err){
			console.log(err);
		}
	})
	.put(multer, async (req, res) =>{
		try{
			const anneeScolaire = req.body.anneeScolaire;
			const eleve = await eleveController.getById(req.params.id);
			if(req.body.motDePasse){
				eleve.motDePasse = await bcrypt.hash(req.body.motDePasse, 10)
			}
			if(req.body.nom){
				eleve.nom = req.body.nom
			}
			if(req.body.prenoms){
				eleve.prenoms = req.body.prenoms
			}
			if(req.body.dateNaissance){
				eleve.dateNaissance = req.body.dateNaissance
			}
			if(req.body.lieuNaissance){
				eleve.lieuNaissance = req.body.lieuNaissance
			}
			if(req.body.genre){
				eleve.genre = req.body.genre
			}
			if(req.body.domicile){
				eleve.domicile = req.body.domicile
			}
			if(req.body.contact){
				eleve.contact = req.body.contact
			}
			
			if(req.body.matricule){
				eleve.matricule = req.body.matricule
			}
			if(req.body.dateEntreeEtablissement){
				eleve.dateEntreeEtablissement = req.body.dateEntreeEtablissement
			}
			if(req.body.etablissementOrigine){
				eleve.etablissementOrigine = req.body.etablissementOrigine
			}
			if(req.body.diplomes){
				eleve.diplomes = req.body.diplomes
			}
			if(req.body.redoublant){
				eleve.cursus.forEach(item =>{
					if(item.annee == anneeScolaire){
						item.redoublant = req.body.redoublant
					}
				})
			}
			if(req.body.niveau){
				eleve.cursus.forEach(item =>{
					if(item.annee == anneeScolaire){
						item.niveau = req.body.niveau
					}
				})
			}
			if(req.body.pere){
				eleve.pere = req.body.pere
			}
			if(req.body.mere){
				eleve.mere = req.body.mere
			}
			if(req.body.tuteur){
				eleve.tuteur = req.body.tuteur
			}
			if(req.body.cursus){
				eleve.cursus = req.body.cursus
			}
			if(req.body.diplomes){
				eleve.diplomes = req.body.diplomes
			}
			if(req.body.radiation){
				eleve.radiation = req.body.radiation
			}
			if(req.file){
				const extension = req.file.filename.split('.')[1]
				const newPath = 'photos\\'+req.body.matricule+'.'+extension
				fs.renameSync(req.file.path, newPath);
				eleve.photoUrl = req.body.matricule+'.'+extension;
			}
			const newEleve = await eleveController.updateOne(eleve)
			res.send(newEleve);
		} catch(err){
			console.log(err);
		}
	})
	.delete(async (req, res) =>{
		try{
			const eleve = await eleveController.deleteOne(req.params.id)
			res.send(eleve)
		}catch(err){
			console.log(err)
		}
	})

	app.route("/api/eleve/:champ/:value/:anneeScolaire")
	.get(async (req, res) => {
		try{
			const champ = req.params.champ;
			const value = req.params.value;
			const anneeScolaire = req.params.anneeScolaire;
			const eleves = await eleveController.getByChamp(champ, value, anneeScolaire);
			res.send(eleves);
		} catch(err){
			console.log(err);
		}
	})
}
