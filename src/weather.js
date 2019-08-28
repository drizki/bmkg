const fetch = require("node-fetch");
const helpers = require("./helpers");
const weather = {
  /**
   * Get weather forecast for single province in Indonesia
   * @param Number province - Province ID, see docs
   * @returns Promise
   */
  single: provinceID => {
    return new Promise(async (resolve, reject) => {
      try {
        const url = helpers.weather.single.getWeatherLink(provinceID);
        const response = await fetch(url);
        const json = helpers.earthquake.convertToObject(await response.text());
        const forecast = json.data.forecast;
        const issueDate = helpers.weather.single.getIssueTimestamp(
          forecast.issue
        );

        let format = {
          timestamp: issueDate,
          area: []
        };

        const area = forecast.area;

        area.forEach(a => {
          let newArea = {
            meta: {
              name: a.name[0]._text,
              lat: parseFloat(a._attributes.latitude),
              lon: parseFloat(a._attributes.longitude),
              type: a._attributes.type,
              region: a._attributes.region,
              description: a._attributes.description,
              level: a._attributes.level,
              domain: a._attributes.domain
            },

            humidity: {
              id: "hu",
              description: "Humidity",
              type: "hourly",
              values: []
            },
            humidityMin: {
              id: "humin",
              description: "Min humidity",
              type: "daily",
              values: []
            },
            humidityMax: {
              id: "humax",
              description: "Max humidity",
              type: "daily",
              values: []
            },
            temperature: {
              id: "t",
              description: "Temperature",
              type: "hourly",
              values: []
            },
            temperatureMin: {
              id: "tmin",
              description: "Min temperature",
              type: "daily",
              values: []
            },
            temperatureMax: {
              id: "tmax",
              description: "Max temperature",
              type: "daily",
              values: []
            },
            weather: {
              id: "weather",
              description: "Weather",
              type: "hourly",
              values: []
            },
            windDirection: {
              id: "wd",
              description: "Wind direction",
              type: "hourly",
              values: []
            },
            windSpeed: {
              id: "ws",
              description: "Wind speed",
              type: "hourly",
              values: []
            }
          };

          if (a.parameter) {
            // Loop through humidity timerange
            a.parameter[0].timerange.forEach(time => {
              let value = {
                hour: parseInt(time._attributes.h),
                datetime: time._attributes.datetime,
                value: time.value._text,
                unit: time.value._attributes.unit
              };
              newArea.humidity.values.push(value);
            });

            // Loop through humidity max timerange
            a.parameter[1].timerange.forEach(time => {
              let value = {
                datetime: time._attributes.datetime,
                value: time.value._text,
                unit: time.value._attributes.unit
              };
              newArea.humidityMax.values.push(value);
            });

            // Loop through temperature max timerange
            a.parameter[2].timerange.forEach(time => {
              let value = {
                datetime: time._attributes.datetime,
                values: []
              };
              value.values.push({
                unit: "C",
                value: time.value[0]._text
              });
              value.values.push({
                unit: "F",
                value: time.value[1]._text
              });
              newArea.temperatureMax.values.push(value);
            });

            // Loop through humidity min timerange
            a.parameter[3].timerange.forEach(time => {
              let value = {
                datetime: time._attributes.datetime,
                value: time.value._text,
                unit: time.value._attributes.unit
              };
              newArea.humidityMin.values.push(value);
            });

            // Loop through temperature min timerange
            a.parameter[4].timerange.forEach(time => {
              let value = {
                datetime: time._attributes.datetime,
                values: []
              };
              value.values.push({
                unit: "C",
                value: time.value[0]._text
              });
              value.values.push({
                unit: "F",
                value: time.value[1]._text
              });
              newArea.temperatureMin.values.push(value);
            });

            // Loop through temperature timerange
            a.parameter[5].timerange.forEach(time => {
              let value = {
                hour: parseInt(time._attributes.h),
                datetime: time._attributes.datetime,
                values: []
              };
              value.values.push({
                unit: "C",
                value: time.value[0]._text
              });
              value.values.push({
                unit: "F",
                value: time.value[1]._text
              });
              newArea.temperature.values.push(value);
            });

            // Loop through weather timerange
            a.parameter[6].timerange.forEach(time => {
              let value = {
                hour: parseInt(time._attributes.h),
                datetime: time._attributes.datetime,
                value: {
                  id: time.value._text,
                  description: {
                    id: "",
                    en: ""
                  }
                }
              };
              switch (value.value.id) {
                case "0":
                  value.value.description.id = "Cerah";
                  value.value.description.en = "Clear Skies";
                  break;
                case "100":
                  value.value.description.id = "Cerah";
                  value.value.description.en = "Clear Skies";
                  break;
                case "1":
                  value.value.description.id = "Cerah Berawan";
                  value.value.description.en = "Partly Cloudy";
                  break;
                case "2":
                  value.value.description.id = "Cerah Berawan";
                  value.value.description.en = "Partly Cloudy";
                  break;
                case "101":
                  value.value.description.id = "Cerah";
                  value.value.description.en = "Clear Skies";
                  break;
                case "102":
                  value.value.description.id = "Cerah Berawan";
                  value.value.description.en = "Partly Cloudy";
                  break;
                case "3":
                  value.value.description.id = "Berawan";
                  value.value.description.en = "Mostly Cloudy";
                  break;
                case "103":
                  value.value.description.id = "Berawan";
                  value.value.description.en = "Mostly Cloudy";
                  break;
                case "4":
                  value.value.description.id = "Berawan Tebal";
                  value.value.description.en = "Overcast";
                  break;
                case "104":
                  value.value.description.id = "Berawan Tebal";
                  value.value.description.en = "Overcast";
                  break;
                case "5":
                  value.value.description.id = "Udara Kabur";
                  value.value.description.en = "Haze";
                  break;
                case "10":
                  value.value.description.id = "Asap";
                  value.value.description.en = "Smoke";
                  break;
                case "45":
                  value.value.description.id = "Kabut";
                  value.value.description.en = "Fog";
                  break;
                case "60":
                  value.value.description.id = "Hujan Ringan";
                  value.value.description.en = "Light Rain";
                  break;
                case "61":
                  value.value.description.id = "Hujan Sedang";
                  value.value.description.en = "Rain";
                  break;
                case "63":
                  value.value.description.id = "Hujan Lebat";
                  value.value.description.en = "Heavy Rain";
                  break;
                case "80":
                  value.value.description.id = "Hujan Lokal";
                  value.value.description.en = "Isolated Rain";
                  break;
                case "95":
                  value.value.description.id = "Hujan Petir";
                  value.value.description.en = "Severe Thunderstorm";
                  break;
                case "97":
                  value.value.description.id = "Hujan Petir";
                  value.value.description.en = "Severe Thunderstorm";
                  break;
                default:
                  value.value.description.id = "Tidak ada data";
                  value.value.description.en = "No data";
                  break;
              }

              newArea.weather.values.push(value);
            });

            // Loop through temperature min timerange
            a.parameter[7].timerange.forEach(time => {
              let value = {
                datetime: time._attributes.datetime,
                values: []
              };
              value.values.push({
                unit: "deg",
                value: parseFloat(time.value[0]._text)
              });
              value.values.push({
                unit: "CARD",
                value: time.value[1]._text
              });
              value.values.push({
                unit: "SEXA",
                value: parseInt(time.value[2]._text)
              });
              newArea.windDirection.values.push(value);
            });

            // Loop through wind speed min timerange
            a.parameter[8].timerange.forEach(time => {
              let value = {
                datetime: time._attributes.datetime,
                values: []
              };
              value.values.push({
                unit: "KT",
                value: parseFloat(time.value[0]._text)
              });
              value.values.push({
                unit: "MPH",
                value: parseFloat(time.value[1]._text)
              });
              value.values.push({
                unit: "KPH",
                value: parseFloat(time.value[2]._text)
              });
              value.values.push({
                unit: "MS",
                value: parseFloat(time.value[3]._text)
              });
              newArea.windSpeed.values.push(value);
            });
          }

          format.area.push(newArea);
        });
        resolve(format);
      } catch (error) {
        reject(error);
      }
    });
  }
};
module.exports = weather;
