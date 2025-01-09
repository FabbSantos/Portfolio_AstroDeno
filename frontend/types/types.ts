export interface Work {
    id: number;
    title: string;
    fadeText: string;
    body: string;
    image: string;
    href: string;
    alt: string;
    flexType: string;
    category: string;
    live: boolean;
    tags: string[];
    type: string | string[];
}