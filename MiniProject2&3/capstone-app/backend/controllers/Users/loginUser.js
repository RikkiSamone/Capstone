require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/users');

// Login Route
const login = async (req, res) => {
  console.log('Login attempt triggered');
  console.log('Request body:', req.body);
    const { email, password } = req.body;
  console.log('Login attempt for:', email);
  console.log('Login attempt for:', password);
    

    if (!req.body.email || !req.body.password) {
        console.log("Missing email or password");
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
      //Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
            console.log("No user found with that email");
            return res.status(400).json({ message: "Invalid email or password" });
        }

      //Compares passwords
      /*const password = 'hashtest1';
      const hash = '$2b$10$QW7TvJXzPwZyIHaw.DWOV.dXKejfA9i.Xt8GshDgTiFM/y6Yy0umu'; // The stored hash   
        console.log('Attempting to compare passwords...');
        console.log('Password provided:', password);
        console.log('Stored hash:', user.password);
        console.log('Password provided length:', password.length);
        console.log('Stored hash length:', user.password.length);*/
                     
      /*const isMatch = await bcrypt.compare(password.trim(), hash.trim());
      console.log('Trimmed password:', password.trim());
      console.log('Stored hash:', user.password.trim());
      console.log(typeof password, password);
      console.log(typeof user.password, user.password);*/
      
      const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result:", isMatch);

        if (!isMatch) {
            console.log("Passwords do not match");
            return res.status(400).json({ message: "Invalid email or password" });
        }
              
        
    //Creates token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
       console.log("Generated Token:", token);
        res.status(200).json({ message: "Login successful", token, user });
        //res.json({ message: "Login successful", user });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = login;