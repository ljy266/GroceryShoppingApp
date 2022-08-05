const mongoose = require('mongoose');


//schema 
const Schema = mongoose.Schema
const grocerySchema = new Schema({
    veg_id: String,
    name: String,
    type: String,
    picURL: String,
    description: String,
    price: String,
    shop_ID: String,
})


//Model
const GroItem = mongoose.model('GroItem', grocerySchema)


module.exports = GroItem