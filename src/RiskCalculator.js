import React, { useState, useEffect } from 'react';
import LikelihoodQuestions from './LikelihoodQuestions';
import ImpactQuestions from './ImpactQuestions';

function RiskCalculator() {
  const [likelihoodScore, setLikelihoodScore] = useState(0);
  const [impactScore, setImpactScore] = useState(0);
  const [overallRiskScore, setOverallRiskScore] = useState(0);

useEffect(() => {
    // Recalculate overall risk score whenever likelihood or impact scores change
    setOverallRiskScore(likelihoodScore * impactScore);
  }, [likelihoodScore, impactScore]);

  return (
    <div>
      <div className="questions-section">
        <LikelihoodQuestions onScoreChange={setLikelihoodScore} />
        <ImpactQuestions onScoreChange={setImpactScore} />
      </div>
      <div className="scores-section">
        <div className="score-item">Likelihood Score: {likelihoodScore}</div>
        <div className="score-item">Impact Score: {impactScore}</div>
        <div className="score-item overall-score">Overall Risk Score: {overallRiskScore}</div>
      </div>
    </div>
  );
}

export default RiskCalculator;