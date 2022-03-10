const expression = () => {
    const display = document.querySelector(".calculation p");
    const btns = document.querySelectorAll("button");

    btns.forEach(btn => btn.addEventListener("click", (e) => {
        let character = e.target.value;

        switch (character) {
            case "AC":
                break;
            
            case "CE":
                display.textContent = 0;
                break;

            case "&#37;":
                // hundredth
                break;
            
            case "&#247;":
                // divide
                display.textContent = character;
                break;
            
            case "&#215;":
                // multiply
                break;

            case "&#8722;":
                // subtract
                break;

            case "&plus;":
                // add
                break;

            case "&equals;":
                // calculate
                break;

            default:
                display.textContent = character;
        }
    }));
}

expression();