const express = require('express');
const List = require('../models/list');

const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');



router.get('/home/add', ensureAuthenticated, (req, res) => {

    res.render('add');
})


router.get('/home/showlist/:id', ensureAuthenticated, async (req, res) => {


    try {
        const lists = await List.findById(req.params.id).lean()



        res.render('showlist', {
            lists,
        });


    } catch (err) {
        console.log(err);
    }
})



router.post('/home', ensureAuthenticated, async (req, res) => {

    try {
        req.body.user = req.user.id;
        await List.create(req.body);


        res.redirect('/home');
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;