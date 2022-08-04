const mongoose = require('mongoose');


//schema 
const Schema = mongoose.Schema
const grocerySchema = new Schema({
    name: String,
    description: String,
    imageURL: String
})


//Model
const GroItem = mongoose.model('GroItem', grocerySchema)


module.exports = GroItem