<div align="center">
<img src="https://raw.githubusercontent.com/spotifyts/assets/main/svg/full-nobg.svg">

# spotify.ts

</div>

## About

spotify.ts is an wrapper built around Spotify's Web API.

## Features

-   Fast
-   Object Oriented
-   Typescript, ESM, CJS support
-   Easy to Use

## Installing

```bash
npm i spotify.ts
yarn add spotify.ts
pnpm add spotify.ts
```

## Usage

First, import `Client` from the library, then instantiate a a new client with the `clientId` and `clientSecret` credentials. Then you can use the managers to make API calls to the Spotify API. For an in-built guide, visit the documentation site (see below).

### Examples:

Fetch an album:

```typescript
import { Client } from 'spotify.ts';

const client = new Client({
	clientId: 'some-id',
	clientSecret: 'some-secret'
});

client.start().then(() => {
	client.albums.fetch('0NLkVxf0PyxsXBG3EuZcJf').then(console.log);
});
```

Fetch an artist:

```typescript
import { Client } from 'spotify.ts';

const client = new Client({
	clientId: 'some-id',
	clientSecret: 'some-secret'
});

client.start().then(() => {
	client.artists.fetch('4gdMJYnopf2nEUcanAwstx').then(console.log);
});
```

## Links

-   Documentation (Coming Soon)
-   [Discord Server](https://discord.gg/qchtmGDdFr)
-   [Github Organization](https://github.com/spotifyts)
-   [NPM Page](https://npmjs.com/spotify.ts)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://fc5570.me/"><img src="https://avatars.githubusercontent.com/u/68158483?v=4?s=100" width="100px;" alt="FC"/><br /><sub><b>FC</b></sub></a><br /><a href="#code-FC5570" title="Code">💻</a> <a href="#ideas-FC5570" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-FC5570" title="Maintenance">🚧</a> <a href="#projectManagement-FC5570" title="Project Management">📆</a></td>
      <td align="center"><a href="https://prashanthr.me"><img src="https://avatars.githubusercontent.com/u/1409501?v=4?s=100" width="100px;" alt="Prashanth Rajaram"/><br /><sub><b>Prashanth Rajaram</b></sub></a><br /><a href="#code-prashanthr" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>
<<<<<<< HEAD
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
=======

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

> > > > > > > 6c90395 (chore: revamp project structure, begin updates)

<!-- ALL-CONTRIBUTORS-LIST:END -->
