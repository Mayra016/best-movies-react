
const Movie = ({movieName, imageURL, sendData}) => {
    return(
        <div className="movie col-6">
            <a className="check-answer-link" onClick={() => sendData(movieName)} >
                <img src={imageURL}></img>
                <h1>{movieName}</h1>
            </a>							
        </div> 
    );
}

export default Movie;