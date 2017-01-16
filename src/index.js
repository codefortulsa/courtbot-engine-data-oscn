import { Client } from 'node-rest-client';
import { events } from 'courtbot-engine';
import log4js from 'log4js';

const client = new Client();
const log = log4js.getLogger("oscn");

export default function(county) {
  events.on("retrieve-parties", (casenumber, result) => {
    result.promises.push(new Promise(function(resolve, reject) {
      client.get(`http://data.thekinfamily.com/oscn/case/${county}/${casenumber}`, function(data, res) {
        if(!data.defendants || data.defendants.length == 0) {
          log.info(`No defendants found in ${county} county for case number ${casenumber}`);
          resolve([]);
        }
        resolve(data.defendants);
      });
    }));
  });

  events.on("retrieve-party-events", (casenumber, party, result) => {
    result.promises.push(new Promise(function(resolve, reject) {
      client.get("http://data.thekinfamily.com/oscn/case/tulsa/" + casenumber + "/" + partyName, function(data, res) {
        console.dir(data);
        if(data.length != 1 || !data[0].events) {
          log.info(`No events found in ${county} county for case number ${casenumber} and party ${party}`);
          resolve([]);
        }
        resolve(data[0].events);
      });
    }));
  });
}
