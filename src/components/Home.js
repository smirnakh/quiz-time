import { MenuItem, TextField, Button } from '@material-ui/core';
import { useState } from 'react';
import Categories from '../Data/Categories';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home({ name, setName, fetchQuestions }) {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!category || !difficulty || !name) {
      return setError(true);
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      navigate('/quiz');
    }
  };

  return (
    <div className="content">
      <div className="settings">
        <h1>Settings</h1>
        <div className="settings-select">
          {error && <h4>Please fill all the fields</h4>}
          <TextField
            style={{ marginBottom: 25 }}
            label="Enter Your Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            select
            label="Select Category"
            variant="outlined"
            style={{ marginBottom: 25 }}
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {Categories.map((cat) => (
              <MenuItem key={cat.category} value={cat.value}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Select Difficulty"
            variant="outlined"
            style={{ marginBottom: 25 }}
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>
          <Button variant="contained" onClick={handleSubmit}>
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}
