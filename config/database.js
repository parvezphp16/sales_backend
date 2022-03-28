var mysql = require('mysql'); //import the mysql after installing
var connection = mysql.createConnection({
  host: '127.0.0.1', 
  user: 'root',
  password: '',
  database: 'sales_backend',
  multipleStatements: true
})//connecting to mysql db

async function connect()
{
    try
    {
        await new Promise((resolve, reject) => {
          connection.connect(err => {
                return err ? reject(err) : resolve(console.log('Connected to the MySQL server.'))
            })
        })
    }
    catch(err)
    {
      console.log(err)
      return console.error('Database Connection Error: ' + err.sqlMessage);
    }
}
connect()
module.exports = connection;  