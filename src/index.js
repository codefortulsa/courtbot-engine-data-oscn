import { Client } from 'node-rest-client';
import { events } from 'courtbot-engine';
import log4js from 'log4js';

const client = new Client();
const log = log4js.getLogger("oscn");

export default function(county, oscnApiUrl) {
  events.on("retrieve-parties", (casenumber, result) => {
    const url = `${oscnApiUrl}/case/${county}/${casenumber}`;
    log.debug(`Attempting to retrieve parties for casenumber ${casenumber}`);
    log.debug(`using url: ${url}`)
    result.promises.push(new Promise(function(resolve) {
      client.get(url, function(data) {
        if(!data.defendants || data.defendants.length == 0) {
          log.info(`No defendants found in ${county} county for case number ${casenumber}`);
          resolve([]);
        }
        resolve(data.defendants);
      });
    }));
  });

  events.on("retrieve-party-events", (casenumber, party, result) => {
    result.promises.push(new Promise(function(resolve) {
      client.get(`${oscnApiUrl}/case/${county}/${casenumber}/${party}`, function(data) {
        if(data.length != 1 || !data[0].events) {
          log.info(`No events found in ${county} county for case number ${casenumber} and party ${party}`);
          resolve([]);
        }
        resolve(data[0].events);
      });
    }));
  });
}
