const bcrypt = require("bcrypt");

 bcrypt.hash("10101", 10, function(err, hash) {
    if (err) {
        console.error(err);
        return;
    }
   console.log(hash);
 });