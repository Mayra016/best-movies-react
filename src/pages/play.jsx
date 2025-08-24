import { useState } from "react";
import Score from '../components/score';
import Game from '../components/game';

const Play = () => {
    const [score, setScore] = useState(0);

    return(
        <><Score score={score}></Score><Game></Game></>
    );
}

export default Play;