# noted

Personal document search engine.

## App quickstart

```bash
$ nvm use # optional
$ npm i
$ npm start # http://localhost:3000
```

## ElasticSearch

### Docker

Setup `docker` to not run as sudo: https://docs.docker.com/install/linux/linux-postinstall/

Increase heap size: `$ sudo sysctl -w vm.max_map_count=262144`

```bash
$ docker-compose rm
$ docker-compose up
```

### Convert Google Docs to TXT

```bash
$ ./bin/docs-to-txt.js
```

### Init index

```bash
$ ./bin/init.js
```

### Import TXT

```bash
$ ./bin/import.js
```
