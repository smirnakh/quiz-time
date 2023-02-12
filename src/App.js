//import { Switch } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';
import axios from 'axios';
import { Switch } from '@material-ui/core';
function App() {
  const [name, setName] = useState('');
  const [questions, setQuestions] = useState('');
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState('light');

  const fetchQuestions = async (category = '', difficulty = '') => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    setQuestions(data.results);
  };

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    if (theme === 'dark') setTheme('light');
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="App">
        <div className="header-app">
          <Header />
          <Switch onClick={toggleTheme} className={theme}></Switch>
        </div>
        <div className="divider">
          <hr />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                name={name}
                setName={setName}
                fetchQuestions={fetchQuestions}
              />
            }
          ></Route>

          <Route
            path="/quiz"
            element={
              <Quiz
                name={name}
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
              />
            }
          ></Route>

          <Route
            path="/result"
            element={<Result name={name} score={score} />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
