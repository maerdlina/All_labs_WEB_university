const morgan=require('morgan');
const helmet=require('helmet');
const { use } = require('./rout');

let stroka = []

const Helmet=helmet();
const Morgan=morgan(':method :url :status :res[content-length] - :response-time ms');

function Validation(req, res, next) {
    const userInput = req.body;
    const regex = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    console.log(Object.keys(userInput).length);
    console.log(userInput[0])
    let af = regex.test(userInput["name"])
    if (af) {
        return res.send(400,'Неправильный формат ввода');
    }
    next();
}

function Autorization(req,res,next) {
    if (req.headers['api-key']!=='1234') {return res.send(400,'Неправильный ключ API')};
    next();
}

function BadRequest(req,res) {
    res.send(400,'Неправильный запрос');
}

module.exports = {
    BadRequest,
    Autorization,
    Validation,
    Helmet,
    Morgan
}
