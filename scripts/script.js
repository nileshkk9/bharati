// const DOMs
var username, password;
const userDOM = document.getElementById("username");
const passDOM = document.getElementById("password");
const remMe = document.getElementById("remember");
const encryptionKey = "Bharati";

//onload home page
// check if cookies are available or not
checkCookies();
// if username and password is not empty
if (username !== "" && password !== "") tryLogin();


// login button onclick listener
document.getElementById("login").onclick = () => {
  username = userDOM.value;
  password = passDOM.value;
  tryLogin();
};


// functio to set the cookies with key value and expiry days
function setCookie(key, value, days) {
  var date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  var expires = "expires=" + date.toUTCString();
  document.cookie = key + "=" + value + ";" + expires + ";path=/";
}

// function to check username/password in cookies and retrive username/password
// and store it in global variables
function checkCookies() {
  username = decrypt(getCookie("username"));
  password = decrypt(getCookie("password"));
}

// function to retrive cookies
function getCookie(key) {
  var name = key + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// function checked the username/password 
function tryLogin() {
  if (username === "LTI" && password === "123") {
    // if remember me is checked
    if (remMe.checked) {
      // encrypt username
      var encryptedUsername = encrypt(username);
      // encrypt password
      var encryptedPassword = encrypt(password);
      // store them in cookies
      setCookie("username", encryptedUsername, 1);
      setCookie("password", encryptedPassword, 1);
    }
    // redirect to welcome page
    window.location.replace(`welcomePage.html?username=${username}`);
  } else {
    // other wise show the error
    document.getElementById("error").style.display = "block";
  }
}

function encrypt(text) {
  return CryptoJS.AES.encrypt(text, encryptionKey);
}
function decrypt(code) {
  return CryptoJS.AES.decrypt(code, encryptionKey).toString(CryptoJS.enc.Utf8);
}
