const express = require('express');
const app = express();
const body_parser = require('body-parser')
const cors = require('cors')
const routeConfig = require('./router_config')
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passportOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "SECRET"
};

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use(body_parser.json());
app.use(express.static(__dirname + '/uploads'));
require('dotenv').config()

routeConfig.init(app);

var models = require("./models");

passport.use(new JwtStrategy(passportOpts, function (jwtPayload, done) {
    const expirationDate = new Date(jwtPayload.exp * 1000);
    if (expirationDate < new Date()) {
        return done(null, false);
    }
    done(null, jwtPayload);
}))

passport.serializeUser(function (user, done) {
    done(null, user.email)
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.listen(3000, async (err) => {
    if (err) console.log(err)
    else {
        console.log("Server connected")
    }
})