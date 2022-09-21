outlets = 2;

const maxApi = require("max-api");
const keys = require("./keys.json");

const tmi = require('tmi.js');

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: 'sports_wear',
		password: keys.token
	},
	channels: [ 'sports_wear' ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	maxApi.outlet(message);
	
	/*
	// Ignore echoed messages.
	if(self) return;

	if(message.toLowerCase() === '!hello') {
		// "@alca, heya!"
		client.say(channel, `@${tags.username}, heya!`);
	}
	*/
});
		
															