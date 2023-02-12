import React, { useState } from 'react';
import './Question.css';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

export default function Question({
  score,
  setScore,
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setQuestions,
}) {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const handleSelect = (i) => {
    if (selected === i && selected === correct) {
      return 'select';
    } else if (selected === i && selected !== correct) {
      return 'wrong';
    } else if (i === correct) {
      return 'select';
    }
  };

  const handleCheck = (option) => {
    setSelected(option);
    if (option === correct) setScore(score + 1);
    setError(false);
  };

  const navigate = useNavigate();

  const handleNext = () => {
    if (currQues > 8) {
      navigate('/result');
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else setError('Please select an option first');
  };

  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
  };

  return (
    <div className="question">
      <h1>Question {currQues + 1}</h1>
      <div className="singleQues">
        <h2>
          {questions[currQues].question.replace(/#|_|:|&|@|"$"|";"/g, '')}
        </h2>

        <div className="options">
          {error && <h4>Please select an option first</h4>}
          {options &&
            options.map((i) => {
              return (
                <button
                  onClick={() => handleCheck(i)}
                  className={`singleOption  ${selected && handleSelect(i)}`}
                  key={i}
                >
                  {i}
                </button>
              );
            })}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            size="large"
            color="primary"
            style={{ width: 100 }}
            href="/"
            onClick={handleQuit}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            style={{ width: 100 }}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
