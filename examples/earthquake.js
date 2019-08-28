const bmkg = require("../src/bmkg");

const latest = async () => {
  try {
    let latest = await bmkg.earthquake.latest();
    console.log(latest);
  } catch (error) {
    console.log(error);
  }
};

const last60 = async () => {
  try {
    let last60 = await bmkg.earthquake.last60();
    console.log(last60);
  } catch (error) {
    console.log(error);
  }
};

const last20 = async () => {
  try {
    let last20 = await bmkg.earthquake.last20();
    console.log(last20);
  } catch (error) {
    console.log(error);
  }
};

const lastWithPotentialTsunami = async () => {
  try {
    let last20 = await bmkg.earthquake.lastWithPotentialTsunami();
    console.log(last20);
  } catch (error) {
    console.log(error);
  }
};

latest();
last60();
last20();
lastWithPotentialTsunami();
