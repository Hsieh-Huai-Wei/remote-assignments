function avg(data) {
  total = 0;

  // console.log(data.size)
  for (let i = 0; i < data['size']; i++) {
    total = total + data['products'][i]['price']
  }

  ans = total / (data['size']);
  return ans;
}

console.log(
  avg({
    size: 3,
    products: [
      {
        name: "Product 1",
        price: 100
      },
      {
        name: "Product 2",
        price: 700
      },
      {
        name: "Product 3",
        price: 250
      }
    ]
  })
) // should print the average price of all products

