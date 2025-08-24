
const Movie = ({movieName, imageURL, sendData}) => {
    return(
        <div class="movie col-6">
            <a class="check-answer-link" onClick={() => sendData(movieName)} >
                <img src={imageURL}></img>
                <h1>{movieName}</h1>
            </a>							
        </div> 
    );
}

export default Movie;