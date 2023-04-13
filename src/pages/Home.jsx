import React from "react";
import { Link } from "react-router-dom";
import { useQuizContext } from "../QuizContext";
import { useUserContext } from "../UserContext";

//home page to show the user and also attempt one

const Home = () => {
    const { allquiz } = useQuizContext()
    const {user} = useUserContext()
    console.log(user)

    const timeHelper = (time) => {
        let total_minutes = Number(time.substring(3));
        let hrs = Number(time.substring(0, 2));
        hrs *= 60;
        total_minutes += hrs;
        
        return total_minutes;
    }

    return (
        <div className="Home">
            <div className="Home__user__info">
                <p className="username">{user.username}</p>
                <Link to="/createquiz">
                    Create Quiz
                </Link>
            </div>
            <div className="Home__quizzes">
                {
                    allquiz.map(quiz => {
                        const {id, q_cnt, title, time} = quiz;
                        return <Link to={`/quiz/${id}`} key={id} className="quiz__list">
                            <div className="quiz_basic_info">
                                <p>Total questions - {q_cnt}</p>
                                <p>Time: {timeHelper(time)} minutes</p>
                            </div>
                            <p>{title}</p>
                        </Link>
                    })
                }
            </div>
        </div>
    )
}

export default Home