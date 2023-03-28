import { debug, info } from '@actions/core';
import Parser from 'rss-parser';

interface Entry {
    title?: string;
    link?: string;
    content?: string;
    isoDate?: string;
}

const parser: Parser = new Parser();

export type RssItem = { title: string, url: string, content: string };

export async function fetchLatestPostData(rssUrl: string): Promise<Partial<RssItem>> {
    debug(`Parsing ${rssUrl}`);
    const feed = await parser.parseURL(rssUrl);

    if (feed.items.length < 1) {
        throw new Error("No items where found in the RSS list");
    }

    debug(`Found ${feed.items.length} items.`);

    const datesFiltered = feed.items.filter((i): i is Required<Entry> => !!i.isoDate);

    if (datesFiltered.length < 1) {
        throw new Error("No elements with valid ISO dates. Can not order them and get latest");
    }

    debug(`After filtering out elements without dates ${datesFiltered.length} remaining`);

    const orderedDates = datesFiltered.sort((a, b) => {
        return a.isoDate > b.isoDate ? -1 : a.isoDate < b.isoDate ? 1 : 0
    });

    const firstItem = orderedDates[0];

    info(`Latest item was created on ${firstItem.isoDate}. It's name is ${firstItem.title}`);

    return { title: firstItem.title, url: firstItem.link, content: firstItem.content };
};
