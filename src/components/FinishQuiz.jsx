import React from 'react'
import { Link } from 'react-router-dom'

//component to show the total correct questions answered

function FinishQuiz({score, totalQuestionscnt}) {
  return (
    <div className='FinishQuiz'>
        <div className='quiz_score'>
          <p>Your score: {score}/{totalQuestionscnt}</p>
        </div>
        <Link to="/home">Home</Link>
    </div>
  )
}

export default FinishQuiz