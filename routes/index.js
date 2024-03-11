var express = require('express');
var router = express.Router();

const db = require('better-sqlite3')('lms.db');

db.pragma('journal_mode = WAL');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/containers0', function(req, res, next) {
  res.json({containers: [
    {id:1, number:'123123', size:20,
      shipdate:'2024-03-01', shipname:'Maersk Star of India', portname: 'Long Beach',
        customerid: 22, customerName:'acme', shipid:99},
    {id:1, number:'123123776', size:20,
        shipdate:'2024-02-01', shipname:'Cosco Take over World', portname: 'San Pedro',
          customerid: 22, customerName:'acme',
          shipid:234},
    {id:1, number:'23423', size:10,
          shipdate:'2024-03-02', shipname:'Evergreen Fair Seas', portname: 'San Pedro',
            customerid: 15, customerName:'Springfield',
            shipid:123},
  ]});
});

router.get('/containers', function(req, res, next) {
  const stmt = db.prepare('SELECT id, containerSize, dateContainerShipped, nameOfShip from containers');
  containers = stmt.all();
  console.log(containers);
  res.json({containers: containers});
});

module.exports = router;
