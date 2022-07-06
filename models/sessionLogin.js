import MongoStore from "connect-mongo";
import dbURL from "../sensible/veryPrivate.js";

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: dbURL,
    mongoOptions: advancedOptions,
    ttl: 600,
  }),

  secret: "coderChallenge",
  resave: false,
  saveUninitialized: false,
};

export default sessionConfig;
