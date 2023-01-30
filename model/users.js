const mongoose = require("mongoose");
let bcrypt = require('bcrypt')

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'please enter email'],
        unique: [true, 'please provide unique email'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minLength: [5, 'password minlength should be greater than or equeal to 5']
    }
})


userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.statics.loginCheck = async function (email, password) {

    const user = await this.findOne({ email })
   

    if (user) {
        let result = await bcrypt.compare(password, user.password)
       
        if (result) {
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}





module.exports = mongoose.model('user', userSchema)