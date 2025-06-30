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

// ✅ Export async initializer
export async function initFirebase() {
  const res = await fetch("firebase-config.json");
  const config = await res.json();
  const app = getApps().length ? getApps()[0] : initializeApp(config);

  return {
    app,
    auth: getAuth(app),
    db: getDatabase(app),
    ref,
    get,
    set,
    update,
    remove,
    child,
    onValue,
    push
  };
}

