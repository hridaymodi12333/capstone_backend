const jwt = require("jsonwebtoken")
// const cookieParser = require("cookie-parser")
const authenticateUser = (req, res, next) => {
  try {
    // const token = req.headers.token
    const token = req.headers.token
    // const token = "res.cookies.jwt"
    // const verifiedToken = jwt.verify(token,"qwertyuiopasdfghjklzxcvbnmqwertyui")
    jwt.verify(token, "qwertyuiopasdfghjklzxcvbnmqwertyui", (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }

      console.log(token)
      // if(decoded.role==="admin"){
      req.body.username = decoded.username;
      next();
      // }
      // else{
      //   res.json({message: "only for admin"})
      // }
    });

    // console.log(token)
    // // res.send("ab to dikha")
    // next()


  }

  catch (error) {
    console.log(error)
  }
}
const authenticateAdmin = (req, res, next) => {
  try {
    // const token = req.headers.token
    const token = req.headers.token
    // const token = "res.cookies.jwt"
    // const verifiedToken = jwt.verify(token,"qwertyuiopasdfghjklzxcvbnmqwertyui")
    jwt.verify(token, "qwertyuiopasdfghjklzxcvbnmqwertyui", (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }

      console.log(token)
      if (decoded.role === "admin") {
        req.body.username = decoded.username;
        next();
      }
      else {
        res.json({ message: "only for admin" })
      }
    });

    // console.log(token)
    // // res.send("ab to dikha")
    // next()


  }

  catch (error) {
    console.log(error)
  }
}

const exportObject = {authenticateUser, authenticateAdmin}

module.exports = exportObject;