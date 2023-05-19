const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({
    helpers: {
        formatTime: function(time) {
            const [hours, minutes, seconds] = time.split(':');
            let period = 'AM';
            let hours_12 = Number(hours);
            if (hours_12 >= 12) {
                period = 'PM';
                if (hours_12 > 12) {
                    hours_12 -= 12;
                }
            } else if (hours_12 === 0) {
                hours_12 = 12;
            }
            return `${hours_12}:${minutes} ${period}`;
        }
    }
});

const sessionStore = new SequelizeStore({
  db: sequelize,
  expiration: 3 * 24 * 60 * 60 * 1000, // Session expires after 3 days
});

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
