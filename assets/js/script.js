// // window.onload = function() {
// //   document.getElementById("loginModal").style.display = "block";
// // };

// // Handle the form submission to check username and password
// document.getElementById("loginform").onsubmit = function(event) {
//   event.preventDefault(); // Prevent form from submitting

//   // Get the username and password values
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   let storedUsers = JSON.parse(localStorage.getItem("users")) || {};

//   // Check if the credentials match
//   if (username === "admin" && password === "123") {
//       Swal.fire({
//           title: "Login Successful!",
//           text: "Welcome, Admin!",
//           icon: "success",
//           timer: 2000, // Auto-close after 2 seconds
//           showConfirmButton: false
//       });
//      document.getElementById("loginModal").style.display = "none";

//       // Delay the redirection by 2 seconds
//       setTimeout(() => {
//           window.location.href = "../../pages/Home-Page/index.html";
//       }, 2000);

//       return; // Stop further execution
//   }

//   if (username === "client" && password === "123") {
//       Swal.fire({
//           title: "Login Successful!",
//           text: "Welcome, Client!",
//           icon: "success",
//           timer: 2000,
//           showConfirmButton: false
//       });
      
//       // Delay the redirection by 2 seconds
//       setTimeout(() => {
//           window.location.href = "../../pages/About-Page/index.html";
//       }, 2000);

//       return; // Stop further execution
//   }

//   // If neither condition is met, show an error message
//   document.getElementById("errorMessage").style.display = "block";
// };


// document.getElementById("Create").addEventListener("click", function() {
//   Swal.fire({
//       title: "Create Account",
//       html:
//           `<input type="text" id="newUsername" class="swal2-input" placeholder="Username" required>
//            <input type="password" id="newPassword" class="swal2-input" placeholder="Password" required>`,
//       showCancelButton: true,
//       confirmButtonText: "Register",
//       cancelButtonText: "Cancel",
//       preConfirm: () => {
//           let newUsername = document.getElementById("newUsername").value;
//           let newPassword = document.getElementById("newPassword").value;

//           if (!newUsername || !newPassword) {
//               Swal.showValidationMessage("All fields are required!");
//           }

//           return { newUsername, newPassword };
//       }
//   }).then((result) => {
//       if (result.isConfirmed) {
//           Swal.fire("Success!", "Your account has been created.", "success");
//           // Here you can add logic to save the new account
//       }
//   });
// });

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify({ admin: "123" }));
}

// Handle the form submission to check username and password

document.getElementById("loginform").onsubmit = function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get the username and password values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Retrieve stored accounts from local storage
    let storedUsers = JSON.parse(localStorage.getItem("users")) || {};
    if (username === "admin" && password === "123") {
        Swal.fire({
            title: "Login Successful!",
            text: "Welcome, Admin!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
        });

        document.getElementById("loginModal").style.display = "none";

        // Redirect Admin to Home Page
        setTimeout(() => {
            window.location.href = "/pages/Home-Page/index.html";
        }, 2000);
        return; // Stop further execution
    } 
    // Check if the entered credentials match stored ones
    if (username in storedUsers && storedUsers[username] === password) {
        Swal.fire({
            title: "Login Successful!",
            text: `Welcome, ${username}!`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false
        });
        setTimeout(() => {
                window.location.href = "../../pages/About-Page/index.html";
                  }, 2000);

        document.getElementById("loginModal").style.display = "none";
        return; // Stop further execution
    }

    // If neither condition is met, show an error message
    document.getElementById("errorMessage").style.display = "block";
};

// Handle account creation
document.getElementById("Create").addEventListener("click", function() {
  
    Swal.fire({
        title: "Create Account",
        html:
            `<input type="text" id="newUsername" class="swal2-input" placeholder="Username" required>
             <input type="password" id="newPassword" class="swal2-input" placeholder="Password" required>`,
        showCancelButton: true,
        confirmButtonText: "Register",
        cancelButtonText: "Cancel",

        preConfirm: () => {
            let newUsername = document.getElementById("newUsername").value.trim();
            let newPassword = document.getElementById("newPassword").value.trim();

            if (!newUsername || !newPassword) {
                Swal.showValidationMessage("All fields are required!");
                return false;
            }

            // Retrieve stored accounts from local storage
            let storedUsers = JSON.parse(localStorage.getItem("users")) || {};

            // Check if the username already exists
            if (newUsername in storedUsers) {
                Swal.showValidationMessage("Username already exists!");
                return false;
            }

            // Save the new account to local storage
            storedUsers[newUsername] = newPassword;
            localStorage.setItem("users", JSON.stringify(storedUsers));

            return { newUsername, newPassword };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Success!", "Your account has been created.", "success");
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
        }
    });
});
