import React, { useState, useEffect } from "react";
import axios from "axios"
import Home from "./home";
import End from "./end";
import Questi from "./question";
function App(props) {
    const [username,setUsername]=useState(props.username);
    const [NoofQue,setNofQue]=useState(props.NoofQue);
    const [difficulty,setdifficulty]=useState(props.difficulty);
    const [type,setType]=useState(props.type);
    const [category,setCategory]=useState(props.category);

    const [quizStart, setQuizStart] = useState(false);
    const [questions,setQuestions]=useState([]);
    const [endQuiz,setEndQuiz]=useState(false);
    const [noOfCorr,setNoOfCorr]=useState(0);
    const [ques,setques]=useState(0);
    const [choosedOption,setChoosedOption]=useState([]);
    function end(correct,ques,mcq,choosedOpt){
        setques(ques);    //Obj.length
        setNoOfCorr(correct);
        setQuestions(mcq);    //Array
        setChoosedOption(choosedOpt);
        setEndQuiz(true);
        // console.log(choosedOpt)
    }
    function handleSubmit() {
        setQuizStart(false);
    }
    if(endQuiz){
        // console.log(questions);
        return <End correct={noOfCorr} questions={ques} obj={questions} choosedOpt={choosedOption}/>
    }
    if (quizStart) {
        return (<Home />)
    }

    else if(!quizStart){
return (<Questi endQuiz={end} username={username} NoofQue={NoofQue} difficulty={difficulty} type={type} category={category}/>)
    }
    else{
        useEffect(()=>{

        },endQuiz)
    }

}
export default App;
