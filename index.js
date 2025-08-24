const express = require('express');
const app = express();
app.use(express.json());

let shoes = [
    { 
        id: 1, 
        brand: 'Adidas', 
        model: 'UltraBoost 2024', 
        size: '42', 
        color: 'Blue', 
        price: '6000', 
        stock: '7' 
    },
    { 
        id: 2, 
        brand: 'Nike', 
        model: 'Air Max 270', 
        size: '43', 
        color: 'Black/Red', 
        price: '5800', 
        stock: '10' 
    },
    { 
        id: 3, 
        brand: 'Puma', 
        model: 'RS-X', 
        size: '41', 
        color: 'White/Green', 
        price: '5000', 
        stock: '5' 
    },
    {   id: 4, 
        brand: 'New Balance', 
        model: '990v5', 
        size: '44', 
        color: 'Grey', 
        price: '6200', 
        stock: '8' 
    },
    { 
        id: 5, 
        brand: 'Reebok', 
        model: 'Nano X3', 
        size: '42', 
        color: 'Black/Blue', 
        price: '5500', 
        stock: '6' 
    } 
];

app.get('/shoes', (_, res) => res.json(shoes));

app.post('/shoes', (req, res) => {
  if (Object.values(req.body).some(v => !v)) return res.status(400).send({ message: 'Missing details' });
  const shoe = { id: shoes.length + 1, ...req.body };
  shoes.push(shoe);
  res.status(201).send({ message: 'Added!', shoe });
});

app.put('/shoes/:id', (req, res) => {
  const i = shoes.findIndex(s => s.id == req.params.id);
  if (i < 0) return res.status(404).send({ message: 'Not found' });
  shoes[i] = { id: +req.params.id, ...req.body };
  res.send({ message: 'Updated!', shoe: shoes[i] });
});

app.delete('/shoes/:id', (req, res) => {
  const i = shoes.findIndex(s => s.id == req.params.id);
  if (i < 0) return res.status(404).send({ message: 'Not found' });
  shoes.splice(i, 1);
  res.send({ message: 'Deleted!' });
});

app.listen(3000, () => console.log('Running on http://localhost:3000'));