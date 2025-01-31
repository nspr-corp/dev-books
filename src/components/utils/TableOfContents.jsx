import { useEffect, useState } from 'react';

const TableOfContents = ({ headings }) => {
    const [active, setActive] = useState(true);

    return (
        <div className="sticky top-20 max-h-[calc(100vh-5rem)]">
            <h3 className="text-lg font-semibold mb-4">Contenido</h3>
            <ul className="space-y-2">
                {headings.map(({ text, slug }) => (
                    <li key={slug}>
                        <a
                            href={`#${slug}`}
                            className={`block transition-all duration-300 ease-in-out
                                ${active === slug
                                    ? 'text-blue-500 font-medium translate-x-1 border-l-8 border-blue-500 pl-2'
                                    : 'text-black dark:text-white hover:text-blue-400'
                                }`}
                            onClick={e => {
                                e.preventDefault();
                                const element = document.getElementById(slug);
                                if (element) {
                                    element.scrollIntoView({
                                        behavior: 'smooth',
                                    });
                                    window.history.pushState(
                                        null,
                                        '',
                                        `#${slug}`
                                    );
                                }
                            }}
                        >
                            {text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TableOfContents;