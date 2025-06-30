// firebase-init.js
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

import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

fetch("firebase-config.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load Firebase config");
    return res.json();
  })
  .then((firebaseConfig) => {
    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getDatabase(app);

    // ✅ You can now continue with your app logic here
  })
  .catch((err) => {
    alert("Firebase config could not be loaded. Please contact support.");
    console.error("Firebase config error:", err);
  });


// ✅ Export everything needed across your app
export { app, auth, db, ref, get, set, update, remove, child, onValue, push };
