const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');
const Result = require('../models/result');


/*Get All Questions*/
router.get('/quiz', function (req, res) {
    Quiz.find({}, function (err, items) {
        if (err) {
            console.log(err);
            res.json({ err: err });
        } else {
            res.json({ questions: items });
        }
    });
});
router.post('/save', (req, res) => {

    // Create Result Object for Registration
    let newResult = new Result({
        name: req.body.name,
        score: req.body.score,
        date: new Date()
    });

    // Register Result Object
    Result.registerResult(newResult, (err) => {
    if (err) {
        res.json({ success: false, msg: 'Score Registration Failed! ' + err });
    } else {
        res.json({ success: true, msg: 'Score Registered!' });
}
});

});

router.get('/high-scores', (req, res) => {

    // Get All Scores
    Result.find({}, function (err, items) {
    if (err) {
        console.log(err);
        res.json({ err: err });
    } else {
        res.json({ results: items });
    }
});

});

module.exports = router;

