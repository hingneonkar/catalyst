const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    synopsis: { type: String, required: true },
    topic: { type: String, required: true },
    score: { type: Number, required: true },
    feedback: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
} , {collection:'submissions'});

module.exports = mongoose.model('Submission', SubmissionSchema);
