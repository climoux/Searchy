"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
// Utils
import capitalizeFirstLetter from "@/utils/uppercaseFirst";
import { truncateTextAtLastDot } from "@/utils/truncateText";

type ContextUsedProps = {
    AbstractText: string;
    AbstractSource: string;
    AbstractURL: string;
    Heading: string;
    ImageContext: string;
    Infobox: {
        content: [],
        meta: []
    };
    OfficialWebsite: string | undefined;
    RelatedTopics: [];
}

type InfoboxProps = {
    data_type: string;
    label: string;
    value: string;
    wiki_order: string;
}

const SearchContext = ({ AbstractText, AbstractSource, AbstractURL, Heading, ImageContext, Infobox, OfficialWebsite }: ContextUsedProps) => {
    const [headling, setHeadline] = useState<string | null>(null)

    useEffect(() => {
        if(Infobox && Infobox.content.length > 0){
            Infobox.content.map((info: InfoboxProps) => {
                if(info.data_type === "wd_description") setHeadline(capitalizeFirstLetter(info.value));
            })
        }
    }, [Infobox])

    return (<>
        {
            !AbstractText ? (<></>)
            : (<div className="context-container">
                <div id="head">
                    <div className="head-info">
                        <p>{Heading}</p>
                        {headling && (
                            <span>{headling}</span>
                        )}
                    </div>
                    {ImageContext !== '' && (
                        <img src={"https://duckduckgo.com" + ImageContext} alt="Image" title="Heading" />
                    )}
                </div>
                <Link href={AbstractURL ?? ""} title={AbstractSource} target="_blank" rel="noreferrer" id="abstract">
                    <p>{truncateTextAtLastDot(AbstractText, 350)}</p>
                    <span>{AbstractSource}</span>
                </Link>
                {(Infobox && Infobox.content.length > 0) && (
                    <div id="advanced">
                        {Infobox.content.map((info: InfoboxProps, index: number) => {
                            if(info.data_type === "string"){
                                return (<div id={info.label} key={index}>
                                    <p>
                                        <span id="strong">{info.label}</span> : {info.value}
                                    </p>
                                </div>);
                            }
                            return null;
                        })}
                    </div>
                )}
                {(Infobox && Infobox.content.length > 0) && (
                    <div id="profiles">
                        {OfficialWebsite && (
                            <Link href={OfficialWebsite} target="_blank" title='Website' rel="noreferrer">
                                <Image
                                    src={'/default.png'}
                                    width={50}
                                    height={50}
                                    alt="website icon"
                                    title="Website"
                                />
                            </Link>
                        )}
                        {Infobox.content.map((info: InfoboxProps, index: number) => {
                            if(info.data_type.endsWith('_profile')){
                                const hrefLink = "https://" + info.data_type.replace('_profile', '') + ".com/" + info.value;
                                
                                return (<Link href={hrefLink} target="_blank" rel="noreferrer" title={capitalizeFirstLetter(info.data_type.replace('_profile', ''))} key={index}>
                                    <img
                                        src={
                                            info.data_type.replace('_profile', '') === 'instagram' ?
                                            `https://www.google.com/s2/favicons?domain=${info.data_type.replace('_profile', '')}.com&sz=64` :
                                            `https://icon.horse/icon/${info.data_type.replace('_profile', '')}.com`
                                        }
                                        alt={`${info.data_type.replace('_profile', '')} icon`}
                                    />
                                </Link>);
                            }
                            
                            return null;
                        })}
                    </div>
                )}
            </div>)
        }
    </>)    
}

export default SearchContext;