window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {  // Trigger after 50px scroll
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
  });
  
  const hamburgerButton = document.getElementById('hamburger_icon');
  const navLinks = document.getElementById('navlinks');
  const icon = hamburgerButton.querySelector('i');
  // Getting the <i> inside the button
  
  hamburgerButton.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  
    if (navLinks.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');        
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
  });

  
  
  document.getElementById("signout").addEventListener("click", function() {
    Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Sign Out",
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Logged Out!",
                text: "You have successfully signed out.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });

            // Delay logout action
            setTimeout(() => {
                window.location.href = "../../../../index.html"; // Redirect to login
            }, 2000);
        }
    });
});
