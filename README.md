Sanity + Next.js frontend example
===

DEMO 👉 https://sanity-example-frontend.now.sh

This is an example [Sanity](https://www.sanity.io/docs) powered frontend for the movies database dataset using [Next.js](https://github.com/zeit/next.js/).

## Prerequisites
You will need [Node.js](https://nodejs.org) version 6.0 or greater installed on your system.

## Setup

Get the code by either cloning this repository using git

    > git clone https://github.com/sanity-io/example-frontend-next-js.git

... or [downloading source code](https://github.com/sanity-io/example-frontend-next-js/archive/master.zip) code as a zip archive.

Once downloaded, open the terminal in the project directory, and install dependencies with:

    > npm install

If you're running your own Sanity project with the movie dataset, remember to enable localhost:3000 in your CORS Origins settings:

    > sanity cors add http://localhost:3000

Then start the example app with

    > npm run dev

The app should now be up and running at http://localhost:3000