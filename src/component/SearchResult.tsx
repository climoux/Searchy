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
    return (
        <Link href={url} title={name} key={id}>
            <div className="result-searchRoot">
                <section className="top-resultInfos">
                    <img
                        src={favicon}
                        width={50}
                        height={50}
                        alt=""
                        title=""
                    />
                    <div id="name-url">
                        <span id="name">{site_name || new URL(url).hostname.replace("www.", "")}</span>
                        <span id="url">{url}</span>
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