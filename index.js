'use strict';

const emojiMap = require('emoji-name-map');
const Discord = require('discord.js');
const client = new Discord.Client();

const conf = require('./config.json');

const emojiTable = {
    "1": ":🇦:",
    "2": ":🇧:",
    "3": ":🇨:",
    "4": ":🇩:",
    "5": ":🇪:",
    "6": ":🇫:",
    "7": ":🇬:",
    "8": ":🇭:",
    "9": ":🇮:",
    "10": ":🇯:",
    "11": ":🇰:",
    "12": ":🇱:",
    "13": ":🇲:",
    "14": ":🇳:",
    "15": ":🇴:",
    "16": ":🇵:",
    "17": ":🇶:",
    "18": ":🇷:",
    "19": ":🇸:",
    "20": ":🇹:",
    "21": ":🇺:",
    "22": ":🇻:",
    "23": ":🇼:",
    "24": ":🇽:",
    "25": ":🇾:",
    "26": ":🇿:"
};

client.on('ready', () => {
    client.user.setPresence({
        activity: {
            type: conf.bot_status_type,
            name: conf.bot_status_description
        }
    }).catch(console.error);

    console.log(`${conf.bot_name} ready`);
});

client.on('message', (message) => {
    console.log(`Message received:\n${message.content}`)

    // switch (message.channel.type) {
    //     case 'text':
            
    //         break;
    //     case 'dm':

    //         break;
    //     default:
    //         break;
    // }

    // messages in guild chat
    if (message.channel.type == 'text') {

        // detect message that is a poll request and create a poll
        if (message.content.startsWith(conf.command_prefix) && !message.author.bot) {
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

        // detect message that is a poll created by Democracy Bot and react to it
        if (message.embeds.length > 0 && message.embeds[0].author.name.slice(0, 7) == `Poll by` && (message.author.username == `Democracy Bot (BETA)` || message.author.username == `Democracy Bot TEST`) && message.author.bot) {
            reactToPoll(message).then((reactions) => {
                for (let i = 0; i < reactions.length; i++) {
                    message.react(reactions[i]);
                }
            }).catch((err) => {
                message.channel.send(err);
            });
            
        }

    }

    // messages that are DMs
    if (message.channel.type == 'dm') {

        // respond to DMs asking for help
        if ((!message.content.startsWith(conf.command_prefix)) && !message.author.bot) {
            message.channel.send(conf.help_text.how_to_use);
        }

        // send poll
        if (message.content.startsWith(conf.command_prefix) && !message.author.bot) {
            createPoll(message).then((dataObj) => {
                formatPoll(dataObj).then((formattedData) => {
                    message.channel.send(formattedData);
                    message.channel.send(conf.help_text.dm_help_notes);
                }).catch((err) => {
                    message.channel.send(err);
                });
            }).catch((err) => {
                message.channel.send(err);
            });
        }

    }

    // if (message.content.startsWith('test')) {
    //     console.log(`* test registered`);
    //     test(message).then((data) => {
    //         message.channel.send(data);
    //     });
    // }

    // if (message.embeds.length > 0 && message.embeds[0].author.name.slice(0, 7) == `Poll by` && message.author.username == `Democracy Bot` && message.author.bot && message.embeds[0].title == `Test Title 69`) {
    //     console.log(`* sending test reactions`);
    //     testReaction(message).then((reactions) => {
    //         for (let i = 0; i < reactions.length; i++) {
    //             message.react(reactions[i]);
    //         }
    //     });
    // }
});

function createPoll(message) {
    console.log(`* function 'createPoll()' invoked`);
    return new Promise((resolve, reject) => {
        let messageObj = {};
        messageObj.message = message;

        if (message.content == '/vote') {
            reject(conf.help_text.vote + '\n\n' + conf.help_text.how_to_use);
        }

        let reg = /("[a-zA-Z0-9\!\?\.\(\)\{\}\[\]\'\/\_\-\+\=\|\@\#\$\%\^\&\*\~\`\<\>\,\:\;\s]+"|\([a-zA-Z0-9\!\?\.\(\)\{\}\[\]\'\/\_\-\+\=\|\@\#\$\%\^\&\*\~\`\<\>\,\:\;\s]+\))/gm;
        let messageParameters = message.content.match(reg);
        
        let tempTitle = messageParameters.shift()
        messageObj.title = tempTitle.slice(1, tempTitle.length - 1);
        messageObj.author = message.author.username;

        if (messageParameters.length < 2) {
            reject(conf.error_text.not_enough_options + `\nYou typed:\n\n${messageObj.message.content}`);
        }
    
        let emojiPlaceholderIncrement = 1;
        for (let i = 0; i < messageParameters.length; i++) {
            let thisParam = messageParameters[i];
            let nextParam = messageParameters[i + 1];
    
            if (thisParam.charAt(0) == '(' && thisParam.charAt(thisParam.length - 1) == ')') {
                reject(conf.error_text.begin_with_emoji + conf.error_text.message_syntax + `\nYou typed:\n\n${messageObj.message.content}`);
            }
            
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

        // validate for too many options
        if (messageParameters.length > 40) {
            reject(conf.error_text.too_many_reactions);
        }

        console.log(`* resolving 'createPoll()'`);
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
        
        // validate number of arguments
        if (arrEmoji.length != arrOption.length) {
            reject(conf.error_text.generic_error + conf.error_text.message_syntax + `\nYou typed:\n\n${messageObj.message.content}`);
        }

        // NOTE - this would be good to break out into a function to run a certain way in different channels
        arrEmoji = arrEmoji.map(str => str.slice(1, str.length - 1));
        for (let i = 0; i < arrEmoji.length; i++) {
            let emojiObj;
            if (messageObj.message.channel.type != 'dm') { // don't look for custom emojis if DM
                emojiObj = messageObj.message.guild.emojis.cache.find(emoji => emoji.name === arrEmoji[i]);
            }
            if (emojiObj && messageObj.message.channel.type != 'dm') { // get emoji object for custom emoji
                arrEmoji[i] = emojiObj;
            } else if (arrEmoji[i].length == 2 && arrEmoji[i] != '+1' && arrEmoji[i] != '-1') { // is regional indicator for default fill
                arrEmoji[i] = arrEmoji[i];
            } else { // is not custom emoji or regional indicator, get unicode
                arrEmoji[i] = emojiMap.get(arrEmoji[i]);
            }
        }
        
        // validate that all emojis exist and were spelled correctly
        for (let i = 0; i < arrEmoji.length; i++) {
            if (arrEmoji[i] === undefined) {
                reject(conf.error_text.bad_emoji + `\nYou typed:\n\n${messageObj.message.content}`);
            }
        }

        arrOption = arrOption.map(str => str.slice(1, str.length - 1));

        let pollEmbed = new Discord.MessageEmbed();
        pollEmbed.setColor('#b22234');
        pollEmbed.setTitle(messageObj.title);
        pollEmbed.setAuthor(`Poll by ${messageObj.author}`);
        pollEmbed.setDescription(``);
        for (let i = 0; i < arrEmoji.length; i++) {
            pollEmbed.description += `${arrEmoji[i]} ${arrOption[i]}\n\n`;
        }

        console.log(`* resolving 'formatPoll()'`);
        resolve(pollEmbed);
    });
}

function reactToPoll(message) {
    console.log(`* function 'reactToPoll()' invoked`);
    return new Promise((resolve, reject) => {
        let messageDescriptionStr = message.embeds[0].description;

        let regEmoji = /^[\S]+/gm;
        let reactions = messageDescriptionStr.match(regEmoji);

        let regEmojiID = /:[a-zA-Z0-9]+>/;
        reactions = reactions.map((str) => {
            if (str[0] == `<`) { // is a custom emoji, split out ID
                let emojiID = str.match(regEmojiID);
                emojiID = emojiID[0].slice(1, emojiID[0].length - 1);
                return emojiID;
            } else { // is not a custom emoji, keep unicode
                return str;
            }
        });

        console.log(`* resolving 'reactToPoll()'`);
        reactions.length < 1 ? reject(`Error reacting to poll - No emojis detected.`) : resolve(reactions);
    });
}

function test(message) {
    return new Promise((resolve, reject) => {
        let dump = emojiMap;

        let pollEmbed = new Discord.MessageEmbed();
        pollEmbed.setColor('#b22234');
        pollEmbed.setTitle('Test Title 69');
        pollEmbed.setAuthor(`Poll by ${message.author.username}`);
        pollEmbed.setDescription(dump.get('slightly_frowning_face'));

        resolve(pollEmbed);
    });
}

function testReaction(message) {
    return new Promise((resolve, reject) => {
        let arrReactions = [`<:7657_doomer:713807453619355690>`, 'smile'];

        let reg = /:[a-zA-Z0-9]+>/;
        arrReactions = arrReactions.map((str) => {
            if (str[0] == `<`) {
                console.log(str);
                let s = str.match(reg);
                console.log(s[0]);
                return s[0].slice(1, s[0].length - 1);
            } else {
                let e = emojiMap.get(str)
                return e;
            }
            
        });

        console.log(arrReactions);
        resolve(arrReactions);
    });
}

client.login(conf.token);

