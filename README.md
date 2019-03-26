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

## TODO

- Improve progress status and upload modal
- Favoriting of documents which index keywords from search
- Bookmarks that show up on the dashboard
- Search results sorted by date (filename)
- User accounts
- Store visited status across all pages in a search
- Implement https://github.com/souhe/reactScrollbar for document body
- Use arrow keys to navigate between results
- Fix search query being unescaped and accepting Regex
