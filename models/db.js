const mongoose = require("mongoose");


mongoose.connect(process.env.DB_URI,{
    tlsAllowInvalidHostnames: true,
    tlsAllowInvalidCertificates: true,
  }).then((result) => {
    console.log("DB Ready To Use");
}).catch((err) => {
    console.log(err);
});