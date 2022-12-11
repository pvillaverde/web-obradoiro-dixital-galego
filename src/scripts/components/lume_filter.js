export default class LumeFilter extends HTMLElement {
   connectedCallback() {
      const form = this.querySelector("form");
      const items = this.querySelectorAll(":scope > ul > li");

      const init = new URLSearchParams(window.location.search);

      for (const key of init.keys()) {
         const input = form[key];

         if (input) {
            input.checked = true;
         }
      }

      form.addEventListener("submit", (event) => {
         onChange();
         event.preventDefault();
      });
      form.addEventListener("input", onChange);

      onChange();

      function onChange() {
         form.querySelectorAll("input[type='checkbox']").forEach((input) => {
            const btn = input.closest(".button");

            if (btn) {
               btn.classList.toggle("is-active", input.checked);
            }
         });

         const data = new FormData(form);
         filter(data);
         const permalink = new URLSearchParams(data).toString();

         if (permalink !== document.location.search) {
            const newUrl = permalink ? `?${permalink}` : document.location.pathname;
            history.pushState({}, null, newUrl);
         }
         console.log(this, data);
      }

      function filter(data) {
         const tags = [];
         let status, intersection;

         for (const [name, value] of data.entries()) {
            if (name === "status") {
               status = value;
               continue;
            }
            if (name === "intersection") {
               intersection = (value === "true");
               continue;
            }

            tags.push(name);
         }
         let showedItems = items.length;
         items.forEach((item) => {
            switch (status) {
               case "enabled":
                  if (!item.classList.contains("is-enabled")) {
                     item.hidden = true;
                     showedItems--;
                     return;
                  }
                  break;
               case "disabled":
                  if (item.classList.contains("is-enabled")) {
                     item.hidden = true;
                     showedItems--;
                     return;
                  }
                  break;
            }
            item.hidden = tags.length && (intersection ?
               !tags.every((tag) => item.dataset.tags.split(",").includes(tag)) :
               tags.every((tag) => !item.dataset.tags.split(",").includes(tag)));
            if (item.hidden) {
               showedItems--;
            }
         });
         const resultInfoElement = document.getElementById('result-info');
         resultInfoElement.innerHTML = `Atopáronse <span class="found-results">${showedItems}</span> proxectos dun total de <span class="total-results">${items.length}</span>.`;
      }
   }
}
