import React, { useState } from "react";
import App from "./App";

function Home() {
  const [start, setStart] = useState(false);
  const [username, setUsername] = useState("");
  const [NoofQue, setNofQue] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [usererror, setUserError] = useState("");

  function handleUsername(event) {
    setUsername(event.target.value);
  }
  function handleQues(event) {
    setNofQue(event.target.value);
  }
  function handleDifficulty(event) {
    setDifficulty(event.target.value.toLowerCase());
  }
  function handleType(event) {
    setType(event.target.value === "True/False" ? "boolean" : "multiple");
  }
  function handleStart(event) {
    event.preventDefault();
    let n = NoofQue;
    if (n <= 0 || n > 50) {
      setError("Please select the number of questions in a valid range (1-50).");
    } else if (username.trim() === "") {
      setUserError("Please enter a valid username");
    } else {
      setStart(true);
    }
  }
  function handleCategory(event) {
    setCategory(event.target.value);
  }

  if (start) {
    return (
      <App
        username={username}
        NoofQue={NoofQue}
        difficulty={difficulty}
        type={type}
        category={category}
      />
    );
  }

  return (
    <div className="home-container">
      <div className="title">
        <h1 className="box_title">QuizByte</h1>
      </div>
      <div className="container">
        <form className="needs-validation" noValidate>
          <div className="row g-3 box2">
            <div className="col-12 ip">
              <label htmlFor="username" className="form-label">Username</label>
              <div className="input-group has-validation">
                <input type="text" className="form-control" id="username" onChange={handleUsername} placeholder="Username" required />
              </div>
              {usererror && <div className="error-message" style={{ color: 'red', marginTop: '5px' }}>{usererror}</div>}
            </div>

            <div className="col-sm-6 ip">
              <label htmlFor="numberOfQuestions" className="form-label">Number of Questions <small>(max 50)</small></label>
              <input type="number" className="form-control" onChange={handleQues} id="numberOfQuestions" placeholder="Enter number of questions" required />
              {error && <div className="error-message" style={{ color: 'red', marginTop: '5px' }}>{error}</div>}
            </div>

            <div className="row-md-5 ip">
              <label htmlFor="difficulty" className="form-label">Select Difficulty</label>
              <select className="form-select" id="difficulty" onChange={handleDifficulty} required>
                <option value="">Any Difficulty</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
              <div className="invalid-feedback">
                Please select a valid difficulty.
              </div>
            </div>

            <div className="row-md-4 ip">
              <label htmlFor="type" className="form-label">Select Type</label>
              <select className="form-select" id="type" onChange={handleType} required>
                <option value="">Any Type</option>
                <option>Multiple</option>
                <option>True/False</option>
              </select>
              <div className="invalid-feedback">
                Please provide a valid type.
              </div>
            </div>

            <div className="row-md-4 ip">
              <label htmlFor="category" className="form-label">Select Category</label>
              <select className="form-select" id="category" onChange={handleCategory} required>
                <option value="">Any Category</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">Entertainment: Musicals & Theatres</option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="17">Science & Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
              </select>
              <div className="invalid-feedback">
                Please provide a valid category.
              </div>
            </div>
          </div>

          <hr className="my-3" />
          <button className="fs-3 px-5 btn btn-dark btn-lg check" type="submit" onClick={handleStart}>Start Quiz</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
