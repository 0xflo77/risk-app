import React from 'react';
import { likelihoodQuestionsConfig } from './QuestionsConfig';

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

function LikelihoodQuestions({ onScoreChange }) {
    const [scores, setScores] = React.useState({
        q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0
    });

    const updateScore = (questionId, newScore) => {
        const updatedScores = { ...scores, [questionId]: newScore };
        setScores(updatedScores);

        // Sum all scores and pass to parent component
        const totalScore = Object.values(updatedScores).reduce((total, currentScore) => total + currentScore, 0);
        onScoreChange(totalScore);
    };
  
    return (
    <div className="panel likelihood-panel">
      <div className="panel-header">Likelihood</div>
        <div className="questions-container">
            {likelihoodQuestionsConfig.map(q => (
                <Question
                key={q.key}
                question={q}
                onChange={(e) => updateScore(q.key, Number(e.target.value))}
                />
            ))}
        </div>
    </div>
  );
}

export default LikelihoodQuestions;
