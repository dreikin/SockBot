'use strict';
/**
 * Mafiabot plugin
 *
 * Watches for @vote mentions and replies with a canned response
 *
 * @module mafiabot
 * @author Accalia, Dreikin
 * @license MIT
 */

const engine = require('tingodb')();

const internals = {
    browser: null,
    configuration: exports.defaultConfig,
    timeouts: {},
    interval: null,
    events: null,
    db: null
};
exports.internals = internals;

/**
 * Default plugin configuration
 */
exports.defaultConfig = {
    /**
     * Required delay before posting another reply in the same topic.
     *
     * @default
     * @type {Number}
     */
    cooldown: 0 * 1000,
    /**
     * Messages to select reply from.
     *
     * @default
     * @type {string[]}
     */
    messages: [
        '@%username% has voted for @%???%',
    ],
    db: './mafiadb'
};

/**
 * Respond to @mentions
 *
 * @param {external.notifications.Notification} _ Notification recieved (ignored)
 * @param {external.topics.Topic} topic Topic trigger post belongs to
 * @param {external.posts.CleanedPost} post Post that triggered notification
 */
exports.mentionHandler = function mentionHandler(_, topic, post) {
    const index = Math.floor(Math.random() * internals.configuration.messages.length),
        reply = internals.configuration.messages[index].replace(/%(\w+)%/g, (__, key) => {
            let value = post[key] || '%' + key + '%';
            if (typeof value !== 'string') {
                value = JSON.stringify(value);
            }
            return value;
        }).replace(/(^|\W)@(\w+)\b/g, '$1<a class="mention">@&zwj;$2</a>');
    internals.browser.createPost(topic.id, post.post_number, reply, () => 0);
};

exports.joinHandler = function joinHandler(command) {
    const text = 'topic: ' + command.post.topic_id + '\n'
             + 'post: ' + command.post.post_number + '\n'
             + 'input: `' + command.input + '`\n'
             + 'command: `' + command.command + '`\n'
             + 'args: `' + command.args + '`\n'
             + 'mention: `' + command.mention + '`\n'
             + 'post:\n[quote]\n' + command.post.cleaned + '\n[/quote]';
    internals.browser.createPost(command.post.topic_id, command.post.post_number, text, () => 0);
};

exports.voteHandler = function voteHandler(command) {
    const text = '@' + command.post.username + ' voted for ' + command.args[0]
             + ' in post #<a href="https://what.thedailywtf.com/t/'
             + command.post.topic_id + '/' + command.post.post_number + '">'
             + command.post.post_number + '</a>.\n\n'
             + 'Vote text:\n[quote]\n' + command.input + '\n[/quote]';
    internals.browser.createPost(command.post.topic_id, command.post.post_number, text, () => 0);
};

/**
 * Prepare Plugin prior to login
 *
 * @param {*} plugConfig Plugin specific configuration
 * @param {Config} config Overall Bot Configuration
 * @param {externals.events.SockEvents} events EventEmitter used for the bot
 * @param {Browser} browser Web browser for communicating with discourse
 */
exports.prepare = function prepare(plugConfig, config, events, browser) {
    if (Array.isArray(plugConfig)) {
        plugConfig = {
            messages: plugConfig
        };
    }
    if (plugConfig === null || typeof plugConfig !== 'object') {
        plugConfig = {};
    }
    internals.events = events;
    internals.browser = browser;
    internals.configuration = config.mergeObjects(true, exports.defaultConfig, plugConfig);
    internals.db = engine.Db(internals.configuration.db, {});
    events.onNotification('mentioned', exports.mentionHandler);
    events.onCommand('join', 'join current mafia game', exports.joinHandler, () => 0);
    events.onCommand('for', 'vote for a player to be executed', exports.voteHandler, () => 0);
};

/**
 * Start the plugin after login
 */
exports.start = function start() {};

/**
 * Stop the plugin prior to exit or reload
 */
exports.stop = function stop() {};
