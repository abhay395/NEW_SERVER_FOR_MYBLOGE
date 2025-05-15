import passport from "passport";

export const cookieExtractor = (req) => {
    if (req && req.cookies) {
       return req.cookies.jwt
    }
};
export const isAuth = (req, res, next) => {
    return passport.authenticate('jwt')
   };