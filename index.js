const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('./db/mongoose')
const router = require('./router/developer')

const port = process.env.port || 3000;
app.use(bodyParser.json())
app.use('/dev',router)

app.get('/',(req,res)=>{
 res.send('hello')
});
 app.listen(port,()=> {
     console.log('server connected');
     
 });

