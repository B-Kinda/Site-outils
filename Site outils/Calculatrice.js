// Sélection des éléments du DOM
const plus = document.getElementById("+");
const moins = document.getElementById("-");
const fois = document.getElementById("*");
const diviser = document.getElementById("/");
const egal = document.getElementById("=");
const clear = document.getElementById("clearResult");
const button = document.querySelector(".buttons");
const result = document.getElementById("result");
const chiffre = document.querySelector(".nbr");
const navigation = document.querySelector("nav");
const historique = document.getElementById("historyList");
const memoryAdd = document.getElementById("mémoireA");
const memorySub = document.getElementById("mémoireS");
const memoryClear = document.getElementById("mémoireE");
const memoryShow = document.getElementById("mémoireR");
const percent = document.getElementById("percent");
const retour = document.getElementById("backspace");
const random = document.getElementById("random");

window.addEventListener("scroll", () => {
  if (window.scrollY > 120) {
    navigation.style.position = "fixed";
    navigation.style.top = "0";
    navigation.style.left = "0";
    navigation.style.right = "0";
  } else {
    navigation.style.top = "-50px";
  }
});
button.addEventListener("click", (e) => {
  if (e.target.classList.contains("nbr")) {
  }
});

plus.addEventListener("click", () => {
  result.value += "+";
});
moins.addEventListener("click", () => {
  result.value += "-";
});
fois.addEventListener("click", () => {
  result.value += "*";
});
egal.addEventListener("click", () => {
  result.value = eval(result.value);
});
diviser.addEventListener("click", () => {
  result.value += "/";
});
clear.addEventListener("click", () => {
  result.value = "";
});
egal.addEventListener("click", () => {
  try {
    const operation = result.value;

    result.value = evaluation;

    const historyItem = document.createElement("li");

    historique.appendChild(historyItem);
  } catch (error) {
    result.value = "Erreur";
  }
});
memoryAdd.addEventListener("click", () => {
  const currentValue = parseFloat(result.value);
  if (!isNaN(currentValue)) {
    localStorage.setItem("memory", currentValue);
    alert(`Valeur ${currentValue} ajoutée à la mémoire`);
  } else {
    alert("Aucune valeur valide à ajouter à la mémoire");
  }
});
memorySub.addEventListener("click", () => {
  const currentValue = parseFloat(result.value);
  if (!isNaN(currentValue)) {
    const memoryValue = parseFloat(localStorage.getItem("memory")) || 0;
    localStorage.setItem("memory", memoryValue - currentValue);
    alert(`Valeur ${currentValue} soustraite de la mémoire`);
  } else {
    alert("Aucune valeur valide à soustraire de la mémoire");
  }
});
memoryClear.addEventListener("click", () => {
  localStorage.removeItem("memory");
  alert("Mémoire effacée");
});
memoryShow.addEventListener("click", () => {
  const memoryValue = localStorage.getItem("memory");
  if (memoryValue) {
    alert(`Valeur actuelle de la mémoire : ${memoryValue}`);
  } else {
    alert("Aucune valeur dans la mémoire");
  }
});
percent.addEventListener("click", () => {
  const currentValue = parseFloat(result.value);
});
retour.addEventListener("click", () => {
  result.value = result.value.slice(0, -1);
});
random.addEventListener("click", () => {});
