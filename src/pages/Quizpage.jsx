import React, { useEffect, useState } from 'react'
import FinishQuiz from '../components/FinishQuiz'
import Quiz from '../components/Quiz'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useParams } from 'react-router-dom'

//page where the quiz starts

function Quizpage() {
  const [questions, setQuestions] = useState([])
  const [counter, setCounter] = useState(0)
  const [title, setTitle] = useState('')
  const [totalQuestionscnt, setTotalQuestionscnt] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [rightAnswerCount, setRightAnswerCount] = useState(0)
  const [time, setTime] = useState("00:01") 
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timer_, setTimer_] = useState(60);

  const {id} = useParams()
  
  const getTimer = (timer_, id) => {
    let nt = timer_ * 1000;
    if(!nt) {
      setIsFinished(true);
      return;
    } 
    if(id == 1) {
       return Math.floor((nt / (1000 * 60 * 60)) % 24)
    } else if(id == 2) {
       return Math.floor((nt / 1000 / 60) % 60);
    } else {
       return Math.floor((nt / 1000) % 60)
    }
  }



  const retrieveQuiz = async (e) => {
    const docRef = doc(db, "quizzes", id)
    const docSnap = await getDoc(docRef);
    setQuestions(docSnap.data().quizQuestion)
    setTotalQuestionscnt(docSnap.data().q_cnt)
    setTitle(docSnap.data().title)
    setTime(docSnap.data().time)
    const _time = Number(docSnap.data().time.substring(0, 2))*3600 + Number(docSnap.data().time.substring(3))*60;
    setTimer_(_time)
  }

  useEffect(() => {
      retrieveQuiz()
  }, []) 

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer_(prev => prev-1)
    }, 1000);

    return () => clearInterval(interval);
  },[time])

    if(questions.length === 0) {
        return <div></div>
    }
  return (
    <div className='Quizpage'>
      <div className='QuizPage__timer'>
       {
        (!isFinished) && <p className='timer'><span>{getTimer(timer_, 1)}</span> : <span>{getTimer(timer_, 2)}</span> : <span>{getTimer(timer_, 3)}</span></p>
       } 
      </div>
        <div className='QuizPage__center'>
          {
            isFinished ? 
            <FinishQuiz score={rightAnswerCount} totalQuestionscnt={totalQuestionscnt}/> :
            <Quiz quiz={questions[counter]} 
              counter={counter}
              setCounter={setCounter} 
              isLast={counter==totalQuestionscnt-1} 
              setRightAnswerCount={setRightAnswerCount}
              setIsFinished={setIsFinished}
              />
          }
        </div>
      </div>
  )
}

export default Quizpage