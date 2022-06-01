const router = require("express").Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post(``, async (req, res)=>{
    const user = await User.findOne({username: req.body.username});
    if(!user){
        res.send({message: `Username doesn't exist`});
        return;
    }
    const passwordCheck = await bcrypt.compare(req.body.password, user.password);
   if(!passwordCheck){
       res.send({message: `Password incorrect`});
       return;
   } 
   const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
   res.header('auth_token', token).send({message: `Success`, user: user.username});
})

module.exports = router;