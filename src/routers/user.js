const express = require('express')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userRouter = express.Router();

userRouter.post('/register', async(req, res) => {
    console.log('register')
    console.log(req.body)
    const { first_name, last_name, password, email } = req.body 

    if(!(first_name && last_name && password && email)){
        return res.status(400).send("Pls Enter Your resgister")
    };

    //Check email
    const oldUser = await UserModel.findOne({ email })
    if(oldUser){
        return res.send('User all ready')
    }
     //Hashing Password
    bcryptPassword = await bcrypt.hash('password', 10)

    const user = await UserModel.create({
        first_name,
        last_name,
        password: bcryptPassword,
        email: email.toLowerCase()
    })

    //create Token
    const token =  jwt.sign( 
        { users_id: user._id, email },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h"
        }
    )

    user.token = token 
    return res.status(201).json(user)
})


// Login
userRouter.post('/login', async(req, res) => {
    console.log('Login')
    const { email, password } = req.body

    if(!(email && password)){
        res.status(400).send('Pls enter your email and password')
    }

    const user = await UserModel.findOne({ email });
    if(user && ( bcrypt.compare(password, user.password))){
        const token =  jwt.sign( 
            { users_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )
        user.token = token 
        return res.status(201).json(user)
    }
    res.status(400).send('Invalid')
})
// })

module.exports = userRouter