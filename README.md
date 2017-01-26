# courtbot-engine-data-oscn [![Build Status](https://travis-ci.org/codefortulsa/courtbot-engine-data-oscn.svg?branch=master)](https://travis-ci.org/codefortulsa/ccourtbot-engine-data-oscn)  [![npm](badges/npm.png)](https://www.npmjs.com/package/courtbot-engine-data-oscn)

This is a data source for courtbot-engine that pulls case data from oscn (Oklahoma State Court Network).

##Usage

~~~javascript
var courbot=require("courtbot-engine");
require("courtbot-engine-data-oscn")("tulsa", "https://oscn-case-api.herokuapp.com");

...

courtbot.addRoutes(app, {
  dbUrl: databaseurl,
  <other options>
});
~~~
