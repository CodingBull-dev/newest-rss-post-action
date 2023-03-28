# Newest RSS Post

## GitHub action

Get the newest post title and link from an RSS feed.

Ideal for when you publish a new post in your blog and you want to get the url to share on social media with another action.

### Example usage
```yml
name: Deploy page

on:
  push:

jobs:
  # have your job that deploys your page
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy page
        uses: my-repo/page-deployer

  # and then add a job that publishes your deployment to the social platforms      
  publish:
    runs-on: ubuntu-latest
    # be sure to make it a dependency of the step that deploys the page
    # that way, it has some buffer time after it was deployed
    needs: [deploy]
    steps:
      - name: Fetch Post Data
        # important, add an id to your step
        id: rss
        uses: CodingBull-dev/newest-rss-post-action@main
        with:
          # make sure that the link is an RSS site
          rss: "https://mywebsite.com/feed.xml"
      # now you can spam all your channels
      - name: Publish on LinkedIn
        uses: etcetera/linkedin-publisher
        with:
          message: "My new #post ${{ steps.rss.outputs.title }} can be read in ${{ steps.rss.outputs.url }}"
      - name: Publish on Twitter
        uses: etcetera/twitter-spammer
        with:
          message: "Hey Elon, read my #post ${{ steps.rss.outputs.title }} in ${{ steps.rss.outputs.url }}"
      - name: Get downvoted on reddit
        uses: etcetera/reddit-bots
        with:
          title: "New post: ${{ steps.rss.outputs.title }}"
          link: ${{ steps.rss.outputs.url }}
```

## Inputs

It only needs one input: `rss`.

This must be an url that points to an rss site. Add the **whole url**.

## Development

`npm ci` to install dependencies.
Build using `npm run build` and execute the compiled code with `node dist/index.js`.

There is also a `Dockerimage`.
