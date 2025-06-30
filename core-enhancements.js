// core-enhancements.js
import { initFirebase } from "./firebase-init.js";

const {
  auth,
  db,
  ref,
  push,
  update,
  onValue
} = await initFirebase();

// ─────────── SAFE DOM HELPERS ───────────
function $(id) {
  return document.getElementById(id);
}
function safeQuery(selector) {
  return document.querySelector(selector);
}

// ─────────── ESCAPE UTILITY ───────────
export function escapeHTML(str = "") {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ─────────── NOTIFICATION CORE ───────────
export const notifPath = (uid) => `notifications/${uid}`;

export function createNotification(uid, data) {
  return push(ref(db, notifPath(uid)), {
    ...data,
    read: false,
    ts: Date.now(),
  });
}

export function listenForNotifications(filter = "all") {
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  onValue(ref(db, notifPath(uid)), (snap) => {
    const notifCache = [];
    snap.forEach((childSnap) => {
      notifCache.push({ ...childSnap.val(), id: childSnap.key });
    });
    if (window.renderNotifications)
      window.renderNotifications(filter, notifCache);
    updateNotifBadge(notifCache);
  });
}

function updateNotifBadge(notifCache = []) {
  const badge = $("notifBadge");
  if (!badge) return;
  const unread = notifCache.filter((n) => !n.read).length;
  badge.textContent = unread || "";
  badge.style.display = unread ? "inline-block" : "none";
}

// ─────────── LOADING FEEDBACK ───────────
export function showLoading(targetId = "mainContent", message = "Loading...") {
  const target = $(targetId);
  if (!target) return;
  target.innerHTML = `<div style="text-align:center;padding:40px;font-size:18px;color:#666;">⏳ ${message}</div>`;
}

// ─────────── SIDEBAR STATE MEMORY ───────────
export function restoreSidebarState(sideMenu, mainArea) {
  const open = sessionStorage.getItem("sidebarOpen") === "true";
  if (sideMenu && mainArea) {
    sideMenu.style.display = open ? "flex" : "none";
    mainArea.style.marginLeft = open ? "220px" : "0";
  }
}
export function saveSidebarState(open) {
  sessionStorage.setItem("sidebarOpen", open ? "true" : "false");
}

// ─────────── NORMALIZATION HELPERS ───────────
export function normalizeUser(user = {}) {
  return {
    uid: user.uid || "",
    fullName: user.fullName || user.name || "Student",
    contact: user.contact || user.contactNumber || "",
    role: user.role || "student",
    email: user.email || "",
    country: user.country || user.location || "Unknown",
  };
}

// ─────────── ONE-TIME INIT ON LOAD ───────────
document.addEventListener("DOMContentLoaded", () => {
  const sideMenu = $("sideMenu");
  const mainArea = safeQuery(".main-area");

  restoreSidebarState(sideMenu, mainArea);

  if (!sideMenu || !mainArea) {
    console.warn("⚠️ Sidebar or main-area container not found.");
  }
});

