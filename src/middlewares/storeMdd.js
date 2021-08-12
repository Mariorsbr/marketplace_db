const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
module.exports = (req,res,next) =>{
   const storeHeader = req.headers.authorization;
   
   if (!storeHeader){
      return res.status(401).send({error: "No token provided"});
   }
        
   const parts = storeHeader.split(' ');
   
   if (!parts.lenght==2){
       return res.status(401).send({error: "Token error"})
   }
   
   const [scheme, token] = parts;

   if(!(/^Bearer$/i.test(scheme))){
       return res.status(401).send({error: "Token with wrong format"})
   }

   jwt.verify(token, authConfig.storePass, (err,decoded) =>{
       if(err) return res.status(401).send({error: "token invalid"});

       req.storeId = decoded.storeId;
       req.storeName = decoded.name;
       return next();
   });

};