const mongoose = require('mongoose')


//schema 
const storeSchema = new mongoose.Schema({
    storeName:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    hours:{
        type: String,
        required: true
    },
    shopID: {
        type: String,
        required: true
    }
    // item: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'GroItem'
    // }

})


const Store = mongoose.model('Store', storeSchema)

module.exports = Store