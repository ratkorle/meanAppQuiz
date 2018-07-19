const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const QuizSchema = new Schema({
    question: {type: String},
    options: {type: Array},
    answer: {type: String}
});



module.exports = mongoose.model('Quiz', QuizSchema);