"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ResultProps = {
    id: number;
    name: string;
    description: string;
    url: string;
    favicon: string | undefined;
    site_name: string;
};

const TRACKING_PARAMS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "fbclid",
    "gclid",
    "dclid",
    "msclkid"
];

const cleanUrl = (inputUrl: string) => {
    try {
        const urlObj = new URL(inputUrl);
        let modified = false;

        TRACKING_PARAMS.forEach(param => {
            if (urlObj.searchParams.has(param)) {
                urlObj.searchParams.delete(param);
                modified = true;
            }
        });

        return modified ? urlObj.toString() : inputUrl;
    } catch {
        console.error("Invalid URL:", inputUrl);
        return inputUrl;
    }
};

const SearchResult = ({ id, name, description, url, favicon, site_name }: ResultProps) => {
    const [cleanedUrl, setCleanedUrl] = useState(url);

    useEffect(() => {
        setCleanedUrl(cleanUrl(url));
    }, [url]);

    const urlObj = new URL(cleanedUrl);
    const pathname = urlObj.pathname;
    const segments = pathname.split('/').filter(Boolean);

    let displayPart = segments.length > 0 ? segments[segments.length - 1] : '';
    if (!displayPart && segments.length > 1) {
        displayPart = segments[segments.length - 2];
    }

    const displayUrl = displayPart ? `${urlObj.protocol}//${urlObj.hostname} > ${displayPart}` : `${urlObj.protocol}//${urlObj.hostname}`;

    return (
        <Link href={cleanedUrl} title={name} key={id}>
            <div className="result-searchRoot">
                <section className="top-resultInfos">
                    <img
                        src={favicon}
                        width={50}
                        height={50}
                        alt={site_name || urlObj.hostname.replace("www.", "")}
                        title={name}
                    />
                    <div id="name-url">
                        <span id="name">{site_name || urlObj.hostname.replace("www.", "")}</span>
                        <span id="url">{displayUrl}</span>
                    </div>
                </section>
                <section className="main-resultInfos">
                    <p id="page-name">{name}</p>
                    <p id="page-description">{description}</p>
                </section>
            </div>
        </Link>
    );
};

export default SearchResult;