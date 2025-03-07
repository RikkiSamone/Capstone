const bcrypt = require('bcryptjs');

const password = "hashtest1"; // Same password as before
const storedHash = "$2b$10$m3N6HxlzQCHYJYS9UelaiOOjSy4xauvztGdT.tIbBqxTMT2YxHadq" // Replace this with the hash from hashTest.js

bcrypt.compare(password, storedHash, (err, result) => {
    if (err) {
        console.error("Error comparing password:", err);
    } else {
        console.log("Password match result:", result);
    }
});