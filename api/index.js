const express = require("express");
const User = require("./models/User.model");
// const jwt = require("jsonwebtoken");
require('express-async-errors')
require("dotenv").config();
const app = express();
const crypto = require("crypto");
const authRouter = require("./routes/Auth.routes");
const {errorHandlerMiddleware} = require('./middleware/error-handler.js')
const userRouter = require("./routes/User.routes");
const contactRouter = require("./routes/Contact.routes");
const commentRouter = require("./routes/Comment.routes");
// const checkRouter = require("./routes/Check.routes");
const blogRouter = require("./routes/Bloge.routes");
// const passport = require("passport");
// const session = require("express-session");
// const LocalStrategy = require("passport-local").Strategy;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cors = require("cors");
const { cookieExtractor, isAuth } = require("./service/com");
// const cookieParser = require("cookie-parser");
// const JwtStrategy = require("passport-jwt").Strategy;
// const GitHubStrategy = require("passport-github").Strategy;
// const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require("path");
const { connectDb } = require("./db/connectdb");

// TODO: cors setup
app.use(
  cors()
);


// app.use(express.static("dist"));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve('dist'));
// })
// const upload = multer({ dest: "uploads/" });
// app.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     // Use the cloudinary.uploader.upload method to upload the image
//     const result = await cloudinary.uploader.upload(req.file.path);

//     // The result object will contain information about the uploaded image, including the public URL
//     console.log(result);

//     // You can send the public URL back as a response or perform other actions
//     res.json({ imageUrl: result.secure_url });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// TODO: body parser
app.use(express.json());
// app.use(cookieParser());

// // TODO: session setup
// app.use(
//   session({
//     secret: "shhh",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// // TODO: session passport initalize
// app.use(passport.session());
// app.use(passport.initialize());

// // TODO: JWT opts Objecte set
// const opts = {};
// opts.jwtFromRequest = cookieExtractor;
// opts.secretOrKey = process.env.JWT_SECRET_KEY;

// // ?? Strategies

// //  ** Local strategies
// passport.use(
//   "local",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//     },
//     async function (email, password, done) {
//       try {
//         const user = await User.findOne({ email }).exec();
//         // // console.log(email)
//         if (!user) {
//           return done(null, false, { message: "Incorrect email." });
//         }
//         crypto.pbkdf2(
//           password,
//           user.salt,
//           310000,
//           32,
//           "sha256",
//           function (err, hashedPassword) {
//             if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
//               return done(null, false, { message: "Incorrect password." });
//             }
//             const token = jwt.sign(
//               { name: user.name, _id: user.email },
//               process.env.JWT_SECRET_KEY
//             );
//             // // console.log(err);
//             return done(null, token);
//           }
//         );
//       } catch (error) {
//         // // console.log(error);
//         return done(null, { message: "unautherized" });
//       }
//     }
//   )
// );

// //  ** google strategies

// passport.use(
//   "google",
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALL_BACK_URL,
//       scope: ["profile", "email"],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         let user = await User.findOne({ googleId: profile.id });
//         let token;
//         if (!user) {
//           user = new User({
//             googleId: profile.id,
//             name: profile.displayName,
//             email: profile.emails[0].value,
//             image: profile.photos[0].value,
//           });
//           // console.log(accessToken,"sadas",refreshToken);
//           await user.save();
//           token = jwt.sign(
//             { name: user.name, _id: user._id },
//             process.env.JWT_SECRET_KEY
//           );
//         }
//         if (user)
//           token = jwt.sign(
//             { name: user.name, _id: user._id },
//             process.env.JWT_SECRET_KEY
//           );
//         // console.log(accessToken,"sadas",refreshToken);

//         return done(null, token);
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );

// // ** github strategies

// passport.use(
//   "github",
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       callbackURL: process.env.GITHUB_CALLBACK_URL,
//     },
//     async function (accessToken, refreshToken, profile, cb) {
//       try {
//         // // console.log(profile);
//         const user = await User.findOne({ githubId: profile.id });
//         let token;
//         // // console.log(profile.login)
//         if (!user) {
//           const user = await User.create({
//             githubId: profile.id,
//             name: profile.displayName,
//             email: profile._json.email,
//             github: profile.username,
//             image: profile.photos[0].value,
//           });
//           // // console.log(user)
//           token = jwt.sign(
//             { name: user.name, _id: user._id },
//             process.env.JWT_SECRET_KEY
//           );
//         } else {
//           // // console.log("User",user)
//           token = jwt.sign(
//             { name: user.name, _id: user._id },
//             process.env.JWT_SECRET_KEY
//           );
//         }
//         return cb(null, token);
//       } catch (error) {
//         return cd(null, error);
//       }
//     }
//   )
// );

// //  ** jwt strategies

// passport.use(
//   "jwt",
//   new JwtStrategy(opts, async function (jwt_payload, done) {
//     try {
//       const { _id } = jwt_payload;
//       console.log(jwt_payload);
//       // // console.log("jwt payload",jwt_payload)
//       // // console.log("user",data)
//       if (_id) {
//         return done(null, _id);
//       } else {
//         return done(null, false);
//       }
//     } catch (error) {
//       return done({ message: "unauth" }, false);
//     }
//   })
// );

// //  ** passport Serializer and deserializer
// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });

app.get('/',(req,res)=>res.send("hell"))
app.use("/auth", authRouter.router);
app.use("/user", userRouter.router);
// app.use("/check", isAuth(), checkRouter.router);
app.use("/bloge", blogRouter.router);
app.use("/contact", contactRouter.router);
app.use("/comment", commentRouter.router);
app.use(errorHandlerMiddleware)
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// const start = async()=>{
//   try {
//       app.listen(3000, () => {
//           console.log('Server listening on port 3000')
//       })  
//   } catch (error) {
//       console.log(error)
//   }
  
// }
connectDb()