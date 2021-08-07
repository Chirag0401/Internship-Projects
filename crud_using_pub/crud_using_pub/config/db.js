var mysql  = require('mysql');

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '',
  database : 'crud'
})

conn.connect(() => {
  console.log(`connected`)
})

module.exports = conn;