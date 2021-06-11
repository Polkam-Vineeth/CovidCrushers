var firebaseConfig = {
  apiKey: "AIzaSyBtU0Vnqq8aGQuHc5VA-7uux6PcAC_5i_A",
  authDomain: "express-server-auth-4c9e1.firebaseapp.com",
  databaseURL: "https://express-server-auth-4c9e1-default-rtdb.firebaseio.com",
  projectId: "express-server-auth-4c9e1",
  storageBucket: "express-server-auth-4c9e1.appspot.com",
  messagingSenderId: "71515296468",
  appId: "1:71515296468:web:921b582fe7c47cd43de141"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Refernece contactInfo collections
let contactInfo = firebase.database().ref("infos");

// Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  //   Get input Values
  let name = document.querySelector(".name").value;
  let email = document.querySelector(".email").value;
  let message = document.querySelector(".message").value;
  console.log(name, email, message);

  saveContactInfo(name, email, message);

  document.querySelector(".contact-form").reset();
}

// Save infos to Firebase
function saveContactInfo(name, email, message) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    name: name,
    email: email,
    message: message,
  });
}