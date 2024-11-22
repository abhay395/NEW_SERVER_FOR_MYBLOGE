const mongoose = require('mongoose');

contactSchema = new mongoose.Schema({
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
})

const Contact = mongoose.model('Contact', contactSchema);