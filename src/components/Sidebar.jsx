import React, { useContext, useState } from "react";
import {assets} from "../assets/assets"
import { Context } from "../context/Context";

function Sidebar(){

    const [extended,setExtended] = useState(false);
    const {onSent,prevPrompt,newChat,loadData} = useContext(Context);

    

    return(
        <div className="sm:inline-flex hidden sidebar min-h-screen flex-col justify-between bg-[#f0f4f9] px-[15px] py-[25px]">

            <div className="top">

                <img onClick={()=>setExtended((prev)=>!prev)} className="menu w-6 block ml-[10px] cursor-pointer" src={assets.menu_icon} alt="" />

                <div onClick={newChat} className="new-chat mt-[50px] inline-flex items-center gap-[10px] px-3 py-2 bg-[#e6eaf1] rounded-[50px] text-sm text-gray-500 cursor-pointer">
                    <img className="w-5 " src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null }
                </div>

                {extended ? 
                <div className="recent flex flex-col ">
                    <p className="recent-title mt-7 mb-3 ">Recent</p>

                    {prevPrompt.map((item,idx)=>{
                        return(
                            <div onClick={()=>loadData(item,false)} key={idx} className="recent-entry flex items-center gap-3 p-3 rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb] animate-[fadein_1s_ease-in-out]">
                                <img className="w-5" src={assets.message_icon} alt="" />
                                <p>{item.slice(0,18)} ...</p>
                            </div>
                        )
                    })}
                </div> : null
                }

                

            </div>
            
            <div className="bottom flex flex-col">

                <div className="bottom-item flex items-center gap-3 px-4 py-3 rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
                    <img className="w-5" src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p>:null}
                </div>

                <div className="bottom-item flex items-center gap-3 px-4 py-3 rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
                    <img className="w-5" src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p>:null}
                </div>

                <div className="bottom-item flex items-start gap-3 px-4 py-3 rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
                    <img className="w-5" src={assets.setting_icon} alt="" />
                    {extended? <p>Settings</p>:null}
                </div>

            </div>
        </div>
    )
}

export default Sidebar;