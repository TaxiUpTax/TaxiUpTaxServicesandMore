// -----------------------------------------------------------------------------
//  firebase-init.js – Hardcoded config (no setup form required)
// -----------------------------------------------------------------------------

import {
  initializeApp,
  getApps,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
  set,
  update,
  remove,
  child,
  onValue,
  push,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// 🔐 Hardcoded Firebase config for TaxiUpTax
const firebaseConfig = {
  apiKey: "AIzaSyCrEF78YhKW1lnCut3E9yjg8TAYncuptX0",
  authDomain: "taxiuptax.firebaseapp.com",
  projectId: "taxiuptax",
  storageBucket: "taxiuptax.appspot.com",
  messagingSenderId: "204487687625",
  appId: "1:204487687625:web:be475ef72eb893b228bc18",
  databaseURL: "https://taxiuptax-default-rtdb.firebaseio.com"
};

// ✅ Initialize Firebase (once only, for hot reload safety)
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// 📦 Export Firebase services for use in your other modules
export { app, auth, db, ref, get, set, update, remove, child, onValue, push };
