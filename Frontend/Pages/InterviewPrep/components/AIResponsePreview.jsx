import React from "react";
import { LuCopy,LuCheck, LuCode } from "react-icons/lu";
import ReactMarkDown from "react-markdown";
import { href } from "react-router-dom";
import {Prism as SyntaxHighLighter} from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { useState } from "react";


const AIResponsePreview = ({content}) =>{

    if(!content) return null;

    return(
        <div className="bg-white shadow-md rounded-lg p-6 my-4 w-full">
            <div className="prose max-w-none prose-headings:font-bold prose-p:mb-2 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-blockquote:border-l-4 prose-blockquote:border-blue-300 prose-blockquote:pl-4 prose-blockquote:text-gray-600">
                <ReactMarkDown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({node,className,children,...props}){
                            const match = /langauge-(\w+)/.exec(className || '');
                            const langauge = match ? match[1] : '';
                            const isInLine = !className;

                            return !isInLine ? (
                                <CodeBlock 
                                    code = {String(children).replace(/\n$/,'')}
                                    langauge={langauge}
                                />
                            ):(
                                <code className="px-1 py-0.5 bg-gray-100 rounded text-sm " {...props}>
                                    {children}
                                </code>
                            );
                        },
                        p({children}){
                            return <p className="text-gray-800 leading-relaxed mb-2">{children}</p>;
                        },
                        strong({children}){
                            return <strong className="font-semibold text-gray-900">{children}</strong>;
                        },
                        em({children}){
                            return <em className="italic text-gray-700">{children}</em>;
                        },
                        ul({children}){
                            return <ul className="list-disc pl-6 mb-2">{children}</ul>;
                        },
                        ol({children}){
                            return <ol className="list-decimal pl-6 mb-2">{children}</ol>;
                        },
                        li({children}){
                            return <li className="mb-1">{children}</li>;
                        },
                        blockquote({children}){
                            return <blockquote className="border-l-4 border-blue-300 pl-4 text-gray-600 italic my-2">{children}</blockquote>;
                        },
                        h1({children}){
                            return <h1 className="text-3xl font-bold mb-2 text-gray-900">{children}</h1>;
                        },
                        h2({children}){
                            return <h2 className="text-2xl font-bold mb-2 text-gray-900">{children}</h2>;
                        },
                        h3({children}){
                            return <h3 className="text-xl font-bold mb-2 text-gray-900">{children}</h3>;
                        },
                        h4({children}){
                            return <h4 className="text-lg font-semibold mb-2 text-gray-900">{children}</h4>;
                        },
                        a({children}){
                            return <a href={href} className="text-blue-600 underline hover:text-blue-800">{children}</a>;
                        },
                        table({children}){
                            return (
                                <div className="overflow-x-auto my-2">
                                    <table className="min-w-full border border-gray-200 text-sm">{children}</table>
                                </div>
                            );
                        },
                        thead({children}){
                            return <thead className="bg-gray-100">{children}</thead>;
                        },
                        tbody({children}){
                            return <tbody>{children}</tbody>;
                        },
                        tr({children}){
                            return <tr className="border-b border-gray-200">{children}</tr>;
                        },
                        th({children}){
                            return <th className="px-4 py-2 font-semibold text-left">{children}</th>;
                        },
                        td({children}){
                            return <td className="px-4 py-2">{children}</td>;
                        },
                        hr({children}){
                            return <hr className="my-4 border-gray-300"/>;
                        },
                        img({src,alt}){
                            return <img src={src} alt={alt} className="rounded shadow max-w-full my-2" />
                        },
                    }}
                >{content}
                </ReactMarkDown>
            </div>
        </div>
    )
}

function CodeBlock({code,langauge}){
    const [copied, setCopied] = useState(false);

    const copyCode = ()=>{
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() =>setCopied(false),2000);
    };

    return (
        <div className="bg-gray-900 rounded-lg my-4 overflow-hidden border border-gray-300">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center gap-2 text-gray-200 text-xs font-mono">
                    <LuCode size={16} className="text-blue-400"/>
                    <span className="uppercase tracking-wide text-xs font-semibold">
                        {langauge || 'Code'}
                    </span>
                </div>
                <button onClick={copyCode} className="flex items-center gap-1 px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs transition" aria-label="Copy code">
                    {copied ?(
                        <LuCheck size={16} className="text-green-400"/>
                    ):(
                        <LuCopy size={16} className="text-gray-300"/>
                    )}
                    {copied && (
                        <span className="ml-1 text-green-400 font-semibold">Copied!</span>
                    )}
                </button>
            </div>
            <SyntaxHighLighter
                language={langauge}
                style={oneLight}
                customStyle={{fontSize:12.5, margin:0, padding:'1rem', background:'transparent'}}
            >{code}</SyntaxHighLighter>
        </div>
    )
}

export default AIResponsePreview