import { redirect } from "react-router-dom";
import { useTranslation } from "../components/LanguageProvider";
import Movie from "../components/movie";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Game = ({ sendData }) => {
    const navigate = useNavigate();
    const {text} = useTranslation();
    const [userInput, setUserInput] = useState("");
    const [levelMovies, setLevelMovies] = useState([]);
    let [posibleMoves, setPosibleMoves] = useState([]);
    let [allMoves, setAllMoves] = useState([]);
    const apiKey = process.env.REACT_APP_API_KEY;
    const baseImgUrl = "https://image.tmdb.org/t/p/w500";
    const gameSection = useRef(null);
    const langParam = text("lang-param");
    const menuBtn = text("redirect-menu");
    const cancelBtn = text("cancel");

    const handleUserInput = (value) => {
        setUserInput(value);
        checkAnswer(value);
    }


    function showAlert(title, text, icon) {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: menuBtn,
            cancelButtonText: cancelBtn
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/")
            } else {
                resetLevel();
                gameSection.current?.classList.remove("red");
            }
        });
    }

    function checkAnswer(value) {

        if (levelMovies.length === 2) {
            if (
                levelMovies[0].title === value &&
                levelMovies[0].popularity >= levelMovies[1].popularity
            ) {
                gameSection.current?.classList.add("green");
                sendData(true);
                setTimeout(() => {
                    gameSection.current?.classList.remove("green");
                    nextLevel();
                }, 500);
            } else if (levelMovies[1].title === value &&
                levelMovies[1].popularity >= levelMovies[0].popularity) {
                gameSection.current?.classList.add("green");
                sendData(true);
                setTimeout(() => {
                    gameSection.current?.classList.remove("green");
                    nextLevel();
                }, 500);
                
            } else {
                gameSection.current?.classList.add("red");
                showAlert(text("lost-title"), text("lost-text"), "error");
            }
        }
    }

    function shuffleArray(array) {
        let newArray = [...array]; 
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    useEffect(() => { 
        const url = `https://api.themoviedb.org/3/trending/movie/day?language=${langParam}&page=3`; 

        fetch(url, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "accept": "application/json"
            }
          })
            .then(res => { 
                return res.json(); 
            }) 
            .then(data => { 

                const shuffled = shuffleArray(data.results);
                setPosibleMoves(shuffled);
                setAllMoves(shuffled);
                setLevelMovies([shuffled[0], shuffled[1]]);

            }) .
            catch(err => console.error(err)); 
    }, [apiKey]);

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
