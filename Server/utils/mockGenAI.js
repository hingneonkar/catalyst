// utils/mockGenAI.js

// Mock GenAI function to simulate scoring and feedback
function mockGenAI(synopsis) {
    // Generate a random score between 1 and 10
    const randomScore = parseFloat((Math.random() * 9 + 1).toFixed(1)); // 1.0 to 10.0

    // If score > 8, assign 0 as per assignment rules
    const finalScore = randomScore > 8 ? 0 : randomScore;

    // Simple logic for feedback based on score
    let feedback = "";
    if (finalScore === 0) {
        feedback = "The submission appears to be heavily assisted by AI. Please try to write in your own words.";
    } else if (finalScore >= 7) {
        feedback = "Excellent summary! Well-structured and insightful.";
    } else if (finalScore >= 4) {
        feedback = "Good effort, but consider adding more detail or depth.";
    } else {
        feedback = "The summary is quite brief and lacks clarity. Try to elaborate.";
    }

    // Return mock response
    return {
        score: finalScore,
        feedback
    };
}

module.exports = mockGenAI;
