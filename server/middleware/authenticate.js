const { User } = require('../models/user')

var authentecate = ( req, res , next)=>{
    var token = req.header('x-auth')
    
    User.findByToken(token).then(doc=>{
        if (!doc){
            res.send('no user existed')
        }
        req.user = doc
        req.token = token 
        next()
    }).catch(e=>{
        res.status(401).send()
    })
}

module.exports = authentecate