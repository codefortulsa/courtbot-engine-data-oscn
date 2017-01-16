"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (county) {
  return {
    getCaseParties: function getCaseParties(casenumber) {
      return new Promise(function (resolve, reject) {
        client.get("http://data.thekinfamily.com/oscn/case/" + county + "/" + casenumber, function (data, res) {
          if (!data.defendants) {
            reject("no parties");
          }
          resolve(data.defendants);
        });
      });
    }
  };
};

var _nodeRestClient = require("node-rest-client");

var client = new _nodeRestClient.Client();

module.exports.getCaseParties = function (casenumber) {
  return new Promise(function (resolve, reject) {
    client.get("http://data.thekinfamily.com/oscn/case/tulsa/" + casenumber, function (data, res) {
      if (!data.defendants) {
        reject("no parties");
      }
      resolve(data.defendants);
    });
  });
};

module.exports.getCasePartyEvents = function (casenumber, partyName) {
  return new Promise(function (resolve, reject) {
    client.get("http://data.thekinfamily.com/oscn/case/tulsa/" + casenumber + "/" + partyName, function (data, res) {
      console.dir(data);
      if (data.length != 1 || !data[0].events) {
        reject("no events");
        return;
      }
      resolve(data[0].events);
    });
  });
};

module.exports.refreshData = function () {
  //no-op
};