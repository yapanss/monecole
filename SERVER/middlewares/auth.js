require('dotenv').config()
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET;


module.exports = (app) => {
    app.use((req, res, next) =>{
        // try{
            const token = req.headers['access_token'];
            if(token){
                jwt.verify(token, TOKEN_SECRET, (err, decoded) =>{
                    if(err){
                        console.log('erreur ...')
                        res.json({
                            success: false,
                            message: 'Authentification impossible'
                        })
                    }else{
                        req.decoded = decoded;
                        next();
                    }
                })
            }else{
                res.status(403).json({
                    success: false,
                    message: 'Accès interdit !'
                })
            }
        
        // }catch(err){
        //     console.log(err)
        // }
    })
}

