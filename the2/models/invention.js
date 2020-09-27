const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;

const InventionSchema = new Schema({
    product_name : {type : String, unique : true},
    photo : String,
    cost : String,
    materials : String,
    inventor : String,
    rating : Number,
    date : Date,
    optionals : {
        name1 : '',
        val1 : '',
        name2 : '',
        val2 : ''
    },
    exhibit : Boolean
}, { strict: false });

// Model
const Invention = mongoose.model('Invention', InventionSchema);

module.exports = Invention;