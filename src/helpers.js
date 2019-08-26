const convert = require("xml-js");
const moment = require("moment");

const helpers = {
  weather: {
    single: {
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
  },
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

  /**
   * Format xml to json and parse it to Object
   * @param String xml
   * @returns Object
   */
  convertToObject: xml => {
    return JSON.parse(convert.xml2json(xml, { compact: true, spaces: 2 }));
  },
  /**
   * Format response
   * @param Object earthquake data
   * @param Boolean potentialTsunami - if data includes potential tsunami
   * @param Boolean felt - is felt format response
   * @param Boolean area - show area
   * @param Boolean hasLink - show if has link
   * @returns Object
   */
  formatResponse: (obj, potentialTsunami, felt, area, hasNoCoords, hasLink) => {
    let response = {
      depth: parseFloat(obj.Kedalaman._text.split(" ")[0]),
      magnitude: parseFloat(obj.Magnitude._text.split(" ")[0])
    };
    if (potentialTsunami) {
      response.potentialTsunami =
        obj.Potensi._text == "tidak berpotensi TSUNAMI" ? false : true;
    }
    if (felt) {
      response.timestamp = helpers.formatFeltDateToUnix(obj.Tanggal._text);
      response.felt = [];
      const felt = obj.Dirasakan._text.split(",");
      felt.forEach(i => {
        if (i !== "" && i) {
          let removeTab = i.replace(/\t/g, ":");
          let removeSpace = removeTab.replace(/\s/g, "");
          response.felt.push(removeSpace);
        }
      });
      response.notes = obj.Keterangan._text;
    } else {
      response.timestamp = helpers.formatToUnix(
        obj.Tanggal._text,
        obj.Jam._text
      );
    }
    if (area) {
      response.area = obj.Area._text;
    }
    if (hasNoCoords) {
      response.lat = parseFloat(obj.Lintang._text);
      response.lon = parseFloat(obj.Bujur._text);
    } else {
      response.lat = parseFloat(obj.point.coordinates._text.split(",")[0]);
      response.lon = parseFloat(obj.point.coordinates._text.split(",")[1]);
    }
    if (hasLink) {
      response.link = obj.Linkdetail._text;
    }
    return response;
  },

  /**
   * Format BMKG single string date to unix
   * @param String date
   * @returns Number
   */
  formatFeltDateToUnix: date => {
    // Original format: 13/08/2019-05:33:21 WIB
    const d = date.split("-")[0];
    const t = date.split("-")[1];

    const year = d.split("/")[2];
    const month = d.split("/")[1];
    const day = d.split("/")[0];

    const strDate =
      year + "-" + month + "-" + day + "T" + t.split(" ")[0] + "+07:00";
    return moment(strDate).unix();
  },

  /**
   * Format BMKG string date (Tanggal dan Jam) to unix
   * @param String date
   * @param String time
   * @returns Number
   */
  formatToUnix: (date, time) => {
    let year = "20" + date.split("-")[2];
    let month;
    let day = date.split("-")[0];
    switch (date.split("-")[1]) {
      case "Jan":
        month = "01";
        break;
      case "Feb":
        month = "02";
        break;
      case "Mar":
        month = "03";
        break;
      case "Apr":
        month = "04";
        break;
      case "May":
        month = "05";
        break;
      case "Jun":
        month = "06";
        break;
      case "Jul":
        month = "07";
        break;
      case "Aug":
        month = "08";
        break;
      case "Sep":
        month = "09";
        break;
      case "Oct":
        month = "10";
        break;
      case "Nov":
        month = "11";
        break;
      case "Des":
        month = "12";
        break;
    }
    return moment(
      year + "-" + month + "-" + day + "T" + time.split(" ")[0] + "+07:00"
    ).unix();
  }
};

module.exports = helpers;
