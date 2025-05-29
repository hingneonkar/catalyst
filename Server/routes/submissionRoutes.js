const express = require('express');
const router = express.Router();
const { createSubmission, getAllSubmissions } = require('../controllers/submissionController');

router.post('/submission', createSubmission);
router.get('/submission', getAllSubmissions);

module.exports = router;
