const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/user', function(req, res) {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    if (req.body.name === null || req.body.name === '' || req.body.email === null || req.body.email === '') {
        res.send('You must provide required information to continue');
    } else {
        user.save(function(err) {
            if (err) {                                                                           // Check if any validation errors exists (from user model)
                res.json({success: false, message: err});                            // In case we don't have problems with validation, we return the error whatever it is
            } else {
                res.json({ success: true, message:'User created.'});
            }
        });
    }
});
router.put('/updateOutput/:id', function (req, res) {
    User.findOneAndUpdate({ "_id": req.params.id }, { "$set": req.body}).exec(function(err, user){
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(user);
        }
    });
});

module.exports = router;
