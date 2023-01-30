
let jwt = require('jsonwebtoken')
const users = require('./model/users')



module.exports.createToken = (id) => {

    return jwt.sign({ id },process.env.SECRET, {
        expiresIn: '12h'
    })
}


module.exports.verifyToken = (req, res, next) => {

    let token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, tokenDecoded) => {

            if (err) {
                console.log(err);

                res.redirect('login')
            } else {

                // req.decoded = tokenDecoded.id
                next()

            }
        })
    } else {
        res.redirect('login')
    }
}



module.exports.checkUser = function (req, res, next) {

    let token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'net demo secret', async (err, tokenDecoded) => {

            if (err) {
                res.locals.user = null
                console.log('user illa');
                next()
            } else {
                let user = await users.findById(tokenDecoded.id)
                if (user) {
                    res.locals.user = user._id
                    next()
                } else {
                    next()
                }

            }

        })

    } else {
        console.log('no token');
        res.locals.user = null
        next()
    }


}






