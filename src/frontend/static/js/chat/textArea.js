const textarea = document.getElementById("textArea");
const inputBar = document.getElementById("input");
const selector = document.getElementById("selector");
const modeButton = document.getElementById("modeButton");
const modelButtonList = document.querySelectorAll(".model");
const modelLists = document.querySelectorAll(".modelList");
let mode = "voice";

inputBar.style.width = `${window.innerWidth - 100}px`;

textarea.addEventListener("input", () => {
  textarea.style.height = "20px";
  inputBar.style.height = "50px";
  textarea.style.height = `${textarea.scrollHeight}px`;
  inputBar.style.height = `${textarea.scrollHeight}px`;
});

window.addEventListener("resize", function () {
  inputBar.style.width = `${window.innerWidth - 100}px`;
});

modeButton.addEventListener("click", () => {
  selector.classList.toggle("translate");
  if (mode === "voice") {
    mode = "chat";
    modeButton.style.backgroundColor = "#16A27F";
  } else {
    mode = "voice";
    modeButton.style.backgroundColor = "#363636";
  }
});

modelLists.forEach((modelList) => {
  modelList.style.height = "28px";
  modelList.addEventListener("mouseenter", (e) => {
    const modelToSelect = modelList.querySelector(".modelToSelect");
    const liElements = modelToSelect.querySelectorAll("li");
    const cantidadLi = liElements.length;
    e.target.style.height = `${28 * cantidadLi + 28}px`;
  });
  modelList.addEventListener("mouseleave", (e) => {
    e.target.style.height = "28px";
  });
});

modelButtonList.forEach(modelButton => {
  modelButton.addEventListener('click', () => {
    console.log('jaja')
    window.package.send("openConfig", null); 
  })
})