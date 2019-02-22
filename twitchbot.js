const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: "xauxaubot",
    password: "j5q8kv7e2xkkw7up20a729pgb7zuzj"
  },
  channels: [
    "xauxaubot",
    "fodilhaodobosque"
  ]
};

let authorized = [
    'xauxaubot'
]

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
    let user = context.username;
    let isAuthorized = authorized.includes(user); 

    if(isAuthorized) return;

    if(user == "nightbot" && msg.includes('Age')) {
        pos = getPosition(msg, '>', 2);

        if(msg.includes('minutes') || msg.includes('minute')) {
            let minutes;
            if(msg.includes('hour') || msg.includes('hours')) {
                return;
            } else {
                minutes = msg.substring(pos + 2, msg.indexOf(' minute'));
            }

            if(parseInt(minutes) < 5) {
                banUser = msg.substring(msg.indexOf('Age > ') + 6, pos - 1);
                client.say('#fodilhaodobosque', '/ban ' + banUser)
            }

        } else {
            banUser = msg.substring(msg.indexOf('Age > ') + 6, pos - 1);
            client.say('#fodilhaodobosque', '/ban ' + banUser)
        }
    } else {
        client.say('#xauxaubot', '!time ' + user);
    }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}