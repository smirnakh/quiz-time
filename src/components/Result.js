import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Result.css';

export default function Result({ name, score }) {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      navigate('/');
    }
    if (score >= 7) {
      setMessage(
        <p className="message">
          You Did Great {name} !!! <span>🥳</span>
        </p>
      );
    } else if (score === 10) {
      setMessage(
        <p className="message">
          WOW!! That Is Impressive {name} !!! <span>🤩</span>
        </p>
      );
    } else if (score === 5 && score < 7) {
      <p className="message">
        Not Bad {name} !!! <span>🤗</span>
      </p>;
    } else {
      setMessage(
        <p className="message">
          You Can Do Better {name} !!! <span>🙄</span>
        </p>
      );
    }
  }, [name, navigate, setMessage, score]);

  return (
    <div className="result">
      <span className="finalScore"> Final Score : {score}</span>
      {message}

      <Button
        variant="contained"
        size="large"
        style={{ alignSelf: 'center', marginTop: 20 }}
        href="/"
      >
        Start Over
      </Button>
    </div>
  );
}
