"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const GithubButton = () => {
    const router = useRouter();

    return (
        <button className="button-githubRoot" onClick={() => {
            router.push('https://github.com/Climoux/Searchy')
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
    )
}

export default GithubButton;