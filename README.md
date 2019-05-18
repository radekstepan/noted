# noted

Personal document search engine.

## App quickstart

To run the Node apps locally with ES in Docker:

```bash
$ nvm use # optional
$ npm install
$ npm run dev # http://localhost:3000
```

### Production

To run the Node apps and ES in Docker:

```bash
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

### Note on ports

- `3000|80`: React app (public)
- `9000`: Express api (public only in dev mode)
- `9200`: ElasticSearch instance (public only in dev mode)

### Init/reset search index

Will reset the search index if it exists and create a new one:

```bash
$ curl --request DELETE --url 'http://localhost:3000/api/index'
```

## Troubleshooting

Setup `docker` to not run as sudo: https://docs.docker.com/install/linux/linux-postinstall/

Increase heap size: `$ sudo sysctl -w vm.max_map_count=262144`

## TODO

-  8 Render `:keyword` when it begins on a newline as a code block in the UI
- 34 Set gmail user (env) and use oauth to sign a user in
  - 13 Signin/out UI
  - 13 API
  - 13 Passport integration

- 13 Favoriting of documents with index keywords from search
-  8 Apply decay function over search results https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html
-  5 Search results sorted by date (filename)
-  5 Use arrow keys to navigate between results
-  5 Handle errors in doc modal
