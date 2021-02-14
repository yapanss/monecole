const personnelController = require('../controllers/personnel');
const multer = require('../middlewares/multer');
const fs = require('fs');
// const imageToBase64 = require('image-to-base64');
const bcrypt = require('bcryptjs');

module.exports = (app) => {
	app.route('/api/personnel')
	.get(async (req, res) => {
		try{
			console.log('DECODED : ', req.decoded)
			const personnels = await personnelController.getAll();
			res.status(200).json({
				success: true,
				personnels
			});
		} catch(err){
			console.log(err);
		}
	})
	.post(async (req, res) => {
		try{
			const body = {
				//   Etat Civil
				nom: req.body.nom,
				  prenoms: req.body.prenoms,
				  dateNaissance: req.body.dateNaissance,
				  lieuNaissance: req.body.lieuNaissance,
				  genre: req.body.genre,
				  situationMatrimoniale: req.body.situationMatrimoniale,
				  nombreEnfants: req.body.nombreEnfants,
				//   Adresse
				  domicile: req.body.domicile,
				  contact: req.body.contact,
				  
				  // Carriere
				  matricule: req.body.matricule,
				  dateEntreeEtablissement: req.body.dateEntreeEtablissement,
				  diplomes: [null],
				  radiation: {
				    estRadie: false,
				    dateDeSortie: null,
				    motif: null
				  },
				  emploi: req.body.emploi,
				  fonction: req.body.fonction,
				  code: req.body.code,
				  photo: {
				  	data: null,
				  	contentType: null
				  }
				}
			const personnel = await personnelController.postOne(body);
			res.send(personnel);
		} catch(err){
			console.log(err);
		}
	})
	.put(async (req, res)  =>{
		try{
			const personnels = await personnelController.updateMany(req.body.query, req.body.value);
			res.send(personnels);
		}catch(err){
			console.log(err);
		}
	})

	app.route('/api/personnel/:id')
	.get(async (req, res) => {
		try{
			const personnel = await personnelController.getById(req.params.id);
			res.status(200).json({
				success: true,
				personnel
			});
		} catch(err){
			console.log(err);
		}
	})
	.put(multer, async (req, res) => {
		try{
			const personnel = await personnelController.getById(req.params.id);
			if(req.body.motDePasse){
				personnel.motDePasse = await bcrypt.hash(req.body.motDePasse, 10)
			}
			if(req.body.nom){
				personnel.nom = req.body.nom
			}
			if(req.body.prenoms){
				personnel.prenoms = req.body.prenoms
			}
			if(req.body.dateNaissance){
				personnel.dateNaissance = req.body.dateNaissance
			}
			if(req.body.lieuNaissance){
				personnel.lieuNaissance = req.body.lieuNaissance
			}
			if(req.body.genre){
				personnel.genre = req.body.genre
			}
			if(req.body.domicile){
				personnel.domicile = req.body.domicile
			}
			if(req.body.contact){
				personnel.contact = req.body.contact
			}
			if(req.body.situationMatrimoniale){
				personnel.situationMatrimoniale = req.body.situationMatrimoniale
			}
			if(req.body.nombreEnfants){
				personnel.nombreEnfants = req.body.nombreEnfants
			}
			if(req.body.matricule){
				personnel.matricule = req.body.matricule
			}
			if(req.body.dateEntreeEtablissement){
				personnel.dateEntreeEtablissement = req.body.dateEntreeEtablissement
			}
			if(req.body.diplomes){
				personnel.diplomes = req.body.diplomes
			}
			if(req.body.emploi){
				personnel.emploi = req.body.emploi
			}
			if(req.body.fonction){
				personnel.fonction = req.body.fonction
			}
			if(req.body.code){
				personnel.code = req.body.code
			}
			if(req.body.radiation){
				personnel.radiation = req.body.radiation
			}
			if(req.file){
				const extension = req.file.filename.split('.')[1]
				const newPath = 'photos\\'+req.body.matricule+'.'+extension
				fs.renameSync(req.file.path, newPath);
				personnel.photoUrl = req.body.matricule+'.'+extension;
			}
			const newPersonnel = await personnelController.updateOne(personnel)
			res.send(newPersonnel);
		} catch(err){
			console.log(err);
		}
	})
	.post( async (req, res) =>{
		try{
			
		}catch(err){
			console.log(err)
		}
	})
	.delete(async (req, res) =>{
		try{
			const personnel = await personnelController.deleteOne(req.params.id)
			res.send(personnel)
		} catch(err){
			console.log(err)
		}
	})

	app.route('/api/personnel/:code/:codes')
	.get(async (req, res) =>{
		try{
			let codes = req.params.codes.split(',');
			const personnels = await personnelController.getByChamp(req.params.code, codes)
			res.status(200).json({
				success: true,
				personnels
			});
		}catch(err){
			console.log(err)
		}
		
	})
}

