       //Generar un endpoint que permita listar
       const express = require('express')
       const mongoose = require('mongoose')
       const Koder = require('./koderModel')
       const access = require('db')
       const server = express()

       server.use(express.json())//recibir objetos json

const URL = `mongodb+srv://${access.DB_USER}:${access.DB_PASSWORD}@${access.DB_HOST}/${access.DB_NAME}`

       /*server.get('/koders',async (request, response) => {
           //

           const koders = await Koder.find({})//regresa una promesa y la promesa regresa los koders
            response.json({
                succes: true,
                data: {
                    koders: koders
                }
            })
       })*/

       server.get('/koders', async (request, response) => {
         try{
           //const gender = request.query.gender
          //const name = request.query.neme
          //const age = request.query.age

          //destructuring
          const {gender, age} = request.query
          const filters = {}
          
          if (gender) filters.gender = gender.toLowerCase()
        console.log(filters)
        if(age) filters.age = parseInt(age)

        const koders = await Koder.find(filters)  //Koder.find({gender: 'm'})  // regresa una promesa

        response.json({
            success: true,
            data: {
                koders: koders
            }
        })
         } catch(error){
          response.status(400).json({
            success: false,
            message: error.message
          })
         }
       })

       server.get("/koders/:id", async (request, response) => {
        try {
          const idKoder = request.params.id;
          // const koderFound = awaitKoder.find({ _id: idKoder });// Regresa una promesa
          const koderFound = await Koder.findById(idKoder); // Regresa un objeto si lo encuentra me regresa un undefined
          // si no encuentras al koder
        // if (!koderFound) {
        //     response.status(404)
        //     response.json({
        //         success: false,
        //         message: 'koder not found'
        //     })
        //     return
        // }
      
          if (!koderFound) throw new Error("koder not found");
      
          response.json({
            succes: true,
            data: {
              koder: koderFound,
            },
          });
        } catch (error) {
          response.status(404);
          response.json({
            succes: false,
            message: error.message,
          });
        }
      });
      

       server.post('/koders', async (request, response)=> {
           try{
            const newKoder = request.body
            const koderCreated = await Koder.create(newKoder)// regresa una promesa
            response.json({
                sucess: true,
                message: 'koderCreated',
                data: {
                    koder: koderCreated
                }
            })
           }catch(error) {
                response.status(400)
                response.json({
                    succes: false,
                    message: error.message
                })
           }
            
       })

       // Ingresamos la URL de conexión desde 
//const { response } = require('express')
//const express = require('express')
//const { default: mongoose 
server.patch('/koders/:id', async (request, response) => {
    try{
    const idKoder = request.params.id
    const dataToUpdate = request.body
    const koders = await Koder.findByIdAndUpdate (idKoder, dataToUpdate, {new: true}) // Esto es lo que vamos a actualizar, 
    if (!koders) throw new Error("koder not found");
    response.json({
      succes: true,
      data: {
        koders: koders,
      },
    });
  } catch (error) {
    response.status(404);
    response.json({
      succes: false,
      message: error.message,
    })
  }
})

/*server.delete('/koders/:id', async (request, response) => {
    try {
        
    } catch () {

    }
})*/

       server.listen('8080',() => {
           console.log('Server running on port: 8080')
       })

       mongoose.connect(URL)//regresa una promesa
            .then(()=> {
                console.log('Database Connected XD')
            })
            .catch((error)=> {
                console.log('Error al conectarnos a la BD: ', error)
            })

            const model = mongoose.model('koders', koderSchema)
            
            //exportar
            module.exports = model

            /*
            const model1 = mongoose.model('koders', koderSchema)
    const model2 = mongoose.model('koders', koderSchema)


    module.exports = {
        model1,
        model2
    }
*/ 