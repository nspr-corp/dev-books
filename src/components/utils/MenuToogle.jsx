import { useState } from 'react';

export default function MenuToggle({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                onClick={toggleMenu}
                className="md:hidden fixed right-0 top-20 bg-fourth dark:bg-dark-secondary dark:text-dark-primary p-2 rounded-l-lg z-50 hover:bg-gray-700"
            >
                <span className="sr-only">Menú</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            <div
                className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 md:transition-none md:duration-0 transition duration-200 ease-in-out w-64 bg-fourth dark:bg-dark-primary lg:bg-transparent z-40`}
            >
                <div className="sticky top-20 overflow-y-auto p-4 lg:p-0">
                    {children}
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-fourth bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
