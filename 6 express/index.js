var express=require('express');
const router = require('./api/v1/rout');
const {Autorization, BadRequest, Morgan,Helmet} = require('./api/v1/middleware');
const bodyParser=require('body-parser');


var app=express();

const PORT=3000;
const host='127.0.0.1';


app.use(Helmet)
app.use(Morgan)

app.use(bodyParser.json());
// app.use(express.json())
app.use(express.static('public'))

app.use('/api/v1', Autorization, router); //уровень маршрутизатора
app.use(BadRequest) //уровень приложения



app.listen(PORT, host, () => {
    console.log(`Server starting on ${host}:${PORT}`)
})