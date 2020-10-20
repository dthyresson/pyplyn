# Pyplyn

[![Netlify Status](https://api.netlify.com/api/v1/badges/f8da7a70-c5fd-4744-be9d-753a03160b96/deploy-status)](https://app.netlify.com/sites/pyplyn/deploys)

# Local Dev

## Invoke Netlify Function

```
netlify functions:invoke test --port 8910
```

```
# no prompting (good for CI)
netlify functions:invoke --name myfunction --identity # invoke a specific function with netlify identity headers
netlify functions:invoke --name myfunction --no-identity # invoke a specific function without netlify identity headers

# sending payloads
netlify functions:invoke myfunction --payload '{"foo": 1}'
netlify functions:invoke myfunction --querystring "foo=1"
netlify functions:invoke myfunction --payload "./pathTo.json"
```

## Tunneling for repeater.dev Functions

`ngrok http -subdomain=XXXXX 8911`

## Logs

`tail -f logs/api-dev.log | pino-colada`


## Accented Characters

The `tagSummaries` uses the Postgres `unaccent` extensison.

This needs to be installed in Postgres. If suing Supabase postgres:

All extensions are intalled in the `extensions` schema so that your public schema stays clean.

You can solve this in two ways -

1 - Add the extensions schema to the search path for the postgres user:

`ALTER ROLE postgres SET search_path = public,extensions;`

2 - just add the "extensions" namespace to your query:

`SELECT extensions.unaccent('côtes du rhône aoc');`

## Serverless

### Deploy

`yarn rw deploy api aws_serverless`

### Dashboard

`serverless dashboard`

### Get endpoints

`serverless info`

* entryStream
* feed

### Invoke function

`serverless invoke --function test`
`serverless invoke --function enrichArticle --data '{"articleId": "ckghgyecj00060ul2rf1mos22"}'`

### on Netlify Local
`netlify functions:invoke enrichArticle --port 8910 --no-identity --payload '{"articleId": "1"}'`


### endpoints

endpoints:
  GET - https://me2vxkutca.execute-api.us-east-2.amazonaws.com/.netlify/functions/entryStream
  POST - https://me2vxkutca.execute-api.us-east-2.amazonaws.com/.netlify/functions/entryStream
  GET - https://me2vxkutca.execute-api.us-east-2.amazonaws.com/.netlify/functions/feed
  POST - https://me2vxkutca.execute-api.us-east-2.amazonaws.com/.netlify/functions/feed
  GET - https://me2vxkutca.execute-api.us-east-2.amazonaws.com/.netlify/functions/test
  POST - https://me2vxkutca.execute-api.us-east-2.amazonaws.com/.netlify/functions/test

----

# Redwood

> **WARNING:** RedwoodJS software has not reached a stable version 1.0 and should not be considered suitable for production use. In the "make it work; make it right; make it fast" paradigm, Redwood is in the later stages of the "make it work" phase.

## Getting Started
- [Tutorial](https://redwoodjs.com/tutorial/welcome-to-redwood): getting started and complete overview guide.
- [Docs](https://redwoodjs.com/docs/introduction): using the Redwood Router, handling assets and files, list of command-line tools, and more.
- [Redwood Community](https://community.redwoodjs.com): get help, share tips and tricks, and collaborate on everything about RedwoodJS.

### Setup

We use Yarn as our package manager. To get the dependencies installed, just do this in the root directory:

```terminal
yarn install
```

### Fire it up

```terminal
yarn redwood dev
```

Your browser should open automatically to `http://localhost:8910` to see the web app. Lambda functions run on `http://localhost:8911` and are also proxied to `http://localhost:8910/.redwood/functions/*`.

