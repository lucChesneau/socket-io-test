// import User from "../../models/User.js";
const authform = document.getElementById("authform");



authform.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.querySelector("input[name='email']").value;
        const password = document.querySelector("input[name='password']").value;

        fetch("/connexion", {
                method: "POST",
                headers: {
                        "Content-Type": "application/json"
                },
                body: JSON.stringify({
                        email: email,
                        password: password
                })

})
.then((res) => res.json())
.then((data) => {

        console.log(data);



}).catch(err => {
        console.log(err);
}
)


});




