/* 
This program connects to a GoDaddy database where the information about the games is stored. This is exported so that it can be used in other script files.
*/

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : '68.178.247.27',
  user            : 'manzaib',
  password        : 'IWillMakeAScript436',
  database        : 'games_for_game_hoard'
});
module.exports.pool = pool;