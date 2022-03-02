const mongoose = require('mongoose')//importar mongoose

const koderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 150
    },
    gender: {
        type: String,
        required: true,
        trim: true,
        enum: ['f','m'] 
    }
})

const koder = mongoose.model('koders', koderSchema)

//exportar
module.exports = model

