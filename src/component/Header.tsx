'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
// Components
import SearchInput from "./SearchInput";
import GithubButton from "./GithubButton";

const Header = ({ search }: { search: string }) => {
    const pathname = usePathname();
    const params = useSearchParams();

    const isActive = ({path}: { path: string }) => `${pathname}?q=${params.get('q')}` === path;

    return (
        <header className="searchyHeader-search">
            <section id="no-navigation">
                <Link href='/' tabIndex={1}>
                    <Image
                        src='/large_icon.svg'
                        width={50}
                        height={50}
                        alt="Search logo"
                        title="Searchy"
                    />
                </Link>
                <SearchInput searchQuery={search} />
                <div className="rightSection-header" style={{ position: 'relative', right: 'auto', marginLeft: 'auto' }}>
                    <p>No ads. No trackers. Just results.</p>
                    <GithubButton />
                </div>
            </section>
            <nav id="navigation">
                <div id="links">
                    <NavigationLinks href={'/search?q='+search} name="All" id="all" isActive={isActive({ path: "/search?q=" + search })} />
                    <NavigationLinks href={'/images?q='+search} name="Images" id="images" isActive={isActive({ path: "/images?q=" + search })} />
                    <NavigationLinks href={'/videos?q='+search} name="Videos" id="videos" isActive={isActive({ path: "/videos?q=" + search })} />
                    <NavigationLinks href={'/news?q='+search} name="News" id="news" isActive={isActive({ path: "/news?q=" + search })} />
                </div>
                <i className="fi fi-rs-settings" id="settings"></i>
            </nav>
        </header>
    )
}

const NavigationLinks = (
    { id, name, href, isActive }:
    {
        id: string;
        name: string;
        href: string;
        isActive: boolean;
    }
) => {

    return (
        <Link href={href} role="button" className={`nav-button${isActive ? ' active' : ''}`} id={id}>
            <span>{name}</span>
        </Link>
    );
};

export default Header;