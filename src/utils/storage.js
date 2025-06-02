// src/utils/storage.js

export function getCollection() {
  return JSON.parse(localStorage.getItem("collection") || "[]");
}

export function saveCollection(data) {
  localStorage.setItem("collection", JSON.stringify(data));
}

export function getWantlist() {
  return JSON.parse(localStorage.getItem("wantlist") || "[]");
}

export function saveWantlist(data) {
  localStorage.setItem("wantlist", JSON.stringify(data));
}
const SOLD_KEY = "mySold";

export function getSold() {
  try {
    const raw = localStorage.getItem(SOLD_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}