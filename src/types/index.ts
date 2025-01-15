export interface OptionNav {
    title: string;
    href: string;
};

export interface Article {
    title: string;
    author: string;
    publishDate: Date;
    category: string;
    tags: string[];
    slug: string;
    githubUrl?: string;
    linkedinUrl: string;
    authorImage?: string;
    level?: string;
    readingTime?: string;
    status?: string;
}
