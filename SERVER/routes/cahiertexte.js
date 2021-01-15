const cahiertexteController = require('../controllers/cahiertexte');

module.exports = (app)  => {
    app.route('/api/cahiertexte')
    .post(async (req, res) =>{
        try {
            const body = {
                classe: req.body.classe,
                partage: {}
            }
            const cahier = await cahiertexteController.postOne(body);
            console.log('cahier : ', cahier)
            res.send(cahier);
        } catch (err) {
         console.log(err)   
        }
    })
    app.route('/api/cahiertexte/:param')
    .get(async (req, res) =>{
        try {
            const param = req.params.param;
            const cahiertexte = await cahiertexteController.getOne('classe', param);
            res.json({
                success: true,
                cahiertexte
            })
        } catch (err) {
            console.log(err);
        }
    })
    .put(async (req, res) =>{
        try {
            const id = req.params.param;
            const matiere = req.body.matiere;
            const donnee  = req.body.entree
            const newCahier = await cahiertexteController.updateOne(id, matiere , donnee);
            res.json({
                success: true,
                message: 'Updated successfuly',
                newCahier
            })
        } catch (err) {
            console.log(err)
        }
    })
    .delete(async (req, res) =>{
        try {
            const cahiertexte = await cahiertexteController.deleteOne(req.params.param);
            res.json({
                success: true,
                message: 'Deleted successfuly'
            })
        } catch (err) {
            console.log(err)
        }
    })
}