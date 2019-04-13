# noted

Personal document search engine.

## App quickstart

```bash
$ nvm use # optional
$ npm install
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up # http://localhost:3000
```

### Init/reset search index

```bash
$ curl --request DELETE --url 'http://localhost:3000/api/index'
```

## Troubleshooting

Setup `docker` to not run as sudo: https://docs.docker.com/install/linux/linux-postinstall/

Increase heap size: `$ sudo sysctl -w vm.max_map_count=262144`

## TODO

- 13 Favoriting of documents with index keywords from search
-  8 Bookmarks that show up on the dashboard
-  8 Apply decay function over search results https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html
-  5 Search results sorted by date (filename)
- 13 User accounts
-  5 Use arrow keys to navigate between results
-  5 Fix search query being unescaped and accepting Regex
-  5 Show "time ago" in search results titles
- 13 Compare with Lunr with view of making this into a standalone WebView app
- 13 Make use of https://undraw.co/illustrations icons using main color
-  5 Make router work when going back in history, perhaps https://router5.js.org/integration/with-redux
-  5 Fix dragging a text selection and file upload popping up
