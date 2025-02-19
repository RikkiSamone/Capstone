// Middleware to check if the user is a coach
const isCoach = (req, res, next) => {
  if (req.user.role === "coach") {
    return next(); // Proceed if the user is a coach
  } else {
    return res.status(403).json({ message: "Access denied" }); // Forbidden if not a coach
  }
};