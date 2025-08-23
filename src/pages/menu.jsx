import { useTranslation } from "../components/LanguageProvider";
import redirect from "../utils/redirect";

const Menu = () => {

    const { text } = useTranslation();

    return (

        <div className="page-background">
            <div className="intro" >
                <h1>{text("title")}</h1>
                <h3>{text("description")}</h3>
            </div>
            <div className="container">
                <button onClick={() => redirect("play")} >{text("play")}</button>
            </div>
            
        </div>      
    );

}


export default Menu;