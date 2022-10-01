// import User from "../../models/User.js";


const authform = document.getElementById("registerForm");



authform.addEventListener("submit", (e) => {
        e.preventDefault();

        const firstName = document.querySelector("input[name='firstName']").value;
        const lastName = document.querySelector("input[name='lastName']").value;
        const email = document.querySelector("input[name='email']").value;
        const username = document.querySelector("input[name='username']").value;
        const password = document.querySelector("input[name='password']").value;
        const confirmPassword = document.querySelector("input[name='confirmPassword']").value;



        fetch("/register", {
                method: "POST",
                headers: {
                        "Content-Type": "application/json"
                },
                body: JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        username: username,
                        password: password,
                        confirmPassword: confirmPassword
                })
        })
        .then((res) => res.json())
        .then((data) => {
                console.log(data.redirect);
                if(data.redirect) {
                        window.location.href = data.redirect;
                }
        })
        .catch(err => {
                console.log(err);
        });


        


})


// function debugDeFou() {
//         const username = document.querySelector("input[name='username']").value;
//         const password = document.querySelector("input[name='password']").value;
//         const confirmPassword = document.querySelector("input[name='confirmPassword']").value;

//         console.log(username);
//         console.log(password);
//         console.log(confirmPassword);
// }

// const debugButton = document.querySelector("button[type='submit']");

// debugButton.addEventListener("click", (e) => {
//         e.preventDefault();
//         debugDeFou();
// })
