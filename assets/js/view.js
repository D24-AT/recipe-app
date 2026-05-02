import { db } from "./firebase.js";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const select = document.getElementById("recipe-select");
const ingredientList = document.getElementById("ingredient-list");
const instructionList = document.getElementById("instruction-list");
const servingsInput = document.getElementById("servings");
const deleteBtn = document.getElementById("delete-btn");

let recipes = [];
let current = null;

onSnapshot(collection(db, "recipes"), snapshot => {
  recipes = snapshot.docs.map(d => ({
    id: d.id,
    ...d.data()
  }));

  populateDropdown();
});

function populateDropdown() {
  select.innerHTML = "";

  recipes.forEach((r, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = r.name;
    select.appendChild(opt);
  });

  if (recipes.length > 0) loadRecipe(0);
}

function loadRecipe(i) {
  current = recipes[i];
  if (!current) return;

  servingsInput.value = current.servings;

  updateIngredients();
  updateInstructions();
}

function updateIngredients() {
  ingredientList.innerHTML = "";

  const s = servingsInput.value;

  current.ingredients.forEach(i => {
    const val = (i.amount / current.servings) * s;

    const li = document.createElement("li");
    li.textContent = `${val} ${i.unit} ${i.name}`;
    ingredientList.appendChild(li);
  });
}

function updateInstructions() {
  instructionList.innerHTML = "";

  current.instructions.forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    instructionList.appendChild(li);
  });
}

select.onchange = () => loadRecipe(select.value);
servingsInput.oninput = updateIngredients;

deleteBtn.onclick = async () => {
  const index = select.value;
  if (!recipes[index]) return;

  if (confirm("Delete recipe?")) {
    await deleteDoc(doc(db, "recipes", recipes[index].id));
  }
};