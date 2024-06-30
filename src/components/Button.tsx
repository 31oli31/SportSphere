import React, { FormEventHandler } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import Link from "next/link";

interface ButtonLinkProps {
    link: string;
    className?: string;
    children: React.ReactNode;
    variant?: "outlined" | "filled";
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ link, className, children, variant = "filled" }) => {

    const buttonClass = classNames(
        className,
        {
            'text-white': variant === 'filled',
            'text-black border border-black': variant === 'outlined',
            'bg-black hover:bg-gray-700  dark:bg-white dark:hover:bg-gray-200': variant === 'filled',
            'hover:bg-white hover:text-black hover:border-gray-700 hover:bg-gray-50  dark:hover:bg-black dark:hover:text-white': variant === 'outlined',
            'font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none': true,
        }
    );


    return (
        <Link href={link}
            className={buttonClass}>
            {children}
        </Link>
    );
};

interface ButtonComponentProps {
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    children: React.ReactNode;
    variant?: "outlined" | "filled";
    color?: string;
}

const Button: React.FC<ButtonComponentProps> = ({ onClick, className, children, type, variant = "filled", color = "black" }) => {
    const buttonClass = classNames(
        className,
        {
            'text-white': variant === 'filled',
            'text-black border border-black': variant === 'outlined' && color === 'black',
            'bg-black hover:bg-gray-700 dark:bg-white dark:hover:bg-gray-200': variant === 'filled',
            'hover:bg-white hover:text-black hover:border-gray-700 dark:hover:bg-black dark:hover:text-white': variant === 'outlined' && color === 'black',
            'bg-red-800 hover:bg-red-600': variant === 'filled' && color === 'red',
            'border border-red-700  text-red-700 hover:bg-white hover:text-red-600 hover:border-red-600 dark:hover:bg-red dark:hover:text-white': variant === 'outlined' && color === 'red',
            'font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none': true,
        }
    );

    return (
        <button
            className={buttonClass}
            type={type ?? 'button'}
            onClick={ onClick}
        >
            {children}
        </button>
    );
};

export {ButtonLink, Button};

export default ButtonLink;
