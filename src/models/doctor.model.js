const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    availability: {
        type: [String],
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    qualifications: {
        type: 'String', 
        required: true
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
