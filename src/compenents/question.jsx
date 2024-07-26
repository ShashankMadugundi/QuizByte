import React, { useState, useEffect } from "react";
import axios from "axios";

function Questi(props) {
  const [username,setUsername]=useState(props.username);
  const [NoofQue,setNofQue]=useState(props.NoofQue);
  const [difficulty,setdifficulty]=useState(props.difficulty);
  const [type,setType]=useState(props.type);
  const [category,setCategory]=useState(props.category);

  const [obj, setObj] = useState([]);
  const [choosedOption,setChoosedOption]=useState([]);
  let [correct, setCorrect] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [count, setCount] = useState(0);
  const [endQuiz, setEndQuiz] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=${NoofQue}&category=${category}&difficulty=${difficulty}&type=${type}&encode=base64`);
        var decodedQuestions = response.data.results.map((question) => ({
          // ...question,
          question: atob(question.question),
          correct_answer: atob(question.correct_answer),
          incorrect_answers: question.incorrect_answers.map((answer) => atob(answer))
        }));
        setObj(decodedQuestions);
      } catch {
        console.log("Error");
      }
    }
    fetchQuestions();
  }, []);

  function handleNext(event) {
    if (count < obj.length - 1) {
      // Update choosedOption synchronously
      const updatedChoosedOption = [...choosedOption, selectedOption];
      setChoosedOption(updatedChoosedOption);
  
      // Check if selected option is correct and update correct count
      if (selectedOption === obj[count].correct_answer) {
        correct++;
        setCorrect(correct);
      }
  
      // Move to the next question
      setCount(count+1);
      setSelectedOption('');
    } else {
      // This is the last question
      const updatedChoosedOption = [...choosedOption, selectedOption];
      setChoosedOption(updatedChoosedOption);
  
      // Check if selected option is correct and update correct count
      if (selectedOption === obj[count].correct_answer) {
        correct++;
        setCorrect(correct);
      }
  
      // End quiz after updating state
      // console.log(correct);
      props.endQuiz(correct, obj.length, obj, updatedChoosedOption);
    }
  }
  
  function handleOptionChange(event){
    setSelectedOption(event.target.value);

  }

  function handleEnd(){
    setEndQuiz(true);
    props.endQuiz(correct,obj.length,obj,choosedOption);
  }

  if (obj.length === 0) {
    return <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"100vh"}}><div className="spinner-border text-info" role="status">
    <span className="visually-hidden">Loading...</span>
    
  </div><p className="text-info">Loading...</p></div>;
  }

  const currentQues = obj[count];
  const choices = [...currentQues.incorrect_answers, currentQues.correct_answer].sort();

  return (
    <div className="">
    <div>
      <button type="button" onClick={handleEnd} className="btn btn-info mt-4">
            End Quiz
        </button>
        </div>
    <form>
      <div className="container mt-5 mcq">
        <div className="question mb-4">
          <h4>Que.{count+1} {currentQues.question}</h4>
        </div>
        <div className="list-group list-group-checkable d-grid gap-2 border-0">
          {choices.map((option, index) => (
            <div key={index}>
              <input
                className="list-group-item-check"
                type="radio"
                name="options"
                id={option}
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              <label className={`list-group-item rounded-3 py-3 ${selectedOption === option ? 'active' : ''}`} htmlFor={option}>
                <span className="option-text">{option}</span>
              </label>
            </div>
          ))}
        </div>
        <button type="button" onClick={handleNext} className="btn btn-info mt-4">
          {count >= obj.length - 1 ? "Submit" : "Next Question"}
        </button>
      </div>
    </form>
    </div>
  );
}

export default Questi;
