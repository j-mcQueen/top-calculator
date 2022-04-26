const calculator = () => {
    const display = document.querySelector(".calculation p");
    const btns = document.querySelectorAll("button");
    let components = {};

    const componentsTest = () => { // checks if operands have been defined and sets them if tests are false
        if (components.a === undefined) {
            components.a = display.textContent;
        } else if ((components.a !== undefined) && (components.operator !== undefined) && (components.b === undefined)) {
            components.b = display.textContent;
        } else if ((components.a !== undefined) && (components.operator === undefined) && (components.b === undefined)) {
            return;
        } // can you think of a better way to tidy this up?
    };

    const manageOperator = (val) => { // operates if components object has been filled, sets the operator otherwise
        if (components.operator !== val && components.b === "") { // for cases where incorrect operator has been selected
            components.operator = val;
            display.textContent = components.a;
            delete components.b;
        }

        if (components.operator !== undefined && components.b !== undefined) {
            operate(components.a, components.operator, components.b);
        }
        components.operator = val;
    };

    const removeB = () => { // permits calculations to only ever be done in pairs
        if (components.b !== undefined) delete components.b;
    };

    const changeSign = (current) => {
        if (current.includes("-")) {
            display.textContent = current.substr(1);
            if ((components.a !== undefined) && (components.operator === undefined) && (components.b === undefined)) {
                components.a = current.substr(1); // reflect changes in display
            }
        } else if (current.includes("-") === false) {
            display.textContent = `-${current}`;
            if ((components.a !== undefined) && (components.operator === undefined) && (components.b === undefined)) {
                components.a = `-${current}`;
            }
        }
    };

    const add = (a, b) => {
        display.textContent = ((+a) + (+b));
        components.a = ((+a) + (+b));
        removeB();
    };

    const subtract = (a, b) => {
        display.textContent = ((+a) - (+b));
        components.a = ((+a) - (+b));
        removeB();
    };

    const multiply = (a, b) => {
        display.textContent = ((+a) * (+b));
        components.a = ((+a) * (+b));
        removeB();
    };

    const divide = (a, b) => {
        display.textContent = ((+a) / (+b));
        components.a = ((+a) / (+b));
        removeB();
    };

    const hundredth = (a) => {
        display.textContent = ((+a) / 100);
        if (components.a === undefined) {
            components.a = display.textContent;
        } else if (components.a !== undefined && components.operator === undefined && components.b === undefined) {
            if (a = (components.a / 100)) { // if % button has been pressed twice in a row
                components.a = display.textContent;
            } else {
                components.b = display.textContent;
            }
        }
    };

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
    };

    btns.forEach(btn => btn.addEventListener("click", (e) => {
        let decimal = document.getElementById("decimal");
        let character = e.target.value;
        let name = e.target.className;

        const highlightButton = () => {
            // activate operator buttons - can this be optimised further?
            e.target.classList.toggle("active");
            if (e.target.classList.contains("active")) {
                e.target.setAttribute("style", "background-color: white; color: rgb(221, 151, 0); transition: 0.4s ease;");
            }

            e.target.addEventListener("blur", () => { // is blur/ focusout the correct event listener? calculation disappears on focusout
                if (e.target.classList.contains("active")) {
                    e.target.classList.toggle("active");
                    e.target.setAttribute("style", "background-color: rgb(221, 151, 0); color: white; transition: 0.4s ease;");
                }
                display.textContent = "";
            });
        };

        const reset = () => {
            display.textContent = 0;
            delete components.a;
            delete components.operator;
            delete components.b;
        };

        switch (name) {
            case "action":
                switch (character) { // which action button?
                    case "+/-":
                        changeSign(display.textContent);
                        break;
                    
                    case "CE":
                        reset();
                        break;
                }
                break;
            
            case "hundredth": // needs fix - pressing this after the second operand causes the calculation to break
                let x = display.textContent;
                operate(x, "%");
                break;

            case "operator":
                highlightButton();
                componentsTest();

                switch (character) { // which operator button?
                    case "/":
                        manageOperator("/");
                        break;

                    case "*":
                        manageOperator("*");
                        break;

                    case "-":
                        manageOperator("-");
                        break;
                    
                    case "+":
                        manageOperator("+");
                        break;
                }
                break;
            
            case "number":
                display.textContent.includes(".") ? decimal.disabled = true : decimal.disabled = false;

                if (display.textContent === "0" && character !== ".") { // ensures 0 decimals are properly formatted
                    display.textContent.replace("0", character);
                    display.textContent = character;
                } else {
                    display.textContent += character;
                }
                break;

            case "equals":
                // calculate
                componentsTest();
                operate(components.a, components.operator, components.b);
                delete components.operator;
                delete components.b;
                break;
        }
    }));
}

calculator();