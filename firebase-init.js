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

// Declare outside so they can be exported later
let app, auth, db;

// 🔁 Load Firebase config from JSON file
await fetch("firebase-config.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load Firebase config");
    return res.json();
  })
  .then((firebaseConfig) => {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getDatabase(app);
  })
  .catch((err) => {
    alert("❌ Firebase config could not be loaded.");
    console.error("Firebase config error:", err);
  });

// ✅ Now we can export because they've been assigned
export { app, auth, db, ref, get, set, update, remove, child, onValue, push };

