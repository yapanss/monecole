const ressourceController = require('../controllers/ressource');

module.exports = (app) =>{
	app.route('/api/ressource')
	.get(async (req, res) =>{
		try{
			const ressource = await ressourceController.getAll();
			res.send(ressource);
		}catch(err){
			console.log(err);
		}
	})
	.post(async (req, res) =>{
		try{
            let body = req.body
            body.datePublication = Date.now()
			const ressource = await ressourceController.postOne(body);
			res.send(ressource);
		}catch(err){
			console.log(err);
		}
	})
	
	app.route("/api/ressource/:champ/:param")
	.get(async (req, res) =>{
		try{
			const champ = req.params.champ;
			let ressource;
			if(champ == 'id'){
				ressource = await ressourceController.getById(req.params.param)
			}else{
				ressource = await ressourceController.getByAuteur(req.params.param)
			}
			res.send(ressource)
		}catch(err){
			console.log(err)
		}
	})

	app.route("/api/ressource/:id")
	.put(async (req, res) =>{
		try{
			const ressource = await ressourceController.getById(req.params.id);
			if(req.body.titre){
				ressource.titre = req.body.titre
			}
			if(req.body.niveau){
				ressource.niveau = req.body.niveau
			}
			if(req.body.type){
				ressource.type = req.body.type
			}
			if(req.body.liens){
				ressource.liens = req.body.liens
			}
			
			ressource.derniereModif = Date.now()
			
			const newressource = await ressourceController.updateOne(ressource)
			res.send(newressource);
		} catch(err){
			console.log(err);
		}
    })
    .delete(async (req, res) =>{
        try{
            const ressource = await ressourceController.deleteOne(req.params.id);
			res.send(ressource);
        }catch(err){
            console.log(err)
        }
    })
}
