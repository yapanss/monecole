require('dotenv').config();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Eleve = require('../models/eleve');
const Personnel = require('../models/personnel');
// const eleveController = require('../controllers/eleve');
// const personnelController = require('../controllers/personnel');
const TOKEN_SECRET = process.env.TOKEN_SECRET;

module.exports = (app) =>{
    app.route('/authenticate')
    .post(async (req, res) =>{
        try{
            let response;
            let user;
            const statut = req.body.statut;
            const matricule = req.body.matricule;
            const motDePasse = req.body.motDePasse
            
            if(statut == 'élève'){
                user = await Eleve.findOne({matricule});
            }else{
                user = await Personnel.findOne({matricule});
            }
            if(!user){
                    response = {success: false, message: 'Username or password incorrect !'}
            }else if(!user.compareMotDePasse(motDePasse)){
                    response = {success: false, message: 'Username or password incorrect !'};
            } else {
                const token = jwt.sign(
                    {nom: user.nom, matricule: user.matricule, statut}, 
                    TOKEN_SECRET, 
                    {expiresIn: 86400})
                response = {success: true, user, token, statut, expiresAt: 86400}
            }
            res.json(response)
            
        } catch(err){
            console.log(err)
        }
    })
}