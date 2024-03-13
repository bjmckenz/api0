var express = require('express');
var router = express.Router();
var JSON = require('json5');

const db = require('better-sqlite3')('lms.db');

db.pragma('journal_mode = WAL');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<body>You probably want to hit the <a href="http://127.0.0.0:5173/">Front End</a> because this is just the API</body>');
});

router.get('/containers0', function(req, res, next) {
  res.json({containers: [
    {containerNumber:1, number:'123123', size:20,
      shipdate:'2024-03-01', shipname:'Maersk Star of India', portname: 'Long Beach',
        customerid: 22, customerName:'acme', shipid:99},
    {containerNumber:1, number:'123123776', size:20,
        shipdate:'2024-02-01', shipname:'Cosco Take over World', portname: 'San Pedro',
          customerid: 22, customerName:'acme',
          shipid:234},
    {containerNumber:1, number:'23423', size:10,
          shipdate:'2024-03-02', shipname:'Evergreen Fair Seas', portname: 'San Pedro',
            customerid: 15, customerName:'Springfield',
            shipid:123},
  ]});
});

router.get('/containers', function(req, res, next) {
  const stmt = db.prepare('SELECT containerNumber, containerSize, dateContainerShipped, nameOfShip from containers');
  containers = stmt.all();
  //console.log(containers);
  res.json({containers: containers});
});

router.get('/container/:containerNumber', function(req, res, next) {
  const stmt = db.prepare('SELECT containerNumber, containerSize, dateContainerShipped, nameOfShip from containers WHERE containerNumber = ?');
  containers = stmt.all(req.params.containerNumber);
  //console.log(containers);
  res.json({containers: containers});
});

router.post('/container', function(req, res, next) {
  const newContainer = req.body;

  const stmt = db.prepare('INSERT INTO containers (containerNumber, containerSize, dateContainerShipped, nameOfShip) VALUES (?, ?, ?, ?)');
  const info = stmt.run(newContainer.containerNumber, newContainer.containerSize, newContainer.dateContainerShipped, newContainer.nameOfShip);

  if (info.changes !== 1) {
    res.status(400).json({error: 'Container not added'});
    return;
  }
  res.json({containers:[{containerNumber: newContainer.containerNumber}]});
});

module.exports = router;
