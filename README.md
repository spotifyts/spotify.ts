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

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
