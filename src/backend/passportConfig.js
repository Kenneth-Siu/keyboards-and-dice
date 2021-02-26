import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GithubStrategy } from "passport-github2";
import * as UserRepo from "./repositories/UserRepo.js";

export default function configurePassport() {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.CALLBACK_URL_BASE + "/api/login/google/return",
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
                callbackURL: process.env.CALLBACK_URL_BASE + "/api/login/facebook/return",
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
        new GithubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: process.env.CALLBACK_URL_BASE + "/api/login/github/return",
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
        UserRepo.find(id)
            .then((user) => {
                if (!user) {
                    done(null, null);
                }
                done(null, user);
            })
            .catch((err) => {
                done(err);
            });
    });
}
