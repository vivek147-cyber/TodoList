const express = require('express');
const List = require('../models/list');

const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');


router.get('/home', ensureAuthenticated, async (req, res) => {

    try {
        const lists = await List.find({ user: req.user.id }).lean()

        res.render('home', {
            username: req.user.username,
            lists
        });
    } catch (err) {
        console.log(err);
    }

});


module.exports = router;
