"use client";

import { useEffect, useState } from 'react';

const LoadingResult = () => {
    const [widths, setWidths] = useState({
        name: '0%',
        url: '0%',
        pageName: '0%',
        descriptions: [] as string[]
    });

    useEffect(() => {
        setWidths({
            name: `${Math.floor(Math.random() * 91) + 10}%`,
            url: `${Math.floor(Math.random() * 91) + 20}%`,
            pageName: `${Math.floor(Math.random() * 91) + 10}%`,
            descriptions: Array.from({ length: Math.floor(Math.random() * 4) + 1 }).map((_, index, array) => 
                index === array.length - 1 ? `${Math.floor(Math.random() * 91) + 10}%` : '100%'
            )
        });
    }, []);

    return (
        <div className="result-searchRoot">
            <section className="top-resultInfos">
                <div id="favicon" className="_loading" style={{ width: 50, height: 46, borderRadius: '50%', border: '2px solid #303030', }} />
                <div id="name-url">
                    <div id="name" className="_loading" style={{ width: widths.name, height: 25, borderRadius: 10, marginBottom: 5 }} />
                    <div id="url" className="_loading" style={{ width: widths.url, height: 15, borderRadius: 10 }} />
                </div>
            </section>
            <section className="main-resultInfos">
                <div id="page-name" className="_loading" style={{ width: widths.pageName, height: 30, borderRadius: 20, marginBottom: 5, marginTop: 20 }} />
                {widths.descriptions.map((width, index) => (
                    <div key={index} id={"page-description-"+index} className="_loading" style={{ width, height: 15, borderRadius: 10, marginBottom: 5 }} />
                ))}
            </section>
        </div>
    )
}

export default LoadingResult;