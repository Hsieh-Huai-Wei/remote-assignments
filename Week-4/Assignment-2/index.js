function ajax(src, callback) {
  var xhr = new XMLHttpRequest();

  var data = [];

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // console.log(xhr.response);
      var data = JSON.parse(xhr.response);
      // var data = xhr.response;
      callback(data);
    }
  };

  xhr.open("GET", src, true);

  xhr.send();
}

function render(data) {
  console.log(data);

  for (let i = 0; i < 3; i++) {
    const user = data[i];
    const name = `${user.name}`;
    const price = `${user.price}`;
    const description = `${user.description}`;
    const container = document.querySelector(".container");
    const div = document.createElement("div");
    div.innerHTML = `
          <div class="item">
            <h3>${i + 1}.${name}</h3>
            <ul>
              <li>Price : ${price}</li>
              <li>${description}</li>
            </ul>
          </div>
        `;
    container.appendChild(div);
  }
}

ajax(
  "https://cwpeng.github.io/live-records-samples/data/products.json",
  function (response) {
    render(response);
  }
);

// const container = document.querySelector('.container')
// const h1 = document.createElement('h1')
// h1.innerHTML = 'This sentence is created by JavaScript'
// container.appendChild(h1)
