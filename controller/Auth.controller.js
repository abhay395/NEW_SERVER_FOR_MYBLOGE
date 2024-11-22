const User = require("../models/User.model");
const BadRequest = require("../errors/bad-request");
const UnauthenticatedError = require("../errors/unauthenticated");
const asyncWrapper = require("../middleware/async");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "Your Secret Secret Key";
const createToken = (user) => {
  return jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    JWT_SECRET,
    {
      expiresIn: "12h",
    }
  );
};
exports.createUser =asyncWrapper(async (req, res) => {
  
    const { name, email, password } = req.body;
    const requiredFiled = {name,email,password}

    for(const [key,value] of Object.entries(requiredFiled)){
      if (!value) {
        throw new BadRequest(`${key} is required`);
      } 
    }
    const soltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, soltRounds);
    const user = await User.create({
      name:name,
      email:email,
      password:hashedPassword,
      isActive:true
    })
    const token = createToken({_id:user._id,email:user.email});
    res.status(201).json({
      message:"User created Successfully",
      token
    })
    // // console.log(req.body)
})
exports.LoginUser = asyncWrapper(async(req, res) => {
  const { email, password } = req.body;
  const requiredField = { email, password };
  // console.log(email)
  for (let [key, value] of Object.entries(requiredField)) {
    if (!value) {
      res.status(400).json({message:`${key} is required`});
    }
  }
  const user = await User.findOne({ "email": email, });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  
  // console.log(user.password)
  const hashPass = user.password;
  const passwordCheck = await bcrypt.compare(password, hashPass);
  if (!passwordCheck) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  User.findByIdAndUpdate(user._id,{isActive:true})
  token = createToken(user);
  res.status(200).json({
    message: "User succesfully loged in",
    token,
    user: {
      id: user._id,
      email: user.email,
      username: user.name,
    },
  });
})
// exports.googleCallbackFunction = (req, res) => {
//   // *Successful authentication, set a cookie and redirect to the home page

//   res
//     .cookie("jwt", req.user, {
//       expires: new Date(Date.now() + 3600000),
//       httpOnly: true,
//     })
//     .status(201);
//   res.redirect("http://localhost:5173/");
// };
// exports.githubCallbackFunction = (req, res) => {
//   res
//     .cookie("jwt", req.user, {
//       expires: new Date(Date.now() + 3600000),
//       httpOnly: true,
//     })
//     .status(201);
//   // // console.log(req.user)

//   // Successful authentication, redirect home.
//   res.redirect("/");
// };
exports.logout = asyncWrapper(async(req, res) => {
  const id = req.user._id
  const user = await User.findByIdAndUpdate(id,{isActive:false})
  res.status(200).json({message:"User Logout"})
})

 exports.checkUser = asyncWrapper(async (req, res) => {
  res.status(200).json(req.user)
});

