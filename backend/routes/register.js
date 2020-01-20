const express = require('express');
const router = express.Router();
const User = require('../models/User');

//register new user
//authentication not required
router.post('/', async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password) {
        return res.json({error: 'Invalid input'})
    }

    let user = await User.findOne({username});

    if(user){
        return res.json({error: 'User already exists'})
    }

    if(password.length < 8){
        return res.json({error: 'Password must have 8 or more characters'})
    }

    if(username.length > 16){
        return res.json({error: 'Username can not have more than 16 characters'})
    }

    user = new User({
        username, password
    });

    await user.save();

    return res.json({message: 'Account succesfully created'})
});

module.exports = router;