'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (county) {
  _courtbotEngine.events.on("retrieve-parties", function (casenumber, result) {
    result.promises.push(new Promise(function (resolve, reject) {
      client.get('http://data.thekinfamily.com/oscn/case/' + county + '/' + casenumber, function (data, res) {
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
      client.get("http://data.thekinfamily.com/oscn/case/tulsa/" + casenumber + "/" + partyName, function (data, res) {
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