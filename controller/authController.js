

const { json } = require("express")
const users = require("../model/users")
let jwt = require('jsonwebtoken')
const { createToken, verifyToken } = require("../middleware")
let bcrypt = require('bcrypt')
let maxAge =  12 * 60 * 60

module.exports.signupPost = async (req, res) => {
    const { email, password } = req.body
    try {

        let User = await users.create({ email, password })
        const token = createToken(User.id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).send('logged succesfully')

    } catch (error) {

        let errorMsg = error.message.split(':')[2]
        res.render('signup', { errorMsg })
    }
}

module.exports.signup = (req, res) => res.render('signup')
module.exports.login = (req, res) => {

    res.render('login')
}


module.exports.loginPost = async (req, res) => {
    try {


        let { email, password } = req.body

        let user = await users.loginCheck(email, password)

        let token = createToken(user.id)

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).send('login succesfull')


    } catch (error) {
        let emailErr = ''
        let passErr = ''
        if (error.message === 'incorrect email') {
            emailErr = 'incorrect email'
        }
        if (error.message === 'incorrect password') {
            passErr = 'incorrect password'
        }
        res.render('login', { emailErr, passErr })
    }
}


module.exports.allProduct = (req, res) => {
    // console.log('ivde');
    // console.log(req.decoded);
    res.json({
        "apple": "10",
        "orange": "20",
        "grapes": "30"

    })
}

module.exports.logout = (req, res) => {

    res.cookie('jwt', '', { maxAge: 1 })

    res.redirect('/login')
}

module.exports.aboutPage = (req, res) => {

    console.log(res.locals.user);
    res.send('its about page')
} 
