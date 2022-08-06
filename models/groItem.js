const mongoose = require('mongoose');


//schema 
const Schema = mongoose.Schema
const grocerySchema = new Schema({
    vegId: String,
    name: String,
    type: String,
    picUrl: String,
    description: String,
    price: String,
    shopId: String,
})


//Model
const GroItem = mongoose.model('GroItem', grocerySchema)


module.exports = GroItem