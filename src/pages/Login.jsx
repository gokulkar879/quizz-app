import React, { useState } from 'react'
import { useUserContext } from '../UserContext'
import { addDoc } from 'firebase/firestore'
import { userRef } from '../firebase'
import { useNavigate } from 'react-router-dom'

/* Simple setup to enter the quiz app */

function Login() {
   const {setUser} = useUserContext()
   const [_user, set_User] = useState('')
   const navigate = useNavigate()

   const handleLogin = (e) => {
    e.preventDefault()
      addDoc(userRef, {
        user: _user,
        quizzes: []
      }).then(snapshot => {
          setUser({
            username: _user,
            id: snapshot.id
          })
          navigate("/home")
      })

   }

  return (
    <div className='login'>
      <form className='login__form'>
        <label htmlFor='username__input'>Username</label>
        <input id="username__input" value={_user} onChange={e => set_User(e.target.value)}></input>
        <button onClick={handleLogin}>Enter</button>
      </form>
    </div>
  )
}

export default Login