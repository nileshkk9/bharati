// welcom back message
const message = "Welcome Back, ";
const welcomeUserHeader = document.getElementById("welcomeUser");
// getting the username fom the URL using params
const params = new URLSearchParams(window.location.search);
// if param exits with key username
if (params.has("username")) {
  // update the content of h2 tag with message
  welcomeUserHeader.textContent = message + params.get("username");
} else {
  welcomeUserHeader.textContent = message + "User";
}
