const listenPort = 8080;
const express = require('express');
const dotenv = require('dotenv').config();
const server = express();

const staticFilesPath = express.static(__dirname + '/public');
server.use(staticFilesPath);

// Middleware para parsear el body de la respuesta // JSON support
server.use(express.json());
server.use(express.urlencoded({extended: false}));


//---------MONGOOSE y MODELS
const mongoose = require('mongoose')

const urlDatabase = 'mongodb://localhost:27017/Quiz';
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }

mongoose.connect(urlDatabase, mongoOptions)
        .then(() => {
            console.info('Connected to DB!');
        })
        .catch((err) => console.error(err))

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info('> mongoose succesfully disconnected!');
    process.exit(0);
  });
});

const {Schema} = require('mongoose')

const questionSchema = new Schema({
  q: {
    type: String, 
    require: true, 
    unique: true
  },
  a: {
    type: [String], 
    require: true
  },
  ok: {
    type: Number, 
    require: true
  }
});

// const Question = model('Arquitectura', questionSchema);
// module.exports = Question;

const userSchema = new Schema({ 
        user: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
      });

const Question = mongoose.model('Questions', questionSchema, 'Questions');
const User = mongoose.model('Users', userSchema, 'Users');

server.listen (listenPort,
        console.log(`Server started listening on ${listenPort}`));


function validateUser(email, password){
        let paternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let paternPass = /[a-z]+/;
        // console.log('1', validateUser(email, password))
        console.log('2', email)
        console.log('2', password)

        return paternEmail.test(email)&&paternPass.test(password)       
}


// MACHEO DE LA INFORMACIÓN DE USUARIO / login

server.post('/Admin', (req, res) => {
        console.log('3', validateUser(req.body.user, req.body.password) )

        const DatosUsuario = {
                user: req.body.user,
                password: req.body.password
        }
        if(validateUser(req.body.user, req.body.password) === true){
                User.findOne(DatosUsuario, (err, result) =>{
                        if(result == null){
                                res.status(400).json({
                                        status: 400,
                                        ok: false,
                                        message: "Usuario o contraseña no existente."
                        });
                        }else{
                                res.status(200).json({
                                        data: result,
                                        status: 200,
                                        ok: true,
                                        message: "Logado con éxito."
                                })
                        }
                })
        }else{
                res.status(401).json({
                        status: 401,
                        ok: false,
                        message: "E-mail o Password no cumplen con la validación."})
        }
})








// MOSTRAR PREGUNTAS DE LA DB EN QUIZ
server.get('/showQuestions', (req, res) => {
        try {
                Question.find({}, (err, result) => {
                        if(result == null){
                                res.status(400).json({
                                        status: 400,
                                        ok: false,
                                        data: 'No se han encontrado datos.'
                                })
                        }
                        else {
                                res.status(200).json({
                                        status: 200,
                                        ok: true,
                                        result: result
                                })
                        }
                })
        }
        catch {
                console.log("Error en la base de datos.")
        }
})






// LEER LAS PREGUNTAS BACKEND
server.get('/readQuestion', (req, res) => {
        try{
                Question.find({}, (err, result) => {
                        if(result == null){
                                res.status(400).json({
                                        status: 400,
                                        ok: false,
                                        message: "No se encontraron datos."
                                })
                        }else{
                                res.status(200).json({
                                        data: result,
                                        status: 200,
                                        ok: true
                                })
                        }
                })
        }
        catch{
                console.log("Error en la base de datos.")
        }
})





// GUARDAR PREGUNTAS EN LA DB
server.post('/saveQuestion', (req, res) => {
        const writeAnswer = {
                q: req.body.q,
                a: req.body.a,
                ok: req.body.ok
        }
        try{
                Question.create(writeAnswer, (err, result) =>{
                        if(err){
                                res.status(400).json({
                                        status:400,
                                        ok: false,
                                        alert: 'No ha sido posible crear una nueva pregunta.'
                                })
                        }else{
                                res.status(200).json({
                                        status: 200,
                                        ok: true,
                                        alert: 'Pregunta guardada con éxito.',
                                        url: 'admin.html'
                                })
                        }
                })
        }catch{
                console.log('Error en la base de datos.')
        }
})





// EDITAR PREGUNTAS DE LA DB
server.put('/editQuestion', (req, res) => {
        const writeAnswer = {
                q: req.body.q,
                a: req.body.a,
                ok: req.body.ok
        }
        console.log(writeAnswer)
        try {
                Question.updateOne({_id: req.body._id}, writeAnswer, (err, result) => {
                        if(err) {
                                res.status(400).json({
                                        status:400,
                                        ok: false,
                                        data: 'No ha sido posible guardar los cambios.'
                                })
                        }
                        else {
                                res.status(200).json({
                                        status: 200,
                                        ok: true,
                                        data: 'Los cambios se han guardado con éxito.',
                                        url: 'admin.html'
                                })
                        }
                })
        }
        catch {
                console.log('Error en la base de datos.')
        }
})





// BORRAR PREGUNTAS DE LA DB
server.delete('/deleteQuestion', (req, res) => {
        try {
                Question.deleteOne({q: req.body.q}, (err, result) => {
                        console.log(req.body.q)
                        console.log(err)

                        if(err) {
                                res.status(400).json({
                                        status: 400,
                                        ok: false,
                                        data: 'No se han encontrado preguntas para borrar.'
                                })
                        }
                        else {
                                res.status(200).json({
                                        status: 200,
                                        ok: true,
                                        data: 'Pregunta eliminada con éxito.',
                                        url: 'admin.html'
                                })
                        }
                })
        } catch {
                console.log('Error en la base de datos.')
        }
})