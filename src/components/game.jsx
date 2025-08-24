import { useTranslation } from "../components/LanguageProvider";
import Movie from "../components/movie";
import { useState, useEffect, useRef } from "react";

const Game = ({sendData}) => {
    const {text} = useTranslation();
    const [userInput, setUserInput] = useState("");
    const [levelMovies, setLevelMovies] = useState([]);
    const apiKey = process.env.API_KEY;
    const baseImgUrl = "https://image.tmdb.org/t/p/w500";
    const gameSection = useRef(null);
    let posibleMoves = [];

    const handleUserInput = (value) => {
        setUserInput(value);
        checkAnswer(value);
    }

    function checkAnswer(value) {
        if (levelMovies.length === 2) {
            if (
                levelMovies[0].title === value &&
                levelMovies[0].popularity >= levelMovies[1].popularity
            ) {
                gameSection.current?.classList.add("green");
                sendData(true);
                setTimeout(() => gameSection.current?.classList.remove("green"), 2000);
            } else {
                gameSection.current?.classList.add("red");
                setTimeout(() => gameSection.current?.classList.remove("red"), 2000);
            }
        }
    }

    useEffect(() => { 
        const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`; 
        console.log(apiKey); 
        fetch(url, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "accept": "application/json"
            }
          })
            .then(res => { 
                console.log(res); 
                return res.json(); 
            }) 
            .then(data => { 
                console.log(data.results); 
                posibleMoves = data.results; 
                setLevelMovies([data.results[0], data.results[1]]); 
            }) .
            catch(err => console.error(err)); 
    }, []);

    if (levelMovies.length < 2) {
        return <div>Loading...</div>; 
    }

    return(
        <div ref={gameSection} className="game-section">			
            <div className="ask">
                <h1>{text("play-title")}</h1>
            </div>
            <div className="movies" >
                <Movie sendData={handleUserInput} movieName={levelMovies[0].title} imageURL={baseImgUrl + levelMovies[0].poster_path}/>
                <Movie sendData={handleUserInput} movieName={levelMovies[1].title} imageURL={baseImgUrl + levelMovies[1].poster_path}/>
            </div>	
        </div>   
    );
}

export default Game;
