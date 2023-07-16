const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.debug = false;

function secsToTime(num) {
    var hours = Math.floor(num / 3600);
    var minutes = Math.floor((num - (hours * 3600)) / 60);
    var seconds = num - (hours * 3600) - (minutes * 60);
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds;
}
function rainTimer() {
    const UTCPrevThunderstorm = 1668474356000;
    const UTCNow = new Date().getTime();
    const base = Math.floor((UTCNow - UTCPrevThunderstorm) / 1000);
    const thunderstorm = base % ((3850 + 1000) * 4);
    if (thunderstorm < (3850 * 4 + 1000 * 3)) {
        return (3850 * 4 + 1000 * 3 - thunderstorm);
    } else {
        return -1;
    }
}

function rainMsg(channel) {
    channel.send('<@&1082990255621292063> До начала грозы: ' + secsToTime(rainTimer()));
}

function clearChannel() {
    channel.purge()
}

function thunder() {
    remind_channel = client.channels.cache.get('1057329106204753941');
    if (rainTimer() < 30 && rainTimer() > 20) {
        rainMsg(remind_channel)
    }
    else if (rainTimer() < 60 && rainTimer() > 50) {
        rainMsg(remind_channel)
    }
    else if (rainTimer() < 300 && rainTimer() > 290) {
        rainMsg(remind_channel)
    }
    else if (rainTimer() < 600 && rainTimer() > 590) {
        rainMsg(remind_channel)
    }
    else if (rainTimer() < 1800 && rainTimer() > 1790) {
        //clearChannel(remind_channel)
        rainMsg(remind_channel)
    }
}

function thunderTest() {
    if (client.debug) {
        rainMsg(client.debugChannel);
    }
}

client.on("ready", () => {
    console.log("I am ready!");
    setInterval(thunder, 10000);
    setInterval(thunderTest, 10000);
});

client.on("messageCreate", (message) => {
    if (message.content.startsWith("isAlive?")) {
        if (message.author.id === '365916768805453834') {
            message.channel.send("yes");
        }
    }
    if (message.content.startsWith("test")) {
        if (message.author.id === '365916768805453834') {
            rainMsg(client.channels.cache.get('1057329106204753941'));
        }
    }
    if (message.content.startsWith("start debug")) {
        if (message.author.id === '365916768805453834') {
            message.channel.send('Debug Started!');
            client.debug = true;
            client.debugChannel = message.channel;
        }
    }
    if (message.content.startsWith("stop debug")) {
        if (message.author.id === '365916768805453834') {
            message.channel.send('Debug Stopped!');

            client.debug = false;
        }
    }
});

client.login("MTA4Mjk3Mjg3NDQ1MDY3NzgyMA.GqRRVK.CvN99enVmF8TmLLK4xE7MiQ9-sHPdIv717-Atw");
