'use client';

import Image from "next/image";
import { redirect } from 'next/navigation';
// Components
import Input from "@/component/SearchInput";

export default function HomePage() {
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
                    />
                    <div role="button" className="button_inputRoot" tabIndex={2}>
                        <span>Search it</span>
                    </div>
                </div>
                <p className="searchyPhrase-root">No ads. No trackers. Just results.</p>
            </section>
            <footer className="githubInfo-root">
                <p className="openSourceInfo-githubRoot">This is open source, feel free to get the code!</p>
                <button className="button-githubRoot" onClick={() => {
                    redirect('https://github.com/Climoux/Searchy')
                }}>
                    <Image
                        src="/github.svg"
                        width={30}
                        height={30}
                        alt="Github logo"
                        title="Github"
                    />
                    <span>Get the code on GitHub</span>
                </button>
            </footer>
        </main>
    </>);
}