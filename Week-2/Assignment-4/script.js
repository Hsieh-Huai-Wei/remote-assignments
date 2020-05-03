let hello = document.getElementById('hello');
let changeText = document.getElementById('banner');
let btn = document.querySelector('.btn');
let newItem = document.getElementsByClassName("item2")


changeText.addEventListener('click', () => {
  hello.innerHTML = 'Have a Good Time!';
})

btn.addEventListener('click', () => {
  for (let i = 0; i < newItem.length; i++) {
    newItem[i].style.display = "block";
  }
})

let close = document.getElementById('close_icon')
let burgerClose = document.getElementById('burger')

close.addEventListener('click', () => {
  burgerClose.click()
});