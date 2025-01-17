document.addEventListener("DOMContentLoaded", function() {
    const users = document.getElementById("users");

    const response = fetch("https://dummyjson.com/users");

    // fetch() returns a promise object
    console.log(response);
    // If that Promise object is fullfilled,
    // it will be resolved with the Response object representing the server's response
    // which results in PromiseResult in the PromiseObject

    response.then(
        (res) => {
            // response.then() returns a Response object
            // res is a response object
            console.log(res);

            // json() is a method of Response object
            // json() takes a Response stream and reads it
            // it returns a promise which resolves with the result of parsing the body text as JSON
            return res.json();
        }
    ).then(
        (data) => {
            console.log(data);

            const users = data.users;

            for (let user of users) {
                fillCard(user);
            }

            return users;
        }
    ).then(
        (users) => console.log(users)
    )
    .catch(
        (error) => console.log(error)
    )

    function fillCard(user) {
        let cardHolder = document.createElement('div');

        cardHolder.className = "px-3 mt-3 card-holder";

        let newCard = `
        <div class="card">
            <img class="card-img-top avatar" src="https://as2.ftcdn.net/v2/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${user.firstName} ${user.lastName}</h5>
                <p class="card-text"><strong>Tuổi:</strong> ${user.age}</p>
                <p class="card-text"><strong>Email:</strong> ${user.email}</p>
                <p class="card-text"><strong>Địa chỉ:</strong> ${concatAddress(user.address)}</p>
            </div>
        </div>
        `;

        cardHolder.innerHTML = newCard;

        users.append(cardHolder);
    }

    function concatAddress(address) {
        return `${address.address}, ${address.city}, ${address.state}`;
    }

    let async1 = setTimeout(
        function() {
            console.log("Async 1");
        }, 1003
    )

    let async2 = setTimeout(
        function() {
            console.log("Async 2");
        }, 1001
    )
    
    let async3 = setTimeout(
        function() {
            console.log("Async 3");
        }, 1002
    )

    let async4 = setTimeout(
        function() {
            console.log("Async 4");
        }, 1000
    )

    async function testResponse() {
        const response = await fetch("https://dummyjson.com/users"); // ~ response = fetch("https://dummyjson.com/users"); response.then();
        console.log(response);

        const data = await response.json();
        console.log(data);
    }

    testResponse();
})