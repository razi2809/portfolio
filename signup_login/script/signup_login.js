let signUp = document.getElementById("signup");
let logIn = document.getElementById("login");
let signup_form = document.getElementById("signup_form");
let login_form = document.getElementById("login_form");
let logOutBtn = document.getElementById("log_out");
let whichForm = document.getElementById("formToggle");
let welcomeMessage = document.getElementById("welcome_message");
let existingUsers = [];
export let user_status = document.getElementById("status");
user_status.disabled = true;
export let logedInUser;
let loggedIn = false;
export function isLoggedIn() {
  return loggedIn;
}
login_form.className = "none";
welcomeMessage.className = "none";
let logIn_form_disable = true;
let signup_form_disable = false;
const getValues = () => {
  let { value: signup_email } = document.getElementById("signup_email");
  let { value: login_emali } = document.getElementById("login_email");
  let { value: signup_password } = document.getElementById("signup_password");
  let { value: login_password } = document.getElementById("login_password");
  let { value: firstName } = document.getElementById("firstName");
  return {
    signup_email,
    login_emali,
    signup_password,
    login_password,
    firstName,
  };
};

class Users {
  constructor(email, pass, name) {
    this.name = name;
    this.email = email;
    this.password = pass;
  }
}
const emptyInputs = (...inputs) => {
  for (let input of inputs) {
    input.value = "";
  }
};
whichForm.addEventListener("change", () => {
  existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  if (logIn_form_disable) {
    if (existingUsers.length > 0) {
      logIn_form_disable = false;
      login_form.className = "";
      signup_form.className = "none";
      signup_form_disable = true;
    } else {
      console.log("none");
      logIn_form_disable = true;
      login_form.className = "none";
      whichForm.className = "none";
      welcomeMessage.className = "";
      welcomeMessage.innerHTML = `you need to sign up first`;
    }
  } else if (signup_form_disable) {
    signup_form_disable = false;
    signup_form.className = "";
    logIn_form_disable = true;
    login_form.className = "none";
  }
});

const login = (e, p, user) => {
  loggedIn = e === user.email && p === user.password;
  return loggedIn;
};
login_form.addEventListener("submit", (e) => {
  e.preventDefault();
});
signup_form.addEventListener("submit", (e) => {
  e.preventDefault();
});
signUp.addEventListener("click", () => {
  let { signup_email, signup_password, firstName } = getValues();

  if (signup_email && signup_password && firstName) {
    // Retrieve existing users from local storage or create an empty array
    existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    for (let user of existingUsers) {
      if (signup_email == user.email || firstName == user.name) {
        console.log("email or name already ocupied");
        emptyInputs(
          document.getElementById("signup_email"),
          document.getElementById("signup_password"),
          document.getElementById("firstName")
        );
        return;
      }
    }
    loggedIn = true;
    window.dispatchEvent(
      new CustomEvent("loginStatusChanged", { detail: { loggedIn, firstName } })
    );
    user_status.disabled = false;
    let user = new Users(signup_email, signup_password, firstName);
    welcomeMessage.className = "";
    welcomeMessage.innerHTML = `welcom to our site! <br> ${user.name}`;
    logOutBtn.className = "btn btn-primary";
    user_status.setAttribute(
      "placeholder",
      `${user.name} what would you like to share?`
    );
    logedInUser = user.name;
    // Add the new user to the array
    existingUsers.push(user);
    // Save the updated user array back to local storage
    localStorage.setItem("users", JSON.stringify(existingUsers));
    console.log(existingUsers);
    signup_form_disable = true;
    signup_form.className = "none";
    whichForm.className = "none";
  } else {
    console.log("didnt put any values");
  }
});

logIn.addEventListener("click", () => {
  // Retrieve existing users from local storage
  existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  let { login_emali, login_password } = getValues();
  if (login_emali && login_password) {
    // Log each user's name and email for debugging
    for (let user of existingUsers) {
      if (login(login_emali, login_password, user)) {
        loggedIn = "true";
        window.dispatchEvent(
          new CustomEvent("loginStatusChanged", {
            detail: { loggedIn, user: user.name },
          })
        );
        user_status.disabled = false;
        logOutBtn.className = "btn btn-primary";
        console.log("Login Successful:", user.name);
        user_status.setAttribute(
          "placeholder",
          `${user.name} what would you like to share?`
        );
        logedInUser = user.name;
        logIn_form_disable = true;
        login_form.className = "none";
        whichForm.className = "none";
        welcomeMessage.className = "";
        welcomeMessage.innerHTML = `welcom to back our site! <br> ${user.name}`;
        return;
      }
    }
    console.log("Login failed: Incorrect email or password");
    emptyInputs(
      document.getElementById("login_password"),
      document.getElementById("login_email")
    );
  } else {
    console.log("didnt put any values");
  }
});
logOutBtn.addEventListener("click", () => {
  logedInUser = undefined;
  emptyInputs(
    document.getElementById("signup_email"),
    document.getElementById("login_email"),
    document.getElementById("signup_password"),
    document.getElementById("login_password"),
    document.getElementById("firstName")
  );
  console.log("logout successful", logedInUser);
  welcomeMessage.className = "none";
  whichForm.className = "";
  user_status.disabled = true;
  user_status.setAttribute(
    "placeholder",
    `you are not logged in please log in`
  );
  signup_form_disable = false;
  signup_form.className = "";
  logOutBtn.className = "none";
  loggedIn = "false";
  window.dispatchEvent(
    new CustomEvent("loginStatusChanged", { detail: loggedIn })
  );
});
