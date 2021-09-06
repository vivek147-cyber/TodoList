const express = require('express');
const List = require('../models/list');

const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');



router.get('/home/delete/:id', ensureAuthenticated, async(req, res) => {


    try {
        const lists = await List.findById(req.params.id).lean();

        res.render('delete', {
            lists,
        });


    } catch (err) {
        console.log(err);
    }
})


router.delete('/home/:id', ensureAuthenticated, async(req, res) => {


    try {
        const lists = await List.deleteOne({ _id: req.params.id });

        res.redirect('/home');

        

    } catch (err) {
        console.log(err);
    }
})


module.exports=router;