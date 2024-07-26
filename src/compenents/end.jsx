import React, { useEffect, useState } from "react";
import Home from "./home";
function End(props) {
    const [quest, setQuestions] = useState(props.obj);
    const [restart,setRestart]=useState(false);
    const [choosedOption, setChoosedOption] = useState(props.choosedOpt);
    const [perc, setPerc] = useState(0);

    useEffect(() => {
        setPerc((props.correct / props.questions) * 100);
        console.log(choosedOption);
        console.log(props.obj);
        console.log(props.correct)
    }, [])
    function handleRestart(){
        setRestart(true);
    }
    if(restart){
        return (<Home />)
    }
    return (
        <div>
            <div className="d-flex flex-column gap-4 justify-content-center align-items-center" style={{ height: "100vh" }}>
            <button type="button" className="btn btn-info position-absolute top-0 end-0 mt-3 me-3" onClick={handleRestart}>
                Restart Quiz
            </button>
                <h1 style={{ fontSize: "45pt" }}>Quiz Result</h1>
                <div className="resultDetails" style={{ fontSize: "1.5rem", textAlign: "center", fontWeight: 300 }}><p style={{ marginBottom: "5px" }}>Correct Answers: {props.correct}</p>
                    <p style={{ marginBottom: "5px" }}>Total Questions: {props.questions}</p>
                    <p style={{ marginBottom: "5px" }}>Percentage: {perc.toFixed(2)} %</p>

                </div>
                <div><h4 style={{ color: "red", fontWeight: 400, fontSize: "2rem" }}>{perc < 35 ?"Better luck Next Time😔" : null}</h4>
                    <h4 style={{ color: "orange", fontWeight: 400, fontSize: "2rem" }}>{perc >= 35 && perc < 65 ? " You still need to work on 🙁" : null}</h4>
                    <h4 style={{ color: "yellow", fontWeight: 400, fontSize: "2rem" }}>{perc >= 65 && perc < 90 ? "Great! You are one step ahead to Goal 😊" : null}</h4>
                    <h4 style={{ color: "green", fontWeight: 400, fontSize: "2rem" }}>{perc >= 90 ? "Excellent! You have done a great job!!! 😇" : null}</h4></div>

            <p className="text-info float-end">
            Scroll down for answers <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-down" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
  <path fillRule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
</svg>
        </p>
            </div>
            <div>
                {quest.map((e, index) => {
                    let choices = [...e.incorrect_answers, e.correct_answer].sort();
                    return (
                        <div key={index} className="mb-4 p-3">
                            <div className="mb-3" >
                                <h4>Que. {index + 1} {e.question}</h4>
                            </div>
                            <div>
                                <div key={index} className=" list-group-checkable d-flex flex-column gap-2 border-0">
                                    {choices.map((option, ind) => (
                                        <div key={ind} style={{
                                            maxWidth: "500px", backgroundColor:
                                            (choosedOption[index]==="" && option === e.correct_answer) || (option === e.correct_answer && index>=choosedOption.length) ? "#08478e" :
                                                option === e.correct_answer ? "#28a745" : option === choosedOption[index] ? "#dc3545" : "black", padding: "10px", borderRadius: "5px"
                                        }}>{option}</div>
                                    ))}

                                </div>

                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default End