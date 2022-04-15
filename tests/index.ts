import { Client } from '../src';

const client = new Client({
	clientId: '93c243a3b4c94a229e7f29728fb57880',
	clientSecret: 'fd39a8419cc64adfb755019472474991'
});

void client.start().then((client) => {
	void client.searches
		.search({
			type: ['artist'],
			query: 'anuv jain'
		})
		.then(console.log);
});
