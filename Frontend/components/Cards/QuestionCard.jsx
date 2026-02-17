import React, { useRef, useEffect, useState } from "react";
import { LuChevronDown,LuPin,LuPinOff,LuSparkle } from "react-icons/lu";
import AIResponsePreview from "../../Pages/InterviewPrep/components/AIResponsePreview";

const QuestionCard = ({
    question,
    answer,
    onLearnMore,
    isPinned,
    onTogglePin,
    expanded,
    explanation,
    loading,
    onCollapse,
}) => {
    
    const [isExpanded, setIsExpanded] = useState(false);
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);

    useEffect(()=>{
        if(isExpanded){
            const contentHeight = contentRef.current.scrollHeight;
            setHeight(contentHeight+10);
        }else{
            setHeight(0);
        }
    },[isExpanded]);

    const toggleExpand = ()=>{
        setIsExpanded(!isExpanded);
    }
    return(
        <>
            <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-full transition-all duration-300">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <span className="bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold">Q</span>
                        <h3 className="text-lg font-semibold text-gray-800 cursor-pointer flex-1" onClick={toggleExpand}>{question}</h3>
                        <div className={`flex items-center gap-2 ${isExpanded ? "md:flex" : "md:hidden group-hover:flex"}`}> 
                            <button className="p-2 rounded-full hover:bg-gray-100 transition" onClick={onTogglePin}>
                                {isPinned ?(
                                    <LuPin className="text-blue-500"/>
                                ) :(
                                    <LuPinOff className="text-gray-400"/>
                                )}
                            </button>
                            <button className="flex items-center gap-1 p-2 rounded-full hover:bg-blue-50 transition text-blue-600" onClick={()=>{ setIsExpanded(true); if(onLearnMore) onLearnMore(); }}>
                                <LuSparkle/>
                                <span className="text-xs font-medium">Learn More</span>
                            </button>
                        </div>
                        <button className="p-2 rounded-full hover:bg-gray-100 transition" onClick={toggleExpand}>
                            <LuChevronDown
                                size={20}
                                className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" :""}`}
                            />
                        </button>
                    </div>
                </div>
                <div className={`overflow-hidden transition-all duration-300`} style={{maxHeight:`${height}px`}}>
                    <div ref={contentRef} className="pt-2 text-gray-700 text-sm">
                        <AIResponsePreview content={answer}/>
                    </div>
                </div>
                {/* Inline Learn More explanation */}
                {expanded && (
                  <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-lg"
                      onClick={onCollapse}
                      aria-label="Close explanation"
                    >
                      &times;
                    </button>
                    <h4 className="text-base font-semibold mb-2 text-blue-700">Explanation</h4>
                    {loading ? (
                      <div className="py-4"><span className="animate-pulse text-gray-400">Loading...</span></div>
                    ) : explanation ? (
                      <div className="prose max-w-none">{explanation}</div>
                    ) : (
                      <div className="text-gray-400">No explanation loaded.</div>
                    )}
                  </div>
                )}
            </div>
        </>
    )
}

export default QuestionCard;