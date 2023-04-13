import React from 'react'

//basic info about the quiz like title etc

function Questioninfo({title, q_cnt, setTitle, setQ_cnt, time, setTime}) {


  return (
    <div className='CreateQuizpage__form__details'>
        <label htmlFor='_title'>Title</label>
        <input id="_title" value={title} onChange={e => setTitle(e.target.value)}></input>
        <label htmlFor='_cnt'>Total Questions</label>
        <input id="_cnt" type='number' value={q_cnt} onChange={e => setQ_cnt(e.target.value)} min="2" max="30"></input>
        <label>Time limit</label>
        <input type="time" value={time} onChange={e => setTime(e.target.value)}></input>
    </div>   
  )
}

export default Questioninfo