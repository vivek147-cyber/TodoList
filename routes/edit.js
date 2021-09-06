const express = require('express');
const List = require('../models/list');

const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');



router.get('/home/edit/:id', ensureAuthenticated, async(req, res) => {


    try {
        const lists = await List.findById(req.params.id).lean();

        res.render('edit', {
            lists,
        });


    } catch (err) {
        console.log(err);
    }
})


router.put('/home/:id', ensureAuthenticated, async(req, res) => {


    try {
        
        lists =await List.findByIdAndUpdate({ _id:req.params.id },req.body ,{
            new: true,
            runValidators: true

        })

        res.redirect('/home');


    } catch (err) {
        console.log(err);
    }
})


module.exports = router;
