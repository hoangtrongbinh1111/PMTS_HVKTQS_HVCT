const path = require('path');
const knex = require('knex');
/***
 * Khởi tạo
 */
let masterDb;
let slaveDb;
let slaveName;

/**
 * Cấu hình MASTER database
 */
async function initializeMasterDatabase() {

  const dbPath = path.resolve(__dirname, `db/master.sqlite`);

  if (masterDb) {
    // If a database connection exists, destroy it
    masterDb.destroy();
  }

  masterDb = knex({
    client: 'sqlite3',
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true,
  });

  const schemaAll = require('./schemas/master/index')(masterDb);

  await Promise.all(schemaAll);

  console.log(`Connected to MASTER database`);
}

function getMasterDatabase() {
  return masterDb;
}

/**
 * Cấu hình SLAVE database
 */

async function initializeSlaveDatabase(databaseName) {
  const dbPath = path.resolve(__dirname, `db/${databaseName}.sqlite`);
  if (slaveDb) {
    // If a database connection exists, destroy it
    slaveDb.destroy();
  }

  slaveDb = knex({
    client: 'sqlite3',
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true,
  });
  slaveName = databaseName;
  const schemaAll = require('./schemas/slave/index')(slaveDb);

  await Promise.all(schemaAll);

  console.log(`Connected to slave database: ${databaseName}`);
}

function getSlaveName() {
  return slaveName;
}
function getSlaveDatabase() {
  return slaveDb;
}

module.exports = {
  initializeMasterDatabase,
  getMasterDatabase,
  initializeSlaveDatabase,
  getSlaveDatabase,
  getSlaveName
};
