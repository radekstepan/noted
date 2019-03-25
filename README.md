# noted

Personal document search engine.

## App quickstart

```bash
$ nvm use # optional
$ npm i
$ docker-compose up # http://localhost:3000
```

### Init/reset search index

```bash
$ curl --request DELETE --url 'http://localhost:3000/api/index'
```

## Troubleshooting

Setup `docker` to not run as sudo: https://docs.docker.com/install/linux/linux-postinstall/

Increase heap size: `$ sudo sysctl -w vm.max_map_count=262144`
