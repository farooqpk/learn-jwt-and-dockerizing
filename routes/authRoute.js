const express=require('express')
const { login, loginPost, signupPost,signup, allProduct, logout, aboutPage } = require('../controller/authController')
const { verifyToken, checkUser } = require('../middleware')

let router=express.Router()

router.get('*',checkUser)

router.post('/login',loginPost)

router.get('/login',login)

router.post('/signup',signupPost)

router.get('/signup',signup)

router.get('/product',verifyToken,allProduct)

router.get('/logout',verifyToken,logout)

router.get('/about',aboutPage)






module.exports=router





