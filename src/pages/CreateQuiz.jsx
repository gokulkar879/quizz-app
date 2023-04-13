import React, { useState } from 'react'
import Questioninfo from '../components/Questioninfo'
import Question from '../components/Question';
import { addDoc } from 'firebase/firestore'
import { quizRef } from '../firebase';
import { Link, useNavigate } from 'react-router-dom'

//page to create the quiz

function getQuestionInterface() {
    const quiz_question_set = [];
    const sample_question = {
        question: '',
        options: [
            '',
            '',
            '',
            ''
        ],
        correctOption: 0
    }
    for(let i=0;i<30;i++) {
        quiz_question_set.push(sample_question)
    }
    return quiz_question_set;
}

function CreateQuiz() {
    const [title, setTitle] = useState('')
    const [q_cnt, setQ_cnt] = useState(2)
    const [time, setTime] = useState("00:01")
    const [page, setPage] = useState(0)
    const [current, setCurrent] = useState(-1)
    const [quizQuestion, setQuizQuestion] = useState(getQuestionInterface())
    const navigate = useNavigate()

    const checkcorrectTime = e => {
        if(time < "00:01" || time > "23:59") {
            return false;
        }
        return true
    }
    
    const handleSubmit = e => {
       const data = {
        title: title,
        q_cnt: q_cnt,
        quizQuestion: quizQuestion,
        time: time
       }
       addDoc(quizRef, data)
       .then(data => {
        navigate("/home")
       })
    }

    const handleNxt = e => {
        e.preventDefault();
        if(title && q_cnt && checkcorrectTime()) {
            if(current == -1) {
                setCurrent(0)
                setPage(1)
            } else if(current < q_cnt-1) {
               if(quizQuestion[current]['question']) setCurrent(prev => prev+1)
            } else {
                  handleSubmit()
            }
        }
    }

    const handlePrev = e => {
        e.preventDefault()
        if(current > 0) {
            setCurrent(prev => prev-1)
        } else if(current == 0) {
            setCurrent(prev => prev-1)
            setPage(0)
        }
    }

  return (
    <div className='CreateQuizpage'>
        <div className='back'>
            <Link to="/home">Home</Link>
        </div>
        <div className='CreateQuizPage__center'>
        <div className='CreateQuizpage__form'>
            {
                (page == 0 ? <Questioninfo
                    title={title}
                    setTitle={setTitle}
                    q_cnt={q_cnt}
                    setQ_cnt={setQ_cnt}
                    time={time}
                    setTime={setTime}
                    /> : <Question
                         current={current}
                         setCurrent={setCurrent}
                         quizQuestion={quizQuestion}
                         setQuizQuestion={setQuizQuestion}
                    />)
            }
            <div className='CreateQuizpage_btn'>
            <button className='CreateQuizpage_btn_prev' onClick={handlePrev}>Previous</button>
            <button className='CreateQuizpage_btn_nxt' onClick={handleNxt}>
                {
                    ((current == q_cnt-1 && current >=0) ? 'Submit' : 'Next')
                }
            </button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default CreateQuiz