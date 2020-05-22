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
    "19": ":regional_indicator_z:"
}
let emojiPlaceholderIncrement = 1;

client.on('ready', () => {
    console.log(`* ${conf.bot_name} ready`);
});

client.on('message', (message) => {
    console.log(`* Message -\nServer: ${message.channel.guild.name}\nChannel: ${message.channel.name}\nUser: ${message.author.username}\nContent: ${message.content}`);
    
    if (message.content.startsWith(conf.command_prefix) && !message.author.bot) {
        console.log(`* Responding to message indicated by Command Prefix...`);
        createPoll(message).then((data) => {
            formatPoll(data).then((formattedData) => {
                message.channel.send(formattedData);
            });
        });
    }
});

function createPoll(message) {
    console.log(`* function 'createPoll()' invoked`);
    return new Promise((resolve, reject) => {
        let messageParameters = message.content.split(' ');
        messageParameters.shift();
    
        for (let i = 0; i < messageParameters.length; i++) {
            console.log(`Begin loop over messageParameters - i = ${i}; length = ${messageParameters.length}`);
            let thisParam = messageParameters[i];
            let nextParam = messageParameters[i + 1];
    
            if (!(i + 1 == messageParameters.length)) {
                console.log(`Comparing ${thisParam} and ${nextParam}`);
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
                    console.log(`End loop - i = ${i}; length = ${messageParameters.length}`)
    
                    if (i + 2 == messageParameters.length - 1) {
                        messageParameters.splice(i + 3, 0, emojiTable[emojiPlaceholderIncrement]);
                        i++;
                    }
                }
                i++;
            }
            
        }

        resolve(messageParameters);
    });
}

function formatPoll(data) {
    console.log(`* function 'formatPoll()' invoked`);
    return new Promise((resolve, reject) => {
        let arrEmoji = [];
        let arrOption = [];

        for (let i = 0; i < data.length; i++) {
            i % 2 == 0 ? arrOption.push(data[i]) : arrEmoji.push(data[i]);
        }

        let pollEmbed = new Discord.MessageEmbed();
        pollEmbed.setDescription(``);
        for (let i = 0; i < arrEmoji.length; i++) {
            pollEmbed.description += `${arrEmoji[i]} ${arrOption[i]}\n\n`;
        }

        resolve(pollEmbed);
    });
}

client.login(conf.token);