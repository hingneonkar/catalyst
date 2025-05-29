const Submission = require('../models/Submission');
const mockGenAI = require('../utils/mockGenAI');

// POST /submission
exports.createSubmission = async (req, res) => {
    try {
        const { name, email, synopsis, topic } = req.body;

        if (!name || !email || !synopsis || !topic) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (synopsis.trim().split(/\s+/).length < 100) {
            return res.status(400).json({ message: "Synopsis must be at least 100 words." });
        }

        const { score, feedback } = mockGenAI(synopsis);

        const submission = await Submission.create({
            name, email, synopsis, topic, score, feedback
        });

        res.status(201).json(submission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// GET /submission
exports.getAllSubmissions = async (req, res) => {
    try {
        const { topic, minScore, maxScore } = req.query;
        const filter = {};

        if (topic) filter.topic = topic;
        if (minScore) filter.score = { $gte: minScore };
        if (maxScore) filter.score = { ...filter.score, $lte: maxScore };

        const submissions = await Submission.find(filter).sort({ createdAt: -1 });
        res.json({data:submissions});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
