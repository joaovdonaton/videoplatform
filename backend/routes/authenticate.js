const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

//verify token and return username
router.post('/getuser', auth, (req, res) => {
    res.json({user: req.user});
});

//authenticate user and return jwt token
router.post('/generatejwt', async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.json({error: 'missing required field'})
    }

    let user = await User.findOne({username});

    if(!user){
        return res.json({error: 'username does not exist'})
    }

    if(password === user.password){
        jwt.sign({user: username}, 'secret',
            {expiresIn: 360000,},
            (error, token) => {
                if(error) console.log(error);
                else return res.json({'jwt': token})
            })
    }
    else{
        return res.json({error: 'password does not match'})
    }
});

module.exports = router;