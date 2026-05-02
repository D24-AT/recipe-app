import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const form = document.getElementById("recipe-form");

form.onsubmit = async e => {
  e.preventDefault();

  const recipe = {
    name: title.value,
    servings: +servings.value,
    ingredients: ingredients.value.split("\n").map(l => {
      const [a, u, ...n] = l.split(" ");
      return { amount: +a, unit: u, name: n.join(" ") };
    }),
    instructions: instructions.value.split("\n"),
    categories: categories.value.split(",").map(c => c.trim()),
    status: status.value,
    rating: +rating.value
  };

  await addDoc(collection(db, "recipes"), recipe);

  window.location = "index.html";
};