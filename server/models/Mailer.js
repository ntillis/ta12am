const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MailerSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Mailer', MailerSchema);