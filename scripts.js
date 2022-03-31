const calculator = () => {
    const display = document.querySelector(".calculation p");
    const btns = document.querySelectorAll("button");

    const add = (a, b) => {
        console.log(a + b);
    }

    const subtract = (a, b) => {
        console.log(a - b);
    }

    const multiply = (a, b) => {
        console.log(a * b);
    }

    const divide = (a, b) => {
        console.log(a / b);
    }

    const hundredth = (a) => {
        display.textContent = (a / 100);
    }

    const operate = (x, operator, y) => {
        switch (operator) {
            case "&plus;":
                add(x, y);
                break;
            
            case "&#8722;":
                subtract(x, y);
                break;

            case "&#215;":
                multiply(x, y);
                break;
            
            case "&#247;":
                divide(x, y);
                break;

            case "%":
                hundredth(x);
                break;
        }
    }

    btns.forEach(btn => btn.addEventListener("click", (e) => {
        let character = e.target.value;
        let operator = "";

        switch (character) {
            case "AC":
                break;
            
            case "CE":
                display.textContent = 0;
                break;

            case "%":
                // hundredth
                operator = "%";
                let x = display.textContent;
                operate(x, operator);
                break;
            
            case "&#247;":
                // divide
                operator = "&247;";
                display.textContent = character;
                break;
            
            case "&#215;":
                // multiply
                operator = "&#215;";
                break;

            case "&#8722;":
                // subtract
                operator = "&#8722;";
                break;

            case "&plus;":
                // add
                operator = "&plus;";
                break;

            case "&equals;":
                // calculate
                break;

            default:
                display.textContent = character;
        }
    }));
}

calculator();