const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const workoutSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    repetition:{
        type: Number,
        required: true,
    },
    load:{
        type: Number,
        required: true,
    } ,
    user_id:{
        type: String,
        required: true,
    }
},
{
    timestamps:true
})


const workoutModel = mongoose.model('workout', workoutSchema)
module.exports = workoutModel;

