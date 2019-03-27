const fs = require("fs");
const _ = require("lodash");

let lastCaps = [];
let sceneActors = [];
let sceneText = [];

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

  let sections = [];

  let i = 0;
  let start = 0;
  while (i < data.length) {
    if (data[i] == "\n") {
      const temp = data.slice(start, i);
      sections = [...sections, temp];
      start = i;
    }
    i++;
  }

  const clean = sections.map(item => _.replace(item, /\n/, ""));
  const final = clean.map(item => _.replace(item, /\r/, ""));
  sceneText = final.map(item => item.slice(0, item.search(",")));

  //SceneText is ready to loop in order to create the scenes

  const commas = final.map(item => item.slice(item.search(",")));

  commas[0] = commas[0].slice(1);

  commas[31] = commas[31].slice(
    commas[31].search('sis"') + 4,
    commas[31].length
  );

  const commaSplit = commas.map(item => item.split(",").slice(1));

  const finalActors = lastCaps.map(name => {
    return name.includes("At") ? "Rowan Atkinson" : name;
  });

  let j = 0;

  while (j < commaSplit.length) {
    let positions = [];
    commaSplit[j].forEach((element, index) => {
      if (element == "TRUE") {
        positions.push(finalActors[index]);
      }
    });
    sceneActors.push(positions);
    j++;
  }
  //console.log(sceneText);
  //console.log(sceneActors);
});

module.exports = { sceneText, sceneActors };
