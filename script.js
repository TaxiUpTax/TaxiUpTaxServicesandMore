// script.js
import { initFirebase } from "./firebase-init.js";

const {
  auth,
  db,
  ref,
  set,
  onValue
} = await initFirebase();

const coverPage = document.getElementById("coverPage");
const authPanel = document.getElementById("authPanel");
const startBtn = document.getElementById("startBtn");
const toLoginLink = document.getElementById("toLogin");

startBtn?.addEventListener("click", () => {
  coverPage.style.display = "none";
  authPanel.classList.remove("hidden");
  document.getElementById("signUpForm").classList.remove("hidden");
  document.getElementById("loginForm").classList.add("hidden");
});

toLoginLink?.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("signUpForm").classList.add("hidden");
  document.getElementById("loginForm").classList.remove("hidden");

  if (!document.getElementById("toSignUp")) {
    const p = document.createElement("p");
    p.innerHTML = `Don't have an account yet? <a href="#" id="toSignUp">Sign Up</a>`;
    document.getElementById("loginForm").appendChild(p);

    document.getElementById("toSignUp").addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("loginForm").classList.add("hidden");
      document.getElementById("signUpForm").classList.remove("hidden");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const signUpForm = document.getElementById("signUpForm");
  const loginForm = document.getElementById("loginForm");

  signUpForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName")?.value.trim();
    const email = document.getElementById("signUpEmail")?.value.trim();
    const password = document.getElementById("signUpPassword")?.value.trim();
    const contact = document.getElementById("contactNumber")?.value.trim();
    const country = document.getElementById("country")?.value.trim();

    try {
      const { createUserWithEmailAndPassword } = await import("https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js");
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await set(ref(db, `students/${userCred.user.uid}`), {
        fullName,
        email,
        contact,
        country,
        role: "student",
        photoURL: ""
      });

      alert("🎉 Account created! You can now log in.");
      signUpForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
    } catch (err) {
      alert(`❌ Sign-up error: ${err.message}`);
    }
  });

  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    try {
      const { signInWithEmailAndPassword } = await import("https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js");
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "home.html";
    } catch (err) {
      document.getElementById("loginError").textContent = "❌ " + err.message;
    }
  });

  document.getElementById("showPassword")?.addEventListener("change", (e) => {
    const pwField = document.getElementById("loginPassword");
    pwField.type = e.target.checked ? "text" : "password";
  });

  const adminSettingsRef = ref(db, "adminSettings");
  onValue(
    adminSettingsRef,
    (snapshot) => {
      const settings = snapshot.val() || {};
      if (settings.backgroundColor) {
        document.body.style.backgroundColor = settings.backgroundColor;
      }
      if (settings.backgroundImage) {
        document.body.style.backgroundImage = `url(${settings.backgroundImage})`;
        document.body.style.backgroundSize = "cover";
      } else {
        document.body.style.backgroundImage = "none";
      }
    },
    { onlyOnce: true }
  );
});

