import React, { useEffect, useState } from 'react'

function question_helper() {
    return {
        question: '',
        options: [
            '',
            '',
            '',
            ''
        ],
        correctOption: 0
    }
}

function Question({current, setCurrent, quizQuestion, setQuizQuestion}) {
    const [question, setQuestion] = useState('')
    const [option1, setOption1] = useState('')
    const [option2, setOption2] = useState('')
    const [option3, setOption3] = useState('')
    const [option4, setOption4] = useState('')
    const [correctOption, setCorrectOption] = useState(0)

    const handleRemove = e => {
        e.preventDefault()
        if(quizQuestion[current]['question']) {
            let temp_quiz = quizQuestion;
            temp_quiz.splice(current, 1)
            temp_quiz.push(question_helper())
            setQuizQuestion(temp_quiz)
            if(current == 0 && quizQuestion[current+1]['question']) {
                setCurrent(prev => prev+1)
            } else {
                setCurrent(prev => prev-1)
            }
        }
    }

    const handleAdd = e => {
        e.preventDefault()
        if(question && option1 && option2 && option3 && option4) {
            let temp_quiz = quizQuestion;
            temp_quiz[current] = {
                question: question,
                options: [option1, option2, option3, option4],
                correctOption: correctOption
            }
            setQuizQuestion(temp_quiz)
        }
    }

    useEffect(() => {
        if(current >= 0) {
            setQuestion(quizQuestion[current]['question'])
            setOption1(quizQuestion[current]['options'][0])
            setOption2(quizQuestion[current]['options'][1])
            setOption3(quizQuestion[current]['options'][2])
            setOption4(quizQuestion[current]['options'][3])
            setCorrectOption(quizQuestion[current]['correctOption'])
        }
    }, [current])

  return (
    <div className='quiz_box'>
            <div className='quiz_box_btn'>
                <button onClick={handleAdd}>Add</button>
                <button onClick={handleRemove}>Delete</button>
            </div>
        <div className='quiz_box_form'>
            <input value={question} onChange={e => setQuestion(e.target.value)} className='quiz_box_question' placeholder='your question'></input>
            <div className='quiz_box_options'>
                <input value={option1} onChange={e => setOption1(e.target.value)} placeholder='option1'></input>
                <input value={option2} onChange={e => setOption2(e.target.value)} placeholder='option2'></input>
                <input value={option3} onChange={e => setOption3(e.target.value)} placeholder='option3'></input>
                <input value={option4} onChange={e => setOption4(e.target.value)} placeholder='option4'></input>
            </div>
            <input type="number" value={correctOption} onChange={e => setCorrectOption(e.target.value)} className='quiz_box_answer' min="1" max="4"></input>

        </div>
    </div>
  )
}

export default Question