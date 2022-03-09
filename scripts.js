// group id attributes of buttons into array

const expression = () => {
    const display = document.querySelector(".calculation p");
    const btns = document.querySelectorAll("button");

    btns.forEach(btn => btn.addEventListener("click", (e) => {
        let character = e.target.value;

        if (character === "AC") {

        } else if (character === "CE") {
            display.textContent = 0;
        } else if (character === "%") {
            
        }

        display.textContent = character;
    }));
}

expression();