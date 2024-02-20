import React, { useState } from 'react';
import { likelihoodQuestionsConfig } from './QuestionsConfig'; // Adjust the import path as needed

function LikelihoodQuestions({ onScoreChange }) {
    // Using an object to track scores by question key
    const [scores, setScores] = useState({});

    // Handle score update by question key
    const updateScore = (questionKey, newScore) => {
        const updatedScores = { ...scores, [questionKey]: newScore };
        setScores(updatedScores);

        const totalScore = Object.values(updatedScores).reduce((total, currentScore) => total + currentScore, 0);
        onScoreChange(totalScore);
    };

    return (
        <div className="panel impact-panel">
            <div className="panel-header">Likelihood</div>
            <div className="questions-container">
                <div className="section">
                    <div className="section-header">Frequency Factors</div>
                    <hr className="section-divider" />
                    <Question
                        question={likelihoodQuestionsConfig[0]}
                        onChange={(e) => updateScore(likelihoodQuestionsConfig[0].key, Number(e.target.value))}
                    />
                </div>

                

                <div className="section">
                    <div className="section-header">Vulnerability Factors</div>
                    <hr className="section-divider" />
                    {likelihoodQuestionsConfig.slice(1).map((question) => (
                        <Question
                            key={question.key}
                            question={question}
                            onChange={(e) => updateScore(question.key, Number(e.target.value))}
                        />
                    ))}
                </div>
            </div>
        </div>

    );
}

function Question({ question, onChange }) {
    return (
        <div className="question">
            <label>{question.label}</label>
            <select onChange={onChange} defaultValue="">
                <option value="" disabled>Select an option</option>
                {question.options.map(option => (
                    <option key={option.value} value={option.score}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}

export default LikelihoodQuestions;
