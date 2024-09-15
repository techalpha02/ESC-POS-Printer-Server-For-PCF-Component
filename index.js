const express = require('express');
const cors = require('cors');
const escpos = require('escpos');
escpos.USB = require('escpos-usb');

const app = express();
const port = 3000;
const device = new escpos.USB();
const options = {encoding: "GB18030"};
const printer = new escpos.Printer(device, options);

app.use(cors());

app.use(express.json());

app.get('/api/data', (req, res) => {
  device.open(function(error) {
    if(error) {
      res.json({ message: 'Node.js API did not find a USB printer!' });
      return;
    }
  });
  res.json({ message: 'Node.js API found a USB printer!' });
});

app.post('/print', (req, res) => {
  res.json(
    { status: 'sucess' }
  )
  console.log(req.body)
  print(req.body.text)
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const print = (text) => {
  device.open(function(error) {
    if(error) {
      console.error(error);
      return;
    }
    printer
    .font('a')
    .align('ct')
    .style('bu')
    .size(1, 1)
    .text(text)
    .cut()
    .close();
  });
}