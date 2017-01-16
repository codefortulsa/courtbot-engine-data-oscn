'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (county, oscnApiUrl) {
  _courtbotEngine.events.on("retrieve-parties", function (casenumber, result) {
    var url = oscnApiUrl + '/case/' + county + '/' + casenumber;
    log.debug('Attempting to retrieve parties for casenumber ' + casenumber);
    log.debug('using url: ' + url);
    result.promises.push(new Promise(function (resolve, reject) {
      client.get(url, function (data, res) {
        if (!data.defendants || data.defendants.length == 0) {
          log.info('No defendants found in ' + county + ' county for case number ' + casenumber);
          resolve([]);
        }
        resolve(data.defendants);
      });
    }));
  });

  _courtbotEngine.events.on("retrieve-party-events", function (casenumber, party, result) {
    result.promises.push(new Promise(function (resolve, reject) {
      client.get(oscnApiUrl + '/case/' + county + '/' + casenumber + '/' + partyName, function (data, res) {
        console.dir(data);
        if (data.length != 1 || !data[0].events) {
          log.info('No events found in ' + county + ' county for case number ' + casenumber + ' and party ' + party);
          resolve([]);
        }
        resolve(data[0].events);
      });
    }));
  });
};

var _nodeRestClient = require('node-rest-client');

var _courtbotEngine = require('courtbot-engine');

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = new _nodeRestClient.Client();
var log = _log4js2.default.getLogger("oscn");