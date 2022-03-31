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
            case "+":
                add(x, y);
                break;
            
            case "-":
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
        if (display.textContent === "0") { display.textContent = "" };

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

            case "=":
                // calculate
                let expression = display.textContent;
                console.log(expression);
                break;

            default:
                display.textContent += character;
        }
    }));
}

calculator();