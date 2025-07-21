const navigation = document.querySelector("nav");

window.addEventListener("scroll", () => {
  // console.log(window.scrollY);
  if (window.scrollY > 120) {
    navigation.style.position = "fixed";
    navigation.style.top = "0";
    navigation.style.left = "0";
    navigation.style.right = "0";
  } else {
    navigation.style.top = "-50px";
  }
});
