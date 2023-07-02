function pilihanCOm() {
  const comp = Math.random();
  if (comp < 0.34) return "kertas";
  if (comp >= 0.34 && comp < 0.67) return "batu";
  return "gunting";
}

function getHasil(comp, player) {
  if (player == comp) return "SERI";
  if (player == "kertas") return comp == "batu" ? "MENANG!" : "KALAH!";
  if (player == "batu") return comp == "kertas" ? "KALAH!" : "MENANG!";
  if (player == "gunting") return comp == "batu" ? "KALAH!" : "MENANG!";
}

const getScore = (hasil) => {
  const notifWon = document.querySelector(".won-none");
  const notifLost = document.querySelector(".lost-none");
  const notifDraw = document.querySelector(".draw-none");
  const scorePlayer = document.querySelector(".player");
  const scoreComp = document.querySelector(".computer");
  let scoreP = parseFloat(scorePlayer.textContent);
  let scoreC = parseFloat(scoreComp.textContent);

  if (hasil == "MENANG!") {
    const btnOk = document.querySelector(".btn-ok-won");
    notifWon.setAttribute("class", "won");
    btnOk.addEventListener("click", () => {
      notifWon.setAttribute("class", "won-none");
      scoreP += 1;
      scorePlayer.innerHTML = scoreP;
    });
  } else if (hasil == "KALAH!") {
    const btnOk = document.querySelector(".btn-ok-lost");
    notifLost.setAttribute("class", "lost");
    btnOk.addEventListener("click", () => {
      notifLost.setAttribute("class", "lost-none");
      scoreC += 1;
      scoreComp.innerHTML = scoreC;
    });
  } else {
    const btnOk = document.querySelector(".btn-ok-draw");
    notifDraw.setAttribute("class", "draw");
    btnOk.addEventListener("click", () => {
      notifDraw.setAttribute("class", "draw-none");
    });
  }
};

function acakImg() {
  const imgComp = document.querySelector(".imgs-comp");
  const img = ["kertas", "batu", "gunting"];
  const timeStart = new Date().getTime();
  let i = 0;
  setInterval(() => {
    if (new Date().getTime() - timeStart > 1000) return clearInterval;
    imgComp.setAttribute("src", "asets/img/" + img[i++] + ".png");
    if (i == img.length) i = 0;
  }, 100);
}

const imgPil = document.querySelectorAll(".imgs img");
imgPil.forEach((pil) => {
  pil.addEventListener("click", () => {
    const pilComp = pilihanCOm();
    const pilPlayer = pil.className;
    const hasil = getHasil(pilComp, pilPlayer);
    acakImg();
    setTimeout(() => {
      const imgComp = document.querySelector(".imgs-comp");
      imgComp.setAttribute("src", "asets/img/" + pilComp + ".png");
      getScore(hasil);
    }, 1000);
  });
});

function reset() {
  const btnReset = document.querySelector(".btn-reset");
  const scorePlayer = document.querySelector(".player");
  const scoreComp = document.querySelector(".computer");

  btnReset.addEventListener("click", () => {
    scorePlayer.innerHTML = "0";
    scoreComp.innerHTML = "0";
  });
}
reset();

function dropMenu() {
  const dropMenu = document.querySelector(".drop-menu-container-none");
  const bars = document.getElementById("hamburger");

  bars.addEventListener("click", () => {
    dropMenu.classList.toggle("drop-menu-container-none");
    dropMenu.classList.toggle("drop-menu-container");
    bars.style.transition = "0.5s ease-out";
    bars.style.transform = dropMenu.classList.contains("drop-menu-container") ? "rotate(90deg)" : "rotate(0)";
  });
  
  document.addEventListener("click", (e) => {
    if(!bars.contains(e.target) && !dropMenu.contains(e.target)){
      bars.style.transform = "rotate(0)";
      dropMenu.classList.replace("drop-menu-container", "drop-menu-container-none");
    }
  });
}
dropMenu();