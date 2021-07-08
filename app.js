function player(name) {
  let PlayerName = name;
  return {
    PlayerName,
  };
}
//Form submit and displaying player names logic
(function () {
  const pressBtnToChoose = document.body.querySelector(".selectWhoChooses");
  const SelectElement = document.body.querySelector(".SelectElement");
  const SubBtn = document.body.querySelector(".btn");
  let WhoWon = document.body.querySelector(".WhoWon");
  let CheckDecidePlayerBtn = 0;

  pressBtnToChoose.addEventListener("click", FindWhoChooses);
  SubBtn.addEventListener("click", SubmitForm);

  function FindWhoChooses(e) {
    e.preventDefault();

    SelectElement.style["pointer-events"] = "initial";
    SelectElement.style.opacity = "1";
    DisableRandomSelectorBtn();
    DecideWhoChooses();
  }

  function DisableRandomSelectorBtn() {
    pressBtnToChoose.style["pointer-events"] = "none";
    pressBtnToChoose.style.opacity = "0.4";
  }

  function DecideWhoChooses() {
    let sym = Math.floor(Math.random() * (1 + 1) + 0);

    if (sym == 1) {
      WhoWon.textContent = "Player1 will choose";
      WhoWon.setAttribute("data", "player1");
    } else {
      WhoWon.textContent = "Player2 will choose";
      WhoWon.setAttribute("data", "player2");
    }
    CheckDecidePlayerBtn = 1;
  }

  function CheckIfEmpty(p1, p2) {
    if (p1 === "" || p2 == "") {
      return false;
    } else {
      return true;
    }
  }

  function SubmitForm(e) {
    e.preventDefault();

    if (CheckDecidePlayerBtn == 0) {
      alert("Press the random Selector Button First");
    } else {
      let Player1 = player(document.getElementById("myForm").elements[0].value);
      let Player2 = player(document.getElementById("myForm").elements[1].value);

      if (CheckIfEmpty(Player1.PlayerName, Player2.PlayerName)) {
        let PlayerWhoSelected = WhoWon.getAttribute("data");
        console.log(PlayerWhoSelected);
        FillPlayerNames(Player1, Player2, PlayerWhoSelected);
        let modalDisplay = document.body.querySelector(".modal");
        modalDisplay.style.display = "none";
      } else {
        alert("Fill all the values");
      }
    }
  }

  function FillPlayerNames(Player1, Player2, PlayerWhoSelected) {
    let getWhatPlayerChose = document.querySelector(".SelectElement").value;
    let symbols = GetWhichSymbol(getWhatPlayerChose);

    let player1Text = document.body.querySelector(".p1name");
    let player1Symbol = document.body.querySelector(".p1sym");
    let player2Text = document.body.querySelector(".p2name");
    let player2Symbol = document.body.querySelector(".p2sym");
    if (PlayerWhoSelected === "player1") {
      player1Text.textContent = Player1.PlayerName;
      player1Symbol.textContent = symbols.PlayerWhoSelectedSymbol;
      player2Text.textContent = Player2.PlayerName;
      player2Symbol.textContent = symbols.OtherPlayerSymbol;
    } else {
      player1Text.textContent = Player1.PlayerName;
      player1Symbol.textContent = symbols.OtherPlayerSymbol;
      player2Text.textContent = Player2.PlayerName;
      player2Symbol.textContent = symbols.PlayerWhoSelectedSymbol;
    }
  }

  function GetWhichSymbol(getWhatPlayerChose) {
    let PlayerWhoSelectedSymbol = getWhatPlayerChose;
    if (PlayerWhoSelectedSymbol == "X") {
      OtherPlayerSymbol = "O";
    } else {
      OtherPlayerSymbol = "X";
    }

    return {
      PlayerWhoSelectedSymbol,
      OtherPlayerSymbol,
    };
  }
  //Game logic
  (function () {
    let gridCont = document.body.querySelector(".grid-cont");
    let ArrToBeFilled;
    let getWhatPlayerChose = document.querySelector(".SelectElement").value;
    window.addEventListener("load", (ArrToBeFilled = fillGrid()));

    // Fill grid fills the page with the layout when page loads.
    function fillGrid() {
      let grid = 9;

      let gridArr = [];
      for (let i = 0; i < grid; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("gam-layout");
        newDiv.setAttribute("id", `${i}`);
        gridArr.push(newDiv);
        gridCont.appendChild(newDiv);
      }
      return gridArr;
    }
    let randomSym = getWhatPlayerChose;
    let ComparArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    function logicGame(arr) {
      arr.forEach(function (e) {
        e.addEventListener("click", () => {
          ClickedSquare(e);
        });
      });
    }

    function ClickedSquare(e) {
      let oldVal;
      if (e.textContent == "") {
        ComparArr[Number(e.id)] = randomSym;
        e.textContent = randomSym;
        oldVal = randomSym;
        randomSym = check(randomSym);
      } else {
        return;
      }
      CheckWhoWonTheGame(oldVal);
    }

    function CheckWhoWonTheGame(old) {
      const Res = document.body.querySelector(".Result");
      const reset = document.body.querySelector(".reset");
      if (
        (ComparArr[0] == ComparArr[1] && ComparArr[0] == ComparArr[2]) ||
        (ComparArr[2] == ComparArr[5] && ComparArr[2] == ComparArr[8]) ||
        (ComparArr[6] == ComparArr[7] && ComparArr[6] == ComparArr[8]) ||
        (ComparArr[0] == ComparArr[3] && ComparArr[0] == ComparArr[6]) ||
        (ComparArr[1] == ComparArr[4] && ComparArr[1] == ComparArr[7]) ||
        (ComparArr[3] == ComparArr[4] && ComparArr[3] == ComparArr[5]) ||
        (ComparArr[0] == ComparArr[4] && ComparArr[0] == ComparArr[8]) ||
        (ComparArr[2] == ComparArr[4] && ComparArr[2] == ComparArr[6])
      ) {
        let player1Text = document.body.querySelector(".p1name");
        let player1Symbol = document.body.querySelector(".p1sym");
        let player2Text = document.body.querySelector(".p2name");
        let player2Symbol = document.body.querySelector(".p2sym");

        if (player1Symbol.textContent == old) {
          Res.textContent = `${player1Text.textContent} with symbol ${old} wins the game, click on the reset button to start again`;
        } else {
          Res.textContent = `${player2Text.textContent} with symbol ${old} wins the game, click on the reset button to start again`;
        }

        gridCont.classList.add("avoid-point");

        reset.addEventListener("click", function () {
          ArrToBeFilled = rst(gridCont, Res);
          ComparArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          logicGame(ArrToBeFilled);
        });
      }

      checkForDraw(Res, reset);
    }

    function checkForDraw(Res, reset) {
      let a = 0;
      for (let i = 0; i < ComparArr.length; i++) {
        if (ComparArr[i] == "X" || ComparArr[i] == "O") {
          a++;
          if (a == 9) {
            Res.textContent = `Its a draw, click on the reset button to start again`;

            gridCont.classList.add("avoid-point");

            reset.addEventListener("click", function () {
              ArrToBeFilled = rst(gridCont, Res);
              ComparArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
              logicGame(ArrToBeFilled);
            });
          }
        } else {
          return;
        }
      }
    }

    logicGame(ArrToBeFilled);
    function check(rand) {
      if (rand == "X") {
        return "O";
      } else {
        return "X";
      }
    }

    function rst(gridToRst, result) {
      gridToRst.innerHTML = "";
      gridToRst.classList.remove("avoid-point");
      result.textContent = "";
      ArrFill = "";

      ArrFill = fillGrid();
      return ArrFill;
    }
  })();
})();
