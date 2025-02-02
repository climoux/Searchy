"use client";

import Link from "next/link";

type ResultProps = {
    id: number;
    name: string;
    description: string;
    url: string;
    favicon: string | undefined;
    site_name: string;
}

const SearchResult = ({ id, name, description, url, favicon, site_name }: ResultProps) => {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const segments = pathname.split('/').filter(Boolean);

    let displayPart = segments.length > 0 ? segments[segments.length - 1] : '';
    if (!displayPart && segments.length > 1) {
        displayPart = segments[segments.length - 2];
    }

    const displayUrl = displayPart ? `${urlObj.protocol}//${urlObj.hostname} > ${displayPart}` : `${urlObj.protocol}//${urlObj.hostname}`;

    return (
        <Link href={url} title={name} key={id}>
            <div className="result-searchRoot">
                <section className="top-resultInfos">
                    <img
                        src={favicon}
                        width={50}
                        height={50}
                        alt={site_name || new URL(url).hostname.replace("www.", "")}
                        title={name}
                    />
                    <div id="name-url">
                        <span id="name">{site_name || new URL(url).hostname.replace("www.", "")}</span>
                        <span id="url">{displayUrl}</span>
                    </div>
                </section>
                <section className="main-resultInfos">
                    <p id="page-name">{name}</p>
                    <p id="page-description">
                        {description}
                    </p>
                </section>
            </div>
        </Link>
    )
}

export default SearchResult;