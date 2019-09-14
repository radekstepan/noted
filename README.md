# noted

Personal document search engine.

> The problem with a personal search engine is that most of the time you do not have a well formed long-tail query in mind. You have a few keywords, mostly just one. An interface that lets you explore those keywords/tags is thus vastly superior, as it can narrow down your query step by step.

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

https://github.com/nextapps-de/flexsearch (or https://github.com/krisk/fuse). How fast would these libraries work in the browser (client-side) and how accurate would the results be?
