const fs = require("fs");
const _ = require("lodash");

let lastCaps = [];
fs.readFile("./data.csv", "utf8", (err, data) => {
  const actors = data.slice(0, data.indexOf("\n"));

  const actorsArray = actors.split(",");

  const actorsQL = actorsArray.filter(actor => actor !== "scenes");

  const actorsCaps = actorsQL.map(actor =>
    actor.replace("_", " ").replace(actor[0], actor[0].toUpperCase())
  );
  lastCaps = actorsCaps.map(actor =>
    _.replace(actor, /(?<=\s)./g, x => x.toLocaleUpperCase())
  );
  console.log(lastCaps);
});

module.exports = lastCaps;
