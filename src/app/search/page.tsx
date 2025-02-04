import { Metadata } from "next";
// Components
import SearchPage from "@/component/SearchPage";

type Props = {
    searchParams: Promise<{ q: string }>
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

export default async function Search({ searchParams }: Props) {
    const searchQuery = (await searchParams).q || '';

    return <SearchPage searchQuery={searchQuery} />;
}