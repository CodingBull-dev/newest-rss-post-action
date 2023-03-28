import { getInput, setFailed, setOutput } from "@actions/core";
import { fetchLatestPostData } from "./rssParser";

async function runAction() {
    const rssUrl = getInput("rss", { required: true });
    if (!rssUrl) {
        return setFailed("Missing input 'rss'");
    }
    try {
        const { title, url } = await fetchLatestPostData(rssUrl);
        setOutput("title", title);
        setOutput("url", url);
    }
    catch (error) {
        setFailed(error as Error);
    }
}

runAction();
