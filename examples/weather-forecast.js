const bmkg = require("../src/bmkg");

const single = async () => {
  try {
    let res = await bmkg.weather.single(11);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

single();
