import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { User } from "../database/models/index.js";
import { JwtUtility } from "../utils/jwt.util";
// import { isAuthRevoked } from '../utils/logout.util.js';

dotenv.config();

export const protectRoute = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).json({ status: 401, message: "Please sign in" });
    }
    const token = req.header("Authorization").split(" ")[1];

    const details = JwtUtility.verifyToken(token);

    const userExists = await User.findOne({
      where: { email: details.email },
    });
    if (!userExists) {
      return res.status(401).json({ status: 401, message: "User not found!" });
    }
    req.user = userExists;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ status: 401, message: "No valid credentials" });
  }
};
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You are not allowed to perform this task",
      });
    }
    next();
  };
};

export const googlePass = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"],
        passReqToCallback: true,
      },
      (request, accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
