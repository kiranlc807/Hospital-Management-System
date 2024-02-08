const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Assuming 'User' model is used for patients
        required: true
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor', // Assuming 'Doctor' model is used for doctors
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending'
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
