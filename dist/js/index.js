(function() {
  var swInstance = new ScrollWatch({});
})();
// Toggle Menu
toggleMenu = () => {
  var menu = document.querySelector(".menuDrop");
  menu.classList.toggle("active");
};
// slider

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";

  var backImg = document.querySelector(".iPhoneWrap");

  if (n === 2) {
    backImg.style.backgroundColor = "#7141f4";
  } else if (n === 3) {
    backImg.style.backgroundColor = "#42f4a7";
  } else if (n === 4) {
    backImg.style.backgroundColor = "#f44158";
  } else {
    backImg.style.backgroundColor = "#26e6e6";
  }
}
