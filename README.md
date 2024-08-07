<div align="center">
  <img src="https://raw.githubusercontent.com/spotifyts/assets/main/svg/full-nobg.svg" alt="spotify.ts logo">

  # spotify.ts
</div>

## About

`spotify.ts` is a TypeScript wrapper for Spotify's Web API, designed to make interacting with Spotify's services easy and efficient.

## Features

- **Fast Performance**
- **Object-Oriented Design**
- **Support for TypeScript, ESM, and CJS**
- **User-Friendly Interface**

## Installation

You can install `spotify.ts` using one of the following package managers:

```bash
npm install spotify.ts
```

```bash
yarn add spotify.ts
```

```bash
pnpm add spotify.ts
```

## Usage

To get started, import the `Client` class from the library and create a new instance with your `clientId` and `clientSecret`. You can then use the various managers to interact with the Spotify API. For more detailed instructions, visit the documentation site (link coming soon).

### Examples

**Fetch an Album:**

```typescript
import { Client } from 'spotify.ts';

const client = new Client({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret'
});

client.start().then(() => {
  client.albums.fetch('0NLkVxf0PyxsXBG3EuZcJf').then(console.log);
});
```

**Fetch an Artist:**

```typescript
import { Client } from 'spotify.ts';

const client = new Client({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret'
});

client.start().then(() => {
  client.artists.fetch('4gdMJYnopf2nEUcanAwstx').then(console.log);
});
```

## Links

- [Documentation (Coming Soon)](https://github.com/spotifyts/spotify.ts)
- [Discord Server](https://discord.gg/qchtmGDdFr)
- [GitHub Organization](https://github.com/spotifyts)
- [NPM Page](https://npmjs.com/spotify.ts)

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
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
