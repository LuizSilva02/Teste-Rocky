
const fs = require('fs');

let rawdata = fs.readFileSync('boken-database.json');
let products = JSON.parse(rawdata);

products.map(product => {
  product.name = product.name.replace(/æ/g, "a");
  product.name = product.name.replace(/¢/g, "c");
  product.name = product.name.replace(/ø/g, "o");
  product.name = product.name.replace(/ß/g, "b");

  const price = product.price;

  if(typeof price === 'string') {
    product.price = parseFloat(price);
  }

  if(!product.quantity) {
    product.quantity = 0;
  }
})

let data = JSON.stringify(products, null, 2);
fs.writeFileSync('database.json', data);

function orderByCategoryAndId(data) {
  let sortByName = data.sort((a, b) => `${a.name}`.localeCompare(b.name));

  let sortById = sortByName.sort((a, b) => a.id - b.id).map(products => products.name);

  return sortById;
}

function calculateCategoryValue(data) {
  const categories = data.map(product => product.category);

  let obj = {};

  for(let category of categories) {
    obj[category] = data.filter(product => product.category === category).reduce((accumulated, item) => accumulated + item.price, 0)
  }
  
  return obj;
}

console.log(calculateCategoryValue(products))