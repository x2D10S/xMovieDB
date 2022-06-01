const express = require('express');
const path = require('path');
const cors = require ('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, ()=>{
    console.log(`Connected to the database`);
});

const PORT= process.env.PORT || 5000;


app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3000/movie', 'http://localhost:3000/tv'],
    methods: ['GET', 'POST'], 
    credentials: true, 
    exposedHeaders: 'auth_token'
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
})

//SignupRoute
const registerRoute = require('./routes/register');
app.use(`/signup`, registerRoute);

//LoginRoute
const loginRoute = require(`./routes/login`);
app.use(`/login`, loginRoute);

//LikeRoute
const likeRoute = require(`./routes/likeContent`);
app.use(`/like`, likeRoute);

//remove the if below to run with developement mode
if(process.env.NODE_ENV === 'production'){
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res)=>{
    res.sendFile(
        path.resolve(__dirname, '../client', 'build', 'index.html')
    )
})
}
else{
    app.get('/', (req, res)=>res.send('Use With Production Mode'));
}
