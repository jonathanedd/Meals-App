const { app } = require('./app');

// Relation models
const { initModels } = require('./models/initModels');

// utils
const { db } = require('./utils/database');

// authenticate
db.authenticate()
  .then(() => console.log('Database Authenticated'))
  .catch(err => console.log(err));

initModels();

// sync
db.sync()
  .then(() => console.log('synced'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running in port ${PORT}`);
});
