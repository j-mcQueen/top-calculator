const calculator = () => {
    const display = document.querySelector(".calculation p");
    const btns = document.querySelectorAll("button");
    let components = {};

    const add = (a, b) => {
        display.textContent = ((+a) + (+b));
        components.a = display.textContent;
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

            case "*":
                multiply(x, y);
                break;
            
            case "/":
                divide(x, y);
                break;

            case "%":
                hundredth(x);
                break;
        }
    }

    btns.forEach(btn => btn.addEventListener("click", (e) => {
        let character = e.target.value;
        let name = e.target.className;

        const componentsTest = () => {
            components.a === undefined ? components.a = display.textContent : components.b = display.textContent;
            // can you think of a more efficient way to abide by the DRY principle?
        };

        const highlightButton = () => {
            // activate operator buttons - can this be optimised further? 
            e.target.classList.toggle("active");
            if (e.target.classList.contains("active")) {
                e.target.setAttribute("style", "background-color: white; transition: 0.4s ease;");
            }

            e.target.addEventListener("focusout", () => {
                if (e.target.classList.contains("active")) {
                    e.target.classList.toggle("active");
                    e.target.setAttribute("style", "background-color: rgb(19, 228, 130); transition: 0.4s ease;");
                }

                display.textContent = "";
            });
        };

        switch (name) {
            case "action":
                switch (character) { // which action button?
                    case "AC":
                        break;
                    
                    case "CE":
                        display.textContent = 0;
                        break;
                }
                break;
            
            case "hundredth":
                // hundredth
                components.operator = "%";
                let x = display.textContent;
                operate(x, components.operator);
                break;

            case "operator":
                highlightButton();
                componentsTest();

                switch (character) { // which operator button?
                    case "/":
                        // divide
                        components.operator = "/";
                        break;

                    case "*":
                        // multiply
                        components.operator = "*";
                        break;

                    case "-":
                        components.operator = "-";
                        break;
                    
                    case "+":
                        components.operator = "+";
                        if (components.b !== undefined) {
                            operate(components.a, components.operator, components.b);
                        }
                        break;
                }
                break;
            
            case "number":
                if (display.textContent === "0") { display.textContent = "" }

                display.textContent += character;
                break;

            case "equals":
                // calculate
                componentsTest();
                operate(components.a, components.operator, components.b);
                break;
        }
    }));
}

calculator();

// instead of an array, consider using an object to contain everything you need to use the operate() function. This makes it easier to reset the values when the equals button is pressed.