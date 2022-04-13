const calculator = () => {
    const display = document.querySelector(".calculation p");
    const btns = document.querySelectorAll("button");
    let components = {};

    const add = (a, b) => {
        console.log( (+a) + (+b) );
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
        let character = e.target.value;
        let name = e.target.className;

        switch (name) {
            case "action":
                switch (character) { // which action button?
                    case "AC":
                        break;
                    
                    case "CE":
                        display.textContent = 0;
                        break;
                }
            
            case "hundredth":
                // hundredth
                operator = "%";
                let x = display.textContent;
                operate(x, operator);
                break;

            case "operator":
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

                components.a === undefined ? components.a = display.textContent : components.b = display.textContent;

                switch (character) { // which operator button?
                    case "&#247;":
                        // divide
                        components.operator = "&#247;";
                        break;

                    case "&#215;":
                        // multiply
                        components.operator = "&#215;";
                        break;

                    case "&#8722;":
                        // subtract
                        components.operator = "-";
                        break;
                    
                    case "+":
                        // add
                        components.operator = "+";

                        if (components.b !== undefined) {
                            console.log(components);
                        }
                        break;
                }
            
            case "number":
                if (display.textContent === "0") { display.textContent = "" }

                display.textContent += character;
                break;

            case "equals":
                // calculate
                // console.log(components);

                // reset value of a to result of previous calculation
                // reset operator value

                // operate(a, operator, b);
                break;
        }
    }));
}

calculator();

// instead of an array, consider using an object to contain everything you need to use the operate() function. This makes it easier to reset the values when the equals button is pressed (see Programming with Mosh's 1 hour course on objects for a reset method)

// array of objects
// a, operator, b
// perform calculation
// result stored as a in next object