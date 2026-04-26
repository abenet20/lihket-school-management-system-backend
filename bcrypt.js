const bcrypt = require("bcrypt");
require("dotenv").config();
const hash = process.env.hash;

bcrypt.hash(hash, 10, function (err, hash) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(hash);
});

console.log(new Date().toISOString().slice(0, 10));
