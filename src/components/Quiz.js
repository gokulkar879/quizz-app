import React, { useEffect, useState } from 'react'
import './Quiz.css'

//component to show the current question of the attempted quiz

function Quiz({ quiz, counter, setCounter, isLast, setRightAnswerCount, setIsFinished }) {
    const [currentOption, setCurrentOption] = useState(-1)
    const handleOptionClick = (optionNo) => {
        setCurrentOption(optionNo)
    }

    const handleButtonClick = e => {
        if(isLast) {
           setIsFinished(true)
           setCurrentOption(-1)
        } else {
            if(currentOption == -1) return;
            setRightAnswerCount(prev => (prev + (currentOption+1 == quiz.correctOption)))
            setCounter(prev => prev+1)
            setCurrentOption(-1)
        }
    }


  return (
    <div className='Quiz'>
        <h4 className='Quiz__counter'>{counter+1}</h4>
        <p className='Quiz__question'>{quiz.question}</p>
        <div className='Quiz__center'>
            {
                quiz.options.map((option, index) => {
                    return <button className={`Quiz__btn ${currentOption == index ? 'clicked': 'left'}`} key={index} onClick={() => handleOptionClick(index)}>
                        <p>{option}</p>
                    </button>
                }
                )
            }
        </div>
        <button className='Quiz__nxt' onClick={handleButtonClick}>{isLast ? 'Finish' : 'Next'}</button>
    </div>
  )
}

export default Quiz