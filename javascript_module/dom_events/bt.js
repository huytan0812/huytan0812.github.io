document.addEventListener("DOMContentLoaded", function() {
    const inputs = document.querySelectorAll('.form-control');

    inputs.forEach(
        function(input) {
            input.addEventListener("keyup", function(event) {
                let parent = input.parentNode;
                let pList = parent.querySelectorAll('.form-sub');

                if (pList.length == 0) {
                    let pNode = document.createElement('p');
                    pNode.className = "form-sub";
                    pNode.innerHTML = input.value;
                    parent.appendChild(pNode);
                }
                else {
                    pList[0].innerHTML = input.value;
                }

            })
        }
    )

    const submitFormBtn = document.getElementById("submit-btn");

    submitFormBtn.addEventListener("click", function(event) {
        event.preventDefault();

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value == "") {
                let pNode = document.createElement('p');
                pNode.className = "form-alert";
                pNode.innerHTML = "Bạn chưa điền vào field này";
                inputs[i].parentNode.appendChild(pNode);
            }
        }
    })

    // Inner function
    function a(name) {
        function b() {
            return `Hello, ${name}`;
        }
        return b();
    }

    let testInnerFn = a("Newtan");

    console.log(testInnerFn);

    // Callback function
    function fn(name, callbackFn) {
        return callbackFn(name);
    }

    function greet(name) {
       return `Hello, ${name}`;
    }

    let testCallbackFn = fn("Newtandev0812", greet);

    console.log(testCallbackFn);
})