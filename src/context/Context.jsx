import React, { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props)=>{

    //TO CAPTURE THE INPUT
    const [input,setInput] = useState("");

    //TO EVALUATE THE CURRENT PROMPT ENTERED BY THE USER
    const [recentPrompt,setRecentPrompt] = useState("");

    //TO EVALUATE THE PREVIOUS PROMPTS ENTERED BY THE USER
    const [prevPrompt,setPrevPrompt] = useState([]);

    // TO HIDE THE MAIN SCREEN AND SHOW THE OUTPUT SCREEN
    const [showResult,setShowResult] = useState(false);

    // TO START AND STOP LOADING ANIMATIONS
    const [loading,setLoading] = useState(false);
    
    // TO SET RESULT TO SHOW IT.
    const [resultData,setResultData] = useState("");

    const loadData = async (prompt,fromCards) =>{
        setRecentPrompt(prompt);
        if(fromCards){
            setPrevPrompt((prev)=>[...prev,prompt]);
        }
        await onSent(prompt);
    }

    const typingEffect = (idx,nextWord)=>{
        setTimeout(()=>{
            setResultData((prev)=>prev+nextWord)
        },30*idx);
    }

    const newChat = ()=>{
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt)=>{

        // SET RESULT DATA TO EMPTY STRING
        setResultData("");

        // EXECUTE LOADING ANIMATION 
        setLoading(true);

        // SHOW THE OUTPUT SCREEN AND HIDE THE MAIN SCREEN
        setShowResult(true);

        let response;

        // CHECK FOR PROMPT VALUE
        if(prompt!== undefined){

            response = await run(prompt);
            setRecentPrompt(prompt);

        }
        else{

            //UPDATE PREVIOUS PROMPTS
            setPrevPrompt((prev)=>[...prev,input]);

            //SET RECENT PROMPT TO THE CURRENT INPUT
            setRecentPrompt(input);

            //GENERATE RESPONSE
            response = await run(input);

        }

        

        //TAKE CARE OF THE BOLD ELEMENTS
        
        let responseArray = response.split("**");
        
        let newResponse="";
        for(let i=0;i<responseArray.length;i++)
        {
            
            if(i%2==0)
            {
                newResponse += responseArray[i];
            }
            else
            {
                newResponse += "<strong>" + responseArray[i] + "</strong>";
            }
        }

        //TAKE CARE OF NEW LINES;
        newResponse = newResponse.split("*").join("</br> </br>");

        if(newResponse[0]=='#')
            newResponse=newResponse.slice(3);
        
        //GENERATE RESPONSE AND PROCESS IT WITH TYPING EFFECT BY USING DELAY i.e. SETTIMEOUT FUNCTION
        let newResponseArray = newResponse.split(" ");
        for(let i=0;i<newResponseArray.length;i++){
            const nextWord = newResponseArray[i];
            typingEffect(i,nextWord+" ");
        }



        // HIDE LOADING ANIMATION 
        setLoading(false);

        //RESET THE INPUT FIELD
        setInput("");

    }

    

    //DATA THAT WILL BE SHARED
    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompt,
        setPrevPrompt,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent,
        newChat,
        loadData,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )


}

export default ContextProvider;