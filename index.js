'use strict';

const Discord = require('discord.js');
const client = new Discord.Client();
const conf = require('./config.json');

const emojiTable = {
    "1": ":regional_indicator_a:",
    "2": ":regional_indicator_b:",
    "3": ":regional_indicator_c:",
    "4": ":regional_indicator_d:",
    "5": ":regional_indicator_e:",
    "6": ":regional_indicator_f:",
    "7": ":regional_indicator_g:",
    "8": ":regional_indicator_h:",
    "9": ":regional_indicator_i:",
    "10": ":regional_indicator_j:",
    "11": ":regional_indicator_k:",
    "12": ":regional_indicator_l:",
    "13": ":regional_indicator_m:",
    "14": ":regional_indicator_n:",
    "15": ":regional_indicator_o:",
    "16": ":regional_indicator_p:",
    "17": ":regional_indicator_q:",
    "18": ":regional_indicator_r:",
    "19": ":regional_indicator_s:",
    "20": ":regional_indicator_t:",
    "21": ":regional_indicator_u:",
    "22": ":regional_indicator_v:",
    "23": ":regional_indicator_w:",
    "24": ":regional_indicator_x:",
    "25": ":regional_indicator_y:",
    "26": ":regional_indicator_z:"
};
let emojiPlaceholderIncrement = 1;

client.on('ready', () => {
    console.log(`* ${conf.bot_name} ready`);
});

client.on('message', (message) => {
    console.log(`* Message -\nServer: ${message.channel.guild.name}\nChannel: ${message.channel.name}\nUser: ${message.author.username}\nContent: ${message.content}`);
    
    if (message.content.startsWith(conf.command_prefix) && !message.author.bot) {
        console.log(`* Responding to message indicated by Command Prefix...`);

        createPoll(message).then((dataObj) => {
            formatPoll(dataObj).then((formattedData) => {
                message.delete();
                message.channel.send(formattedData);
            }).catch((err) => {
                message.channel.send(err);
            });;
        }).catch((err) => {
            message.channel.send(err);
        });
    }
});

function createPoll(message) {
    console.log(`* function 'createPoll()' invoked`);
    return new Promise((resolve, reject) => {
        let messageObj = {};

        let reg = /("[a-zA-Z0-9\!\?\.\(\)\{\}\[\]\'\/\_\-\+\=\|\@\#\$\%\^\&\*\~\`\<\>\,\s]+"|\([a-zA-Z0-9\!\?\.\(\)\{\}\[\]\'\/\_\-\+\=\|\@\#\$\%\^\&\*\~\`\<\>\,\s]+\))/gm;
        let messageParameters = message.content.match(reg);
        
        let tempTitle = messageParameters.shift()
        messageObj.title = tempTitle.slice(1, tempTitle.length - 1);
        messageObj.author = message.author.username;

        if (messageParameters.length < 2) {
            reject(`Insufficient number of poll options provided, you must provide more than one choice to vote on. Remember to structure your request as follows:\n\n/vote "the poll title" "first choice" "second choice" ...\n/vote "the poll title" "first choice" (thumbsup) "second choice" (thumbsdown) ...\n\nEnsure that all options are surrounded by quotations and that the title of the poll is also surrounded by quotations and precedes the first poll option.\nIf you do not select specific emojis generic ones will be inserted. If you wish to use specific emojis, put the name of the emoji only in quotations and do not include colons.`);
        }
    
        for (let i = 0; i < messageParameters.length; i++) {
            let thisParam = messageParameters[i];
            let nextParam = messageParameters[i + 1];
    
            if (thisParam.charAt(0) == '(' && thisParam.charAt(thisParam.length - 1) == ')') {
                reject(`A poll cannot begin with an emoji, structure your request as follows:\n\n/vote "the poll title" "first choice" "second choice" ...\n/vote "the poll title" "first choice" (emoji) "second choice" (emoji) ...\n\nEnsure that all options are surrounded by quotations and that the title of the poll is also surrounded by quotations and precedes the first poll option.\nIf you do not select specific emojis generic ones will be inserted. If you wish to use specific emojis, put the name of the emoji only in quotations and do not include colons.`);
            }
console.log(messageParameters);
console.log(`${i} v ${messageParameters.length}`)
            if (!(i + 1 == messageParameters.length)) {
                let nextParamLength = nextParam.length;
                let nextParamStartsWith = nextParam.charAt(0);
                let nextParamEndsWith = nextParam.charAt(nextParamLength - 1);
    
                if ((nextParamStartsWith == '(' && nextParamEndsWith == ')') || (nextParamStartsWith == ':' && nextParamEndsWith == ':')) {
                    let emojiName = nextParam.slice(1, nextParam.length - 1);
                    emojiName = ':' + emojiName + ':';
                    messageParameters[i + 1] = emojiName;
                } else {
                    messageParameters.splice(i + 1, 0, emojiTable[emojiPlaceholderIncrement]);
                    emojiPlaceholderIncrement++;
                }

                if (i + 2 == messageParameters.length - 1) {
                    messageParameters.splice(i + 3, 0, emojiTable[emojiPlaceholderIncrement]);
                    i++;
                }

                i++;
            }
            
        }
        messageObj.messageData = messageParameters;

        resolve(messageObj);
    });
}

function formatPoll(messageObj) {
    console.log(`* function 'formatPoll()' invoked`);
    return new Promise((resolve, reject) => {
        let arrEmoji = [];
        let arrOption = [];

        // split messageObj.messageData into two different arrays
        for (let i = 0; i < messageObj.messageData.length; i++) {
            i % 2 == 0 ? arrOption.push(messageObj.messageData[i]) : arrEmoji.push(messageObj.messageData[i]);
        }

        // format arrOption to remove double-quotes from the start and end of every entry
        arrOption = arrOption.map(str => str.slice(1, str.length - 1));

        let pollEmbed = new Discord.MessageEmbed();
        pollEmbed.setColor('#b22234');
        pollEmbed.setTitle(messageObj.title);
        pollEmbed.setAuthor(`Poll by ${messageObj.author}`);
        pollEmbed.setDescription(``);
        for (let i = 0; i < arrEmoji.length; i++) {
            pollEmbed.description += `${arrEmoji[i]} ${arrOption[i]}\n\n`;
        }

        resolve(pollEmbed);
    });
}

client.login(conf.token);