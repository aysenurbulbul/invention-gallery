const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes/api');


const app = express();
const PORT = process.env.PORT || 8080;


const MONGODB_URI = 'mongodb+srv://aysenur:mongodb495@inventiongallerydb-99jiu.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("mongoose is connected.")
});

mongoose.set('useFindAndModify', false);

// Data parsing
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(morgan('tiny'));  // HTTP request logger
app.use('/api', routes);

// for heroku
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('gallery/build'));
    //this saved me. react router wasn't working without this
    app.get("/*", function(req, res) {
        res.sendFile(path.join(__dirname, "./gallery/build/index.html"));
    });
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
