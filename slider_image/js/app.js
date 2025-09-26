const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
const slide = document.querySelector(".slide");

nextButton.addEventListener("click", () => {
    const items = document.querySelectorAll(".item");
    slide.appendChild(items[0]);
});
prevButton.addEventListener("click", () => {
    const items = document.querySelectorAll(".item");
    slide.prepend(items[items.length - 1]);
});
