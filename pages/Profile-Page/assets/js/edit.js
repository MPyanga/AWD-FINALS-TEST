const API_URL = "https://demo-api-skills.vercel.app/api/EventOrganizer/users";
const group = "admin";

// Listen for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");
    
    if (userId) {
        // Fetch user data based on the user ID
        axios.get(`${API_URL}/${userId}`)
            .then(response => {
                const user = response.data;
                document.getElementById("name").value = user.name || "";
                document.getElementById("password").value = user.password || "";
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });

        // Select the input elements and submit button
        const nameInput = document.getElementById("name");
        const passwordInput = document.getElementById("password");
        const submit = document.getElementById("submit");

        // Function to update user data
        function updateUser() {
            const updatedUser = {
                name: nameInput.value,
                password: passwordInput.value,
            };

            // Perform the PUT request when the submit button is clicked
            submit.addEventListener("click", () => {
                axios.put(`${API_URL}/${userId}`, updatedUser)
                    .then(response => {
                        console.log("User updated successfully:", response.data);
                        Swal.fire({
                            title: "Update Successful!",
                            text: `Welcome, ${nameInput.value.split("@")[0]}!`, // Show name part before '@'
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    })
                    .catch(error => {
                        console.error("Error updating user data:", error);
                    });
            });
        }

        // Add event listeners to fields to update when changed
        nameInput.addEventListener("change", updateUser);
        passwordInput.addEventListener("change", updateUser);
    }
});

