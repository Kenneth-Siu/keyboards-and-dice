import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import * as UserRepo from "./api/repositories/UserRepo.js";

export default function configurePassport() {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/api/login/google/return",
            },
            (accessToken, refreshToken, profile, done) => {
                UserRepo.findOrCreate(profile)
                    .then((user) => {
                        done(null, user);
                    })
                    .catch((err) => {
                        done(err);
                    });
            }
        )
    );

    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FACEBOOK_CLIENT_ID,
                clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
                callbackURL: "/api/login/facebook/return",
            },
            (accessToken, refreshToken, profile, done) => {
                UserRepo.findOrCreate(profile)
                    .then((user) => {
                        done(null, user);
                    })
                    .catch((err) => {
                        done(err);
                    });
            }
        )
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        UserRepo.getUser(id)
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(err);
            });
    });
}
