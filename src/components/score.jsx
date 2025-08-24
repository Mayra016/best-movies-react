import React from "react";
import { useTranslation } from "./LanguageProvider";
import redirect from "../utils/redirect";

const Score = ({ score }) => {
    const { text } = useTranslation();

    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: "0px 30px" }}>
            <div className="score right">
                <h5>{text("score")}</h5>
                <h6>{score}</h6>
            </div>
            <button 
                className="menu-btn" 
                onClick={() => redirect("/")} 
            >
                <img 
                    className="menu-logo" 
                    src="/assets/menu-logo.png" 
                    alt="menu logo" 
                />
                <h5>Menu</h5>
            </button>
        </div>
    );
};

export default Score;
