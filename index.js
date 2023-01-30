let express = require('express')
let app = express()
let mongoose=require('mongoose')
mongoose.set("strictQuery", false);
require('dotenv').config()

const authRoute = require('./routes/authRoute')
const cookieParser=require('cookie-parser')
const{engine}=require('express-handlebars')
let path=require('path')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use('/',authRoute)


app.set('views',path.join(__dirname,'views'))
app.set('view engine','hbs')
app.engine('hbs',engine({
    extname:'hbs',
    defaultLayout:false,
    layoutsDir:false,
    partialDir:false
})) 


mongoose.connect('mongodb://127.0.0.1:27017/auth').then((result)=>{
app.listen(3000, () => console.log('listening'))
})









