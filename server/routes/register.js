const router = require('express').Router();
const User = require('../model/user');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken')

router.post(``, async (req, res)=>{
    const userCheck = await User.findOne({username: req.body.username});
    if(userCheck){
        res.send({message: 'Username already exists'});
        return;
    }
    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        joinedDate: Date.now()
    })
    try{
        const savedUser = await user.save();
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth_token', token).send({message: 'Success', username: user.username});
    }
    catch(err){
        res.status(400).send(err);
        console.log(err);
    }
})


module.exports = router;
