import { Metadata } from "next";
import axios from "axios";
// Components
import SearchResult from "@/component/SearchResult";
import Header from "@/component/Header";

type Props = {
    searchParams: Promise<{ q: string }>
}

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
    openGraph: {
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
}

export async function generateMetadata(
    { searchParams }: Props
  ): Promise<Metadata> {
    const searchQuery = (await searchParams).q
         
    return {
        title: `${searchQuery} - Searchy`,
        openGraph: {
            title: `${searchQuery} - Searchy`
        },
        twitter: {
            title: `${searchQuery} - Searchy`
        }
    }
}

export default async function SearchPage({ searchParams }: Props) {
    const search = (await searchParams).q;
    // Fetching data
    const data = await axios.get('https://searchy.wevaw.com/search', { params: { q: search } });
    const results = data.data.result;

    return (<>
        <main className="root-search">
            <Header search={search} />
            <section className="resultsSection-root">
                {
                    results !== null ? (
                        results.map((result: ResultsProps) => {
                            const favicon = result.icons
                                ?.filter(icon => icon.sizes && icon.sizes.match(/^\d+x\d+$/))
                                .sort((a, b) => {
                                    const sizeA = a.sizes ? Math.max(...a.sizes.split('x').map(Number)): 0;
                                    const sizeB = b.sizes ? Math.max(...b.sizes.split('x').map(Number)): 0;
                                    return sizeB - sizeA;
                                })[0]?.link || (result.icons && result.icons[0]?.link);

                            return (
                                <SearchResult
                                    key={result.id}
                                    id={result.id}
                                    name={result.name}
                                    description={result.description}
                                    url={result.url}
                                    favicon={favicon}
                                    site_name={result.openGraph?.site_name ? result.openGraph.site_name: ''}
                                />
                            );
                        })
                    ): (<>
                    
                    </>)
                }
            </section>
        </main>
    </>);
}