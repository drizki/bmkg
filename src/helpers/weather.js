const moment = require("moment");
const convert = require("xml-js");

const helper = {
  single: {
    /**
     * Get weather link based on province id
     * @param Number provinceID - the id of the province
     * @returns String url
     */
    getWeatherLink: provinceID => {
      let baseURL =
        "http://data.bmkg.go.id/datamkg/MEWS/DigitalForecast/DigitalForecast-";
      let url;
      switch (provinceID) {
        case 11:
          url = baseURL + "Aceh" + ".xml";
          break;
        case 12:
          url = baseURL + "SumateraUtara" + ".xml";
          break;
        case 13:
          url = baseURL + "SumateraBarat" + ".xml";
          break;
        case 14:
          url = baseURL + "Riau" + ".xml";
          break;
        case 15:
          url = baseURL + "Jambi" + ".xml";
          break;
        case 16:
          url = baseURL + "SumateraSelatan" + ".xml";
          break;
        case 17:
          url = baseURL + "Bengkulu" + ".xml";
          break;
        case 18:
          url = baseURL + "Lampung" + ".xml";
          break;
        case 19:
          url = baseURL + "BangkaBelitung" + ".xml";
          break;
        case 21:
          url = baseURL + "KepulauanRiau" + ".xml";
          break;
        case 31:
          url = baseURL + "DKIJakarta" + ".xml";
          break;
        case 32:
          url = baseURL + "JawaBarat" + ".xml";
          break;
        case 33:
          url = baseURL + "JawaTengah" + ".xml";
          break;
        case 34:
          url = baseURL + "DIYogyakarta" + ".xml";
          break;
        case 35:
          url = baseURL + "JawaTimur" + ".xml";
          break;
        case 36:
          url = baseURL + "Banten" + ".xml";
          break;
        case 51:
          url = baseURL + "Bali" + ".xml";
          break;
        case 52:
          url = baseURL + "NusaTenggaraBarat" + ".xml";
          break;
        case 53:
          url = baseURL + "NusaTenggaraTimur" + ".xml";
          break;
        case 61:
          url = baseURL + "KalimantanBarat" + ".xml";
          break;
        case 62:
          url = baseURL + "KalimantanTengah" + ".xml";
          break;
        case 63:
          url = baseURL + "KalimantanSelatan" + ".xml";
          break;
        case 64:
          url = baseURL + "KalimantanTimur" + ".xml";
          break;
        case 65:
          url = baseURL + "KalimantanUtara" + ".xml";
          break;
        case 71:
          url = baseURL + "SulawesiUtara" + ".xml";
          break;
        case 72:
          url = baseURL + "SulawesiTengah" + ".xml";
          break;
        case 73:
          url = baseURL + "SulawesiSelatan" + ".xml";
          break;
        case 74:
          url = baseURL + "SulawesiTenggara" + ".xml";
          break;
        case 75:
          url = baseURL + "Gorontalo" + ".xml";
          break;
        case 76:
          url = baseURL + "SulawesiBarat" + ".xml";
          break;
        case 81:
          url = baseURL + "Maluku" + ".xml";
          break;
        case 82:
          url = baseURL + "MalukuUtara" + ".xml";
          break;
        case 91:
          url = baseURL + "PapuaBarat" + ".xml";
          break;
        case 94:
          url = baseURL + "Papua" + ".xml";
          break;
      }
      return url;
    },
    getIssueTimestamp: issue => {
      let date =
        issue.year._text +
        "-" +
        issue.month._text +
        "-" +
        issue.day._text +
        "T" +
        issue.hour._text +
        ":" +
        issue.minute._text +
        ":" +
        issue.second._text +
        "+07:00";
      return moment(date).unix();
    }
  }
};

module.exports = helper;
