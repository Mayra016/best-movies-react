import { useState } from "react";
import Score from '../components/score';
import Game from '../components/game';

const Play = () => {
    const [score, setScore] = useState(0);

    const handleUserAnswer = (value) => {
        if (value) {
            setScore(score + 10);
        } else {
            setScore(0);
        }
    }

    return(
        <><Score score={score}></Score><Game sedData={handleUserAnswer}></Game></>
    );
}

export default Play;