// import User from "../../models/User.js";
const authform = document.getElementById("authform");

const jsonCookie = document.cookie.split("; ").find(row => row.startsWith("token="));
const token = jsonCookie.split("=")[1];
console.log(token);

authform.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.querySelector("input[name='email']").value;
        const password = document.querySelector("input[name='password']").value;

        fetch("/connexion", {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                        "authorization": "Bearer " + window.cookie.get("token")
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




