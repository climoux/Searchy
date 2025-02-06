'use client';

import { useEffect, useState } from "react";
import axios from "axios";
// Components
import SearchResult from "@/component/SearchResult";
import Header from "@/component/Header";
import LoadingResult from "./LoadingResult";
import SearchContext from "./SearchContext";

type ResultsProps = {
    id: number;
    name: string;
    description: string;
    url: string;
    icons: {
        link: string | undefined;
        type: string | null;
        sizes: string | null;
    }[];
    opengraph: {
        name: string;
        description: string;
        image: string;
        url: string;
        type: string;
        site_name: string;
    };
    canonical: string;
    alternates: {
        link: string | undefined;
        locale: string;
    }[];
    text: [];
    links: [];
    responseTime: number;
};

type ContextProps = {
    Abstract: string;
    AbstractSource: string;
    AbstractText: string;
    AbstractURL: string;
    Answer: string;
    AnswerType: string;
    Definition: string;
    DefinitionSource: string;
    DefinitionURL: string;
    Entity: string;
    Heading: string;
    Image: string;
    ImageHeight: number;
    ImageIsLogo: number;
    ImageWidth: number;
    Infobox: {
        content: [],
        meta: [],
    };
    OfficialDomain: string | undefined;
    OfficialWebsite: string | undefined;
    Redirect: string;
    RelatedTopics: [];
    Results: [];
    Type: string;
    meta: [];
}

const SearchPage = ({ searchQuery }: { searchQuery: string }) => {
    const [results, setResults] = useState<ResultsProps[] | null>(null);
    const [context, setContext] = useState<ContextProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);

            try {
                const { data } = await axios.get('https://searchy.wevaw.com/search', { params: { q: searchQuery } });
                const contextData = await axios.get('https://api.duckduckgo.com/', { params: { q: searchQuery, format: 'json' } });

                setResults(data.result || []);
                setContext(contextData.data || null);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setResults([]);
                setContext(null);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [searchQuery]);

    // Favicon
    const [favicons, setFavicons] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        if (results) {
            results.forEach((result) => {
                let favicon =
                    result.icons
                        ?.filter((icon) => icon.sizes && icon.sizes.match(/^\d+x\d+$/))
                        .sort((a, b) => {
                            const sizeA = a.sizes ? Math.max(...a.sizes.split('x').map(Number)) : 0;
                            const sizeB = b.sizes ? Math.max(...b.sizes.split('x').map(Number)) : 0;
                            return sizeB - sizeA;
                        })[0]?.link ||
                    (result.icons && result.icons[0]?.link) ||
                    '/default.png';

                const checkFavicon = async () => {
                    try {
                        const response = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(favicon)}`);
                        if(response.status !== 200 || !(response.data.status.content_type as string).startsWith('image/')){
                            favicon = '/default.png';
                        }
                    } catch {
                        favicon = '/default.png';
                    }

                    setFavicons((prevFavicons) => ({ ...prevFavicons, [result.id]: favicon }));
                };

                checkFavicon();
            });
        }
    }, [results]);

    return (
        <main className="root-search" style={{ overflow: loading ? 'hidden': 'auto' }}>
            <Header search={searchQuery} />
            <div style={{ display: 'flex' }}>
                <section className="resultsSection-root">
                    {loading ? (<>
                        <LoadingResult />
                        <LoadingResult />
                        <LoadingResult />
                        <LoadingResult />
                    </>) : results && results.length > 0 ? (
                        results.map((result) => {
                            const favicon = favicons[result.id] || '/default.png';

                            return (
                                <SearchResult
                                    key={result.id}
                                    id={result.id}
                                    name={result.name}
                                    description={result.description}
                                    url={result.url}
                                    favicon={favicon}
                                    site_name={result.opengraph?.site_name ? result.opengraph.site_name : ''}
                                />
                            );
                        })
                    ) : (
                        <p>No results.</p>
                    )}
                </section>
                <section className="contextSection-root">
                    {loading ? (<></>)
                    : context ? (
                        <SearchContext
                            AbstractText={context.AbstractText}
                            AbstractSource={context.AbstractSource}
                            AbstractURL={context.AbstractURL}
                            Heading={context.Heading}
                            ImageContext={context.Image}
                            Infobox={context.Infobox}
                            OfficialWebsite={context.OfficialWebsite}
                            RelatedTopics={context.RelatedTopics}
                        />
                    )
                    : (<></>)}
                </section>
            </div>
        </main>
    );
};

export default SearchPage;