const KEY = "recipes";

const recipes = JSON.parse(localStorage.getItem(KEY)) || [];
const container = document.getElementById("recipe-options");
const list = document.getElementById("grocery-list");

recipes.forEach((r, i) => {
  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.value = i;

  container.appendChild(cb);
  container.append(r.name);
  container.appendChild(document.createElement("br"));
});

document.getElementById("generate-btn").onclick = () => {
  const selected = [...container.querySelectorAll("input:checked")];

  const map = {};

  selected.forEach(cb => {
    const r = recipes[cb.value];

    r.ingredients.forEach(i => {
      const key = i.unit + " " + i.name;
      map[key] = (map[key] || 0) + i.amount;
    });
  });

  list.innerHTML = "";

  Object.entries(map).forEach(([k, v]) => {
    const li = document.createElement("li");
    li.textContent = `${v} ${k}`;
    list.appendChild(li);
  });
};