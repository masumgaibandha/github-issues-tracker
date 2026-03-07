const signBtn = document.getElementById('sign-btn').addEventListener('click', function(e){
    // e.preventDefault()
    const userNameInput = document.getElementById('user-name')
    const userInput = userNameInput.value; 
    console.log(userInput)
    const passwordInput = document.getElementById('password')
    const password = passwordInput.value; 
    if(userInput === "admin" && password === "admin123"){
        alert('Logged In successful')
    }
    else{
        alert("Input valid credential");
        return
    }
})