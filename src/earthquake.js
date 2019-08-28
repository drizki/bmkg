const fetch = require("node-fetch");
const helpers = require("./helpers");
const eartquake = {
  /**
   * Get single latest earthquake with 5.0+ magnitude
   * @returns Promise
   */
  latest: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("http://data.bmkg.go.id/autogempa.xml");
        const json = helpers.earthquake.convertToObject(await response.text());
        const unordered = helpers.earthquake.formatResponse(
          json.Infogempa.gempa,
          true
        );
        const ordered = {};
        Object.keys(unordered)
          .sort()
          .forEach(key => {
            ordered[key] = unordered[key];
          });
        resolve(ordered);
      } catch (error) {
        reject(error);
      }
    });
  },

  /**
   * Get 60 recent earthquakes
   * @returns Promise
   */
  last60: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("http://data.bmkg.go.id/gempaterkini.xml");
        const json = helpers.earthquake.convertToObject(await response.text());
        const results = json.Infogempa.gempa;
        let earthquakes = [];
        results.forEach(earthquake => {
          let unordered = helpers.earthquake.formatResponse(earthquake, false);
          let ordered = {};
          Object.keys(unordered)
            .sort()
            .forEach(function(key) {
              ordered[key] = unordered[key];
            });
          earthquakes.push(ordered);
        });
        resolve(earthquakes);
      } catch (error) {
        reject(error);
      }
    });
  },

  /**
   * Get 20 recent felt earthquakes
   * @returns Promise
   */
  last20: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          "http://data.bmkg.go.id/gempadirasakan.xml"
        );
        const json = helpers.earthquake.convertToObject(await response.text());
        const results = json.Infogempa.Gempa;
        let earthquakes = [];
        results.forEach(earthquake => {
          let unordered = helpers.earthquake.formatResponse(
            earthquake,
            false,
            true
          );
          let ordered = {};
          Object.keys(unordered)
            .sort()
            .forEach(function(key) {
              ordered[key] = unordered[key];
            });
          earthquakes.push(ordered);
        });
        resolve(earthquakes);
      } catch (error) {
        reject(error);
      }
    });
  },

  /**
   * Get latest earthquake with potential tsunami
   * @returns Promise
   */
  lastWithPotentialTsunami: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("http://data.bmkg.go.id/lasttsunami.xml");
        const json = helpers.earthquake.convertToObject(await response.text());
        const unordered = helpers.earthquake.formatResponse(
          json.Infotsunami.Gempa,
          false,
          false,
          true,
          true,
          true
        );
        let ordered = {};
        Object.keys(unordered)
          .sort()
          .forEach(function(key) {
            ordered[key] = unordered[key];
          });
        resolve(ordered);
      } catch (error) {
        reject(error);
      }
    });
  }
};

module.exports = eartquake;
