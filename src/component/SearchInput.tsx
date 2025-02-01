'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchInput = ({ searchQuery }: { searchQuery: string })  => {
    const router = useRouter();

    const [searchValue, setSearchValue] = useState<string>('');
    const [hasSearchContent, setHasSearchContent] = useState<boolean>(searchQuery ? true: false);

    return (
        <div className="searchyInput-root" id="input_search" onClick={() => document.getElementById('search')?.focus()}>
            <i className="fi fi-rr-search"></i>
            <input
                type='search'
                name='search'
                id='search'
                tabIndex={2}
                maxLength={255}
                required={true}
                defaultValue={searchQuery ?? ''}
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
                        if(searchValue !== ''){
                            router.push(`/search?q=${searchValue}`);
                        }
                    }
                }}
            />
            {
                hasSearchContent && (
                    <div role="button" className="button_inputSearch" tabIndex={2}
                        onClick={() => {
                            const searchElement = document.getElementById('search') as HTMLInputElement;
                            if (searchElement) {
                                searchElement.value = "";
                                setHasSearchContent(false);
                                searchElement.focus();
                            }
                        }}
                    >
                        <i className="fi fi-rr-cross"></i>
                    </div>
                )
            }
        </div>
    )
}

export default SearchInput;