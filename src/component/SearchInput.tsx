'use client';

import { useState } from "react";

const SearchInput = ({ searchQuery }: { searchQuery: string })  => {
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