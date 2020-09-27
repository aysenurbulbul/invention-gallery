const mongoose  = require('mongoose');

// Schema
const Schema = mongoose.Schema;

// who rated to which product
const RateSchema = new Schema({
    rater : String,
    product_name : String,
    inventor : String,
    rating : Number,
});

// Model
const Rate = mongoose.model('Rates', RateSchema);

module.exports = Rate;