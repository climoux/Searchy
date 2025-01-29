"use client";

import { CSSProperties, MouseEvent as ReactMouseEvent, useEffect, useState } from "react";

interface InputProps {
    options: {
        tabIndex: number,
        placeholder: string | null,
        label: string | null,
        defaultValue: string | null,
        required: boolean,
        style?: CSSProperties,
        onFocus?: () => void,
        onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
    };
    button?: {
        type: 'icon' | 'string',
        icon: string,
        string: string,
        tabIndex: number,
        onClick?: (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void,
        style?: CSSProperties,
    };
    onInput: (event: React.FormEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ options, button, onInput }) => {
    // States
    const [value, setValue] = useState<string>('');
    const [borderColor, setBorderColor] = useState<string>('#303030');
    const [color, setColor] = useState<string>('#9A9A9A');

    useEffect(() => {
        setBorderColor('#303030');
        setColor('#9A9A9A');
    }, []);

    return (
        <div className="searchyInput-root" id="input_search" onClick={() => document.getElementById('search')?.focus()} style={{borderColor: borderColor, ...options.style}}>
            <i className="fi fi-rr-search"></i>
            <input
                type='search'
                name='search'
                id='search'
                placeholder={options.placeholder}
                tabIndex={options.tabIndex}
                defaultValue={options.defaultValue ?? ''}
                required={options.required}
                onKeyDown={(e) => {
                    if(e.key === "Enter"){
                        const button = document.getElementById("input_search")?.querySelector('.button_inputRoot');
                        if(button !== null){
                            (button as HTMLElement).click();
                        }
                    }
                }}
                onInput={(e) => {
                    const currentTarget = e.currentTarget as HTMLInputElement;

                    onInput(e as React.FormEvent<HTMLInputElement>);
                    // DEFAULT
                    if(currentTarget.value === null || currentTarget.value.length === 0){
                        setValue('');
                        setBorderColor('#e35959');
                        setColor('#e35959');
                    }else {
                        setValue(currentTarget.value);
                        setBorderColor('#303030');
                        setColor('#9A9A9A');
                    }
                }}
                style={{ width: button ? 'calc(100% - 40px)': '100%' }}
                onFocus={options.onFocus}
                onBlur={options.onBlur}
            />
            {options.label !== null && <label style={{color: color}}>{options.label}</label>}
            {
                button && (
                    button.type === 'icon' ? (
                        <div role="button" className="button_inputRoot" tabIndex={button.tabIndex} onClick={button.onClick} style={button.style}>
                            <i className={"fi fi-"+button.icon} />
                        </div>
                    ) : (
                        <div role="button" className="button_inputRoot" tabIndex={button.tabIndex} style={button.style}>
                            <span>{button.string}</span>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default Input;