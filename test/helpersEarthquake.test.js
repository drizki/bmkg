const assert = require("chai").assert;
const expect = require("chai").expect;
const e = require("../src/helpers/earthquake");

describe("helpers.earthquake.convertToObject()", () => {
  it("should throw Error if parameter is undefined || null", () => {
    expect(() => e.convertToObject()).to.throw(Error);
  });
  it("should throw Error if type of parameter is not string", () => {
    expect(() => e.convertToObject({})).to.throw(Error);
  });
  it("should return type of object", () => {
    let str = `
      <?xml version="1.0"?>
      <Infogempa>
      <gempa>
        <Tanggal>27-Aug-19</Tanggal>
        <Jam>13:31:23 WIB</Jam>
        <point><coordinates>122.05,1.27</coordinates></point>
        <Lintang>1.27 LU</Lintang>
        <Bujur>122.05 BT</Bujur>
        <Magnitude>5.0 SR</Magnitude>
        <Kedalaman>10 Km</Kedalaman>
        <_symbol>imagesSWF/m2b.swf</_symbol>
        <Wilayah1>84 km TimurLaut BUOL-SULTENG</Wilayah1>
        <Wilayah2>88 km BaratLaut BOALEMO-GORONTALO</Wilayah2>
        <Wilayah3>90 km TimurLaut POHUWATO-GORONTALO</Wilayah3>
        <Wilayah4>137 km BaratLaut GORONTALO-GORONTALO</Wilayah4>
        <Wilayah5>1882 km TimurLaut JAKARTA-INDONESIA</Wilayah5>
        <Potensi>tidak berpotensi TSUNAMI</Potensi>
      </gempa>
      </Infogempa>
    `;
    let value = e.convertToObject(str);
    assert.typeOf(value, "object");
  });
});

describe("helpers.earthquake.formatResponse()", () => {
  it("should throw Error if object parameter is omitted", () => {
    expect(() => e.formatResponse()).to.throw(Error);
  });
  it("should throw Error if obj type is not object", () => {
    expect(() => e.formatResponse("")).to.throw(Error);
  });
  it("should throw Error if potentialTsunami type is not boolean", () => {
    expect(() => e.formatResponse({}, "")).to.throw(Error);
  });
  it("should throw Error if felt type is not boolean", () => {
    expect(() => e.formatResponse({}, false, "")).to.throw(Error);
  });
  it("should throw Error if area type is not boolean", () => {
    expect(() => e.formatResponse({}, false, false, "")).to.throw(Error);
  });
  it("should throw Error if hasNoCoords type is not boolean", () => {
    expect(() => e.formatResponse({}, false, false, false, "")).to.throw(Error);
  });
  it("should throw Error if hasLink type is not boolean", () => {
    expect(() => e.formatResponse({}, false, false, false, false, "")).to.throw(
      Error
    );
  });
});
