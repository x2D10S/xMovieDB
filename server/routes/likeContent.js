const router = require('express').Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');

router.post(`/addmovie`, (req, res)=>{
    jwt.verify(req.body.token, process.env.TOKEN_SECRET, async (err, decoded)=>{
        if(err){
            res.status(400).send('Access denied');
            return;
        }
        const user= await User.findById({_id:decoded._id});
        if(!user){
            res.status(400).send('User not found');
            return;
        }

        await User.updateOne({_id: user._id}, {$addToSet: {movie_favourites: req.body.movie}});
    })
    
})

router.post(`/removemovie`, (req, res)=>{
    jwt.verify(req.body.token, process.env.TOKEN_SECRET, async (err, decoded)=>{
        if(err){
            res.status(400).send('Access denied');
            return;
        }
        const user= await User.findById({_id:decoded._id});
        if(!user){
            res.status(400).send('User not found');
            return;
        }

        await User.updateOne({_id: user._id}, {$pull: {movie_favourites: req.body.movie}});
    })
    
})

router.post(`/removetv`, (req, res)=>{
    jwt.verify(req.body.token, process.env.TOKEN_SECRET, async (err, decoded)=>{
        if(err){
            res.status(400).send('Access denied');
            return;
        }
        const user= await User.findById({_id:decoded._id});
        if(!user){
            res.status(400).send('User not found');
            return;
        }

        await User.updateOne({_id: user._id}, {$pull: {tv_favourites: req.body.tv}});
    })
    
})


router.post(`/addtv`, (req, res)=>{
    jwt.verify(req.body.token, process.env.TOKEN_SECRET, async (err, decoded)=>{
        if(err){
            res.status(400).send('Access denied');
            return;
        }
        const user= await User.findById({_id:decoded._id});
        if(!user){
            res.status(400).send('User not found');
            return;
        }
       await User.updateOne({_id: user._id}, {$addToSet: {tv_favourites: req.body.tv}});
    })
    
})

router.post(`/movie`, async (req, res)=>{
    jwt.verify(req.body.token, process.env.TOKEN_SECRET, async (err, decoded)=>{
        if(err){
            res.status(400).send('Access denied');
            return;
        }
        const user = await User.findById({ _id: decoded._id });
        for(let i=0; i<user.movie_favourites.length; i++){
            if(user.movie_favourites[i] === Number(req.body.movie)){
                res.send('Favourite');
                return;
            }
        }
        res.send('Not favourite')
    })
    
})

router.post(`/tv`, async (req, res)=>{
    jwt.verify(req.body.token, process.env.TOKEN_SECRET, async (err, decoded)=>{
        if(err){
            res.status(400).send('Access denied');
            return;
        }
        const user = await User.findById({ _id: decoded._id });
        for(let i=0; i<user.tv_favourites.length; i++){
            if(user.tv_favourites[i] === Number(req.body.tv)){
                res.send('Favourite');
                return;
            }
        }
        res.send('Not favourite')
    })
    
})


router.post(`/fetchall`, (req, res)=>{
    jwt.verify(req.body.token, process.env.TOKEN_SECRET, async (err, decoded)=>{
        if(err){
            res.status(400).send('Access denied');
            return;
        }
        const user = await User.findById({ _id: decoded._id });
        res.status(200).send({
            movies: user.movie_favourites,
            tv: user.tv_favourites
        })
    })
})

module.exports = router;