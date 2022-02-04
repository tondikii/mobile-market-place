const errorHandler = async (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "Bad request login":
      res.status(400).json({ message: "Email/Password Required"});
      break;
    case "Unauthorized login":
      res.status(400).json({ message: "Invalid Email/Password" });
      break;
    case "Unauthorized middleware":
      case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid Signature" });
      break;
    default:
      res.status(500).json(err);
      break;
  }
};
module.exports = errorHandler;
