const assert = require("chai").assert;
const expect = require("chai").expect;
const w = require("../src/helpers/weather");

describe("helpers.weather.single.getWeatherLink()", () => {
  it("should return type of string", () => {
    let value = w.single.getWeatherLink(11);
    assert.typeOf(value, "string");
  });
  it("should throw Error if parameter is omitted", () => {
    expect(() => w.single.getWeatherLink()).to.throw(Error);
  });
  it("should throw Error if given unknown parameter", () => {
    expect(() => w.single.getWeatherLink(0)).to.throw(Error);
  });
});

describe("helpers.weather.single.getIssueTimestamp()", () => {
  let issueDate = {
    year: {
      _text: "2019"
    },
    month: {
      _text: "01"
    },
    day: {
      _text: "01"
    },
    hour: {
      _text: "00"
    },
    minute: {
      _text: "00"
    },
    second: {
      _text: "00"
    }
  };
  it("should return type of number", () => {
    let value = w.single.getIssueTimestamp(issueDate);
    assert.typeOf(value, "number");
  });
  it("should throw Error if parameter is omitted", () => {
    expect(() => w.single.getIssueTimestamp()).to.throw(Error);
  });
  it("should throw Error if parameter type is not a number", () => {
    expect(() => w.single.getIssueTimestamp("not a number")).to.throw(Error);
  });
});
