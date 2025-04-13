//index.html
const links = document.querySelectorAll('.nav-links a');
function setActiveLink() {
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;

  links.forEach(link => {
    link.classList.remove('active');

    const href = link.getAttribute('href');

   
    if (href.startsWith('#')) {
      if (href === currentHash) {
        link.classList.add('active');
      }
    } 
 
    else if (href === currentPath.split('/').pop()) {
      link.classList.add('active');
    }
  });
}
setActiveLink();
links.forEach(link => {
  link.addEventListener('click', function () {
    setTimeout(setActiveLink, 10); // slight delay for hash to update
  });
});


//login
// let c=true

// document.querySelector("#view-img").addEventListener("click",function(){
    
//     if(c){
//         document.querySelector('#password').setAttribute("type","text");
//         c=false;
//     }
//     else if(!c){
//         document.querySelector("#password").setAttribute("type","password");
//         c=true
//     }


// });

// Open popups
// Popup Elements
document.addEventListener('DOMContentLoaded', () => {
  // Auto login on page load (IMPORTANT: moved from nested event listener)
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.name) {
    showProfile(user.name);
  }

  // Ensure elements exist before attaching event listeners
  const openLogin = document.getElementById('login-btn');
  const openSignup = document.getElementById('signup-btn');
  const loginPopup = document.getElementById('login-popup');
  const signupPopup = document.getElementById('signup-popup');
  const closeLogin = document.getElementById('close-login');
  const closeSignup = document.getElementById('close-signup');

  if (!openLogin || !openSignup || !loginPopup || !signupPopup || !closeLogin || !closeSignup) {
    console.error("One or more elements are missing in the DOM.");
    return;
  }

  // Open Login and Signup Popups
  openLogin.onclick = () => {
    loginPopup.style.display = 'flex';
    signupPopup.style.display = 'none';
  };
  openSignup.onclick = () => {
    signupPopup.style.display = 'flex';
    loginPopup.style.display = 'none';
  };

  // Close Login and Signup Popups
  closeLogin.onclick = () => loginPopup.style.display = 'none';
  closeSignup.onclick = () => signupPopup.style.display = 'none';

  // Switch Between Login and Signup
  const switchToSignup = document.getElementById('switch-to-signup');
  const switchToLogin = document.getElementById('switch-to-login');

  if (switchToSignup) {
    switchToSignup.onclick = () => {
      loginPopup.style.display = 'none';
      signupPopup.style.display = 'flex';
    };
  }

  if (switchToLogin) {
    switchToLogin.onclick = () => {
      signupPopup.style.display = 'none';
      loginPopup.style.display = 'flex';
    };
  }

  // Password toggle for login
  const toggleLoginPassword = document.getElementById('toggle-login-password');
  if (toggleLoginPassword) {
    toggleLoginPassword.onclick = () => {
      const pwd = document.getElementById('login-password');
      pwd.type = pwd.type === 'password' ? 'text' : 'password';
    };
  }

  // Password toggle for signup
  const toggleSignupPassword = document.getElementById('toggle-signup-password');
  if (toggleSignupPassword) {
    toggleSignupPassword.onclick = () => {
      const pwd = document.getElementById('signup-password');
      pwd.type = pwd.type === 'password' ? 'text' : 'password';
    };
  }

  // Submit Signup Form
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const { name, email, password, contact, gender, bloodGroup } = e.target.elements;

      try {
        const res = await fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value,
            contact: contact.value,
            gender: gender.value,
            bloodGroup: bloodGroup.value,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          return alert(data.message || "Signup failed");
        }

        alert(data.message);
        signupPopup.style.display = 'none';

      } catch (error) {
        alert("Signup failed: " + error.message);
      }
    });
  }

  // Submit Login Form
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;

      try {
        const res = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          return alert(data.message || "Login failed");
        }

        alert(data.message);

        localStorage.setItem("user", JSON.stringify({
          name: data.name,
          email: data.email,
          contact: data.contact,
          gender: data.gender,
          bloodGroup: data.bloodGroup
        }));

        loginPopup.style.display = "none";
        showProfile(data.name);

      } catch (error) {
        alert("Login failed: " + error.message);
      }
    });
  }

  // Show Profile Function
  function showProfile(name) {
    const authButtons = document.getElementById("auth-buttons");
    const userProfile = document.getElementById("user-profile");
    const userNameDisplay = document.getElementById("user-name");

    if (authButtons && userProfile && userNameDisplay) {
      authButtons.style.display = "none";
      userProfile.style.display = "flex";
      userProfile.style.gap = "20px";
      userProfile.style.alignItems = "center";
      userNameDisplay.textContent = name;
    }
  }

  // Logout Functionality
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");

      const authButtons = document.getElementById("auth-buttons");
      const userProfile = document.getElementById("user-profile");

      if (authButtons && userProfile) {
        authButtons.style.display = "flex";
        userProfile.style.display = "none";
      }

      alert("You have been logged out.");
    });
  }

  // View Profile Button → Redirect
  const viewProfileBtn = document.getElementById("view-profile-btn");
  if (viewProfileBtn) {
    viewProfileBtn.addEventListener("click", () => {
      window.location.href = "profile.html";
    });
  }
});







