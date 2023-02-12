import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Quiz.css';
import Question from './Question';
const Quiz = ({ name, questions, score, setScore, setQuestions }) => {
  const [options, setOptions] = useState('');
  const [currQues, setCurrQues] = useState(0);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };
  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues].correct_answer,
          ...questions[currQues].incorrect_answers,
        ])
    );
  }, [questions, currQues]);

  console.log(options);

  return (
    <div className="quiz">
      <span className="subtitle">Welcome, {name}</span>
      {questions ? (
        <>
          <div className="quizInfo">
            <span className="category">{questions[currQues].category}</span>
            <span className="score">Score : {score}</span>
          </div>
          <Question
            score={score}
            setScore={setScore}
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={questions[currQues].correct_answer}
            setQuestions={setQuestions}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
};

export default Quiz;
