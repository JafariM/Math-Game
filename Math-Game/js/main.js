//Toggle navbar links when screen size is 600px
function toggleDropdown() {
  let topNav = document.getElementById("myTopnav");
  if (topNav.className === "topnav") {
    topNav.className += " responsive";
  } else {
    topNav.className = "topnav";
  }
}
// Hide login form and display Register form
window.addEventListener("load", function () {
  const registerLink = document.getElementById('reginsterLink');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginLink = document.getElementById('loginLink');

  registerLink.addEventListener('click', function () {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  });

  loginLink.addEventListener('click', function () {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
  });
});