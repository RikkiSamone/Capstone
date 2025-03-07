const bcrypt = require('bcryptjs');

const password = "hashtest1"; // Your test password
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error("Error hashing password:", err);
    } else {
        console.log("Generated Hash:", hash);
    }
});