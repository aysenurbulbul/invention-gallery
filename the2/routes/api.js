const express = require('express');
const User = require('../models/user');
const Invention = require('../models/invention');
const Rates = require('../models/rates');

const router = express.Router();

// Routes

//GET requests


router.get('/users', (req, res) => {
    User.find({})
        .then((data) => {
            console.log('data: ', data);
            res.json(data);
        }).catch((err) => {
        console.log('error: ', err);
        res.json({ msg : err});
    });
});

router.get('/user/:user', (req, res) => {
    User.find({username : req.params.user})
        .then((data) => {
            console.log('data: ', data);
            res.json(data);
        }).catch((err) => {
        console.log('error: ', err);
        res.json({ msg : err});
    });
});

router.get('/products', (req, res) => {
    Invention.find({exhibit : true})
        .then((data) => {
            console.log('data: ', data);
            res.json(data);
        }).catch((err) => {
        console.log('error: ', err);
        res.json({ msg : err});
    });
});

// gt the users inventions to drop operation
router.get('/products/:inventor', (req, res) => {
    Invention.find({inventor : req.params.inventor})
        .then((data) => {
            console.log('data: ', data);
            res.json(data);
        }).catch((err) => {
        console.log('error: ', err);
        res.json({ msg : err});
    });
});

//get the invention
router.get('/productdetail/:pname', (req, res) => {
    Invention.find({product_name : req.params.pname})
        .then((data) => {
            console.log('data: ', data);
            res.json(data);
        }).catch((err) => {
        console.log('error: ', err);
        res.json({ msg : err});
    });
});

//get old rate if rated
router.get('/ratedbefore/:rater/:pname', (req, res) => {
    Rates.find({product_name : req.params.pname, rater : req.params.rater })
        .then((data) => {
            console.log('data: ', data);
            res.json(data);
        }).catch((err) => {
        console.log('error: ', err);
        res.json({ msg : err});
    });
});


//POST requests


//add user
router.post('/adduser', (req, res) => {
    console.log(req.body);
    const data = req.body;

    const user = new User(data);

    user.save((error) => {
        if (error) {
            return res.status(500).json({ msg: 'Sorry, internal server errors' });
        }else{
            return res.json({
                msg: 'user is saved in the database'
            });
        }

    });

});

//add invention
router.post('/addproduct', (req, res) => {
    console.log(req.body);
    const data = req.body;

    const invention = new Invention(data);

    invention.save((error) => {
        if (error) {
            return res.status(500).json({ msg: 'Sorry, internal server errors' });
        }else{
            return res.json({
                msg: 'product is saved in the database'
            });
        }

    });

});


//DELETE requests

router.delete('/deleteusers/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id, (err, user) => {
       if(err){
           console.log(err);
           return res.json({ msg : 'error happened'});
       }
        return res.json({ msg : 'deleted'});
    });
});



//PUT request

router.put('/dropproduct/:id', async (req, res) => {
    await Invention.update(
        {_id : req.params.id},
        {exhibit : false},
        (err, resp) => {
            return res.json({ msg : 'updated'});
        }
    );
});

router.put('/exhibitproduct/:id', async (req, res) => {
    await Invention.update(
        {_id : req.params.id},
        {exhibit : true},
        (err, resp) => {
            //console.log(resp)
            return res.json({ msg : 'updated'});
        }
    );
});

router.put('/inventions/:rater/:pname', async (req, res) => {
    console.log(req);
    await Rates.findOneAndUpdate(
        {rater : req.params.rater, product_name : req.params.pname},
        req.body,
        {new : true, upsert : true},
        (err, rate) => {
            if(err){
                console.log(err);
                return res.json({ msg : 'error happened'});
            }
            // get new rating for product
            Rates.find({product_name : req.params.pname})
                .then((data) => {
                    let avg_prate = 0;
                    let rate_number = data.length;
                    data.forEach((prates) => {
                        avg_prate += prates.rating;
                    });
                    avg_prate = avg_prate / rate_number;
                    let num = avg_prate.toFixed(2);
                    console.log('rate: ', num);
                    Invention.update(
                        {product_name : req.params.pname},
                        {rating : num},
                        (err, resp) => { console.log(resp)}
                    );
                }).catch((err) => {
                console.log('error: ', err);
            });

            // get new rating for user
            Rates.find({inventor : req.body.inventor})
                .then((data) => {
                    let avg_urate = 0;
                    let rate_number = data.length;
                    data.forEach((prates) => {
                        avg_urate += prates.rating;
                    });
                    avg_urate = avg_urate / rate_number;
                    let num = avg_urate.toFixed(2);
                    console.log('rate: ', avg_urate);
                    User.update(
                        {username : req.body.inventor},
                        {avg_rating : num},
                        (err, resp) => { console.log(resp)}
                    );
                }).catch((err) => {
                console.log('error: ', err);
            });
            console.log('************************************************')
            return res.json({msg : 'rate is saved'});
        }
    )
});

module.exports = router;