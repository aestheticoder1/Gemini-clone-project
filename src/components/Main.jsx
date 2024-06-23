import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Context } from "../context/Context";

function Main(){

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input,loadData} = useContext(Context)

    return(
        <div className="main flex-1 min-h-screen pb-[15vh] relative">

            <div className="nav flex items-center justify-between text-[22px] p-5 text-[#585858]">
                <p>Gemini</p>
                <img className="w-12 rounded-[50px]" src={assets.user_icon} alt="" />
            </div>

            <div className="main-container max-w-[900px] m-auto">

                {
                    !showResult ?
                    <>
                        <div className="greet mx-0 mt-3 mb-[30px] text-[56px] text-[#c4c7c5] p-5 leading-tight">
                            <p><span className=" bg-gradient-to-r from-[#4b90ff] to-[#ff5546] text-transparent bg-clip-text font-medium">Hello, Nihal.</span></p>
                            <p>How can I help you today?</p>
                        </div>

                        <div className="cards grid grid-layout gap-[15px] p-5">
                            
                            <div onClick={()=>loadData("Give me a few tips on how I can grow my YouTube Channel",true)} className="card h-[200px] p-[15px] bg-[#f0f4f9] rounded-[10px] relative cursor-pointer hover:bg-[#dfe4ea]">
                                <p className="text-[#585858] text-[17px]">Give me a few tips on how I can grow my YouTube Channel</p>
                                <img className="w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px]" src={assets.compass_icon} alt="" />
                            </div>

                            
                            <div onClick={()=>loadData("Show me YouTube videos about inspiring speeches and give me tips on how to write my own",true)} className="card h-[200px] p-[15px] bg-[#f0f4f9] rounded-[10px] cursor-pointer relative hover:bg-[#dfe4ea]">
                                <p className="text-[#585858] text-[17px]">Show me YouTube videos about inspiring speeches and give me tips on how to write my own</p>
                                <img className="w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px]" src={assets.youtube_icon} alt="" />
                            </div>    
                        

                            
                            <div onClick={()=>loadData("Suggest some trusted sources to learn DSA in India",true)} className="card h-[200px] p-[15px] bg-[#f0f4f9] rounded-[10px] cursor-pointer relative hover:bg-[#dfe4ea]">
                                <p className="text-[#585858] text-[17px]">Suggest some trusted sources to learn Web Development in India</p>
                                <img className="w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px]" src={assets.code_icon} alt="" />
                            </div>
                        

                            
                            <div onClick={()=>loadData("Help me sound like an expert for an upcoming trip",true)} className="card h-[200px] p-[15px] bg-[#f0f4f9] rounded-[10px] cursor-pointer relative hover:bg-[#dfe4ea]">
                                <p className="text-[#585858] text-[17px]">Help me sound like an expert for an upcoming trip</p>
                                <img className="w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px]" src={assets.bulb_icon} alt="" />
                            </div>
                            
                        </div>
                    </> 
                    :
                    <div className="result px-[5%] max-h-[70vh] overflow-y-scroll no-scrollbar">

                        <div className="result-title my-10 flex items-center gap-5">
                            <img className="w-10 rounded-full" src={assets.user_icon} alt="" />
                            <p className="text-lg">{recentPrompt}</p>
                        </div>

                        <div className="result-data flex items-start gap-5">
                            <img className="w-10" src={assets.gemini_icon} alt="" />
                            {loading ?
                                <div className="loader w-full flex flex-col gap-2.5">
                                    <hr className="animate-[loading_3s_linear_infinite] rounded border-none bg-[#f6f7f8] bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] bg-[length:800px_50px] h-5" />
                                    <hr className="animate-[loading_3s_linear_infinite] rounded border-none bg-[#f6f7f8] bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] bg-[length:800px_50px] h-5" />
                                    <hr className="animate-[loading_3s_linear_infinite] rounded border-none bg-[#f6f7f8] bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] bg-[length:800px_50px] h-5" />
                                </div>
                                :
                                <p className=" text-lg font-light" dangerouslySetInnerHTML={{__html:resultData}}></p>
                            }
                            
                        </div>

                    </div>
                }

                

                <div className="main-bottom absolute bottom-0 w-full max-w-[900px] px-5 py-0 m-auto">
                    <div className="search flex items-center justify-between gap-5 bg-[#f0f4f9] sm:px-5 sm:py-2.5 px-2.5 py-[5px] rounded-[50px]">
                        <input onChange={(e)=>setInput(e.target.value)} value={input} className="sm:flex-1 w-[150px] flex-none bg-transparent border-none outline-none p-2 text-lg" type="text" placeholder="Enter a prompt here" />
                        <div className="flex items-center sm:gap-4 gap-[5px]">
                            <img className="sm:w-6 w-5 cursor-pointer" src={assets.gallery_icon} alt="" />
                            <img className="sm:w-6 w-5 cursor-pointer" src={assets.mic_icon} alt="" />
                            {input.length >0 ? <img onClick={()=>onSent()} className="sm:w-6 w-5 cursor-pointer" src={assets.send_icon} alt="" />:null}
                        </div>
                    </div>

                    <p className="bottom-info sm:text-[13px] text-[9px] mx-auto my-3 text-center">
                    Gemini may display inaccurate info, including about people, so double-check its responses. <span className="underline">Your privacy and Gemini Apps</span>
                    </p>

                </div>
                 
            </div>

        </div>
    )
}


export default Main;