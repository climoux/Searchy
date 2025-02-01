'use client';

import { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation'
// Component
import GithubButton from "@/component/GithubButton";

export default function HomePage() {
    const router = useRouter();

    const [searchValue, setSearchValue] = useState<string>('');

    return (<>
        <main className="root-home">
            <section className="searchyLogoSection-root">
                <Image
                    src='/large_icon.svg'
                    width={175}
                    height={175}
                    alt="Search logo"
                    title="Searchy"
                />
                <div className="text_LogoSection">
                    <h1>Searchy</h1>
                    <h2>A simple search engine.</h2>
                </div>
            </section>
            <section className="searchSection-root">
                <div className="searchyInput-root" id="input_search" onClick={() => document.getElementById('search')?.focus()}>
                    <i className="fi fi-rr-search"></i>
                    <input
                        type='search'
                        name='search'
                        id='search'
                        tabIndex={1}
                        maxLength={255}
                        required={true}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const searchElement = document.getElementById('search');
                            if (searchElement) {
                                if(e.currentTarget.value.length > 255){
                                    searchElement.style.borderColor = "#FF8282";
                                    return;
                                }

                                searchElement.style.borderColor = "#202020";
                                setSearchValue(e.currentTarget.value.trim());
                            }
                        }}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if(e.key === "Enter"){
                                document.getElementById('searchButton')?.click();
                            }
                        }}
                    />
                    <div role="button" id="searchButton" className="button_inputRoot" tabIndex={2} onClick={() => {
                        if(searchValue !== ''){
                            router.push(`/search?q=${searchValue}`);
                        }
                    }}>
                        <span>Search it</span>
                    </div>
                </div>
                <p className="searchyPhrase-root">No ads. No trackers. Just results.</p>
            </section>
            <footer className="githubInfo-root">
                <p className="openSourceInfo-githubRoot">This is open source, feel free to get the code!</p>
                <GithubButton />
            </footer>
        </main>
    </>);
}