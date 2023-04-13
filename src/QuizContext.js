import React , { useContext, useEffect, useState } from "react"
import { quizRef } from './firebase.js'
import { getDocs, onSnapshot } from 'firebase/firestore' 

//context to keep track of total quizzes in the app

const QuizContext = React.createContext()


const QuizContextProvider = ({children}) => {
    const [allquiz, setAllquiz] = useState([])

    const getAllQuizzes = () => {
        onSnapshot(quizRef, snapshot => {
            let quizzes = []
            snapshot.docs.forEach(doc => {
                quizzes.push({
                    ...doc.data(),
                    id: doc.id
                })
            })

            setAllquiz(quizzes)
          })
    }

    useEffect(() => {
        getAllQuizzes();
    }, [])

    return <QuizContext.Provider value={{
      allquiz,
      setAllquiz
    }}>
        {
            children
        }
    </QuizContext.Provider>
}

export const useQuizContext = () => {
    return useContext(QuizContext)
}

export default QuizContextProvider