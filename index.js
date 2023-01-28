const username=document.getElementById("username");
const password=document.getElementById("password");
const login_button=document.querySelector("#login_button");

window.history.forward();

login_button.addEventListener("click", function verifyCredentials(){

    const storedUsername=localStorage.getItem("username");
    const storedPassword=localStorage.getItem("password");
    console.log(typeof username.value);
    console.log(typeof storedUsername);
    if(username.value===storedUsername && password.value===storedPassword)
    {
        window.location.href="resumePage.html";
    }
    else
    {
        document.getElementById("error_msg").style.visibility="visible";
    }

   // console.log(storedPassword,storedUsername);
});
