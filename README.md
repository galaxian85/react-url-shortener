# react url shortener

## Overview

A simple url shortener service built with [react](https://reactjs.org/) and [express](https://expressjs.com/).

## Functionalities

- Shorten a long url into short one.
- Validate an url is accessible before shorten it.
- Avoid duplication url shortening.

## Built With

- ReactJS
- Express
- Typescript
- Sqlite3

## Run locally

1. Clone the repository and change directory.

```
git clone https://github.com/galaxian85/react-url-shortener.git
cd react-url-shortener
```

2. Install npm dependencies

```
npm install
```

3. Compile typescript

```
npm run build
```

4. Run the app locally.

```
npm start
```

## Note

The sqlite3 database is running on "in-memory" mode.
All data will be lost after server shutdown.

If you want to save the data, goto ./src/server/db/db.ts and edit this line:

```javascript
const db = new sqlite3.Database(':memory:');
```

Change the `':memory:'` to a file path you like.
