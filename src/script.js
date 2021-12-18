"use-strict";

(() => {
  const buttons = Array.from(
    document.getElementsByClassName("js-filter-button")
  );

  console.log({ buttons });
  buttons.forEach(button => {
    const parent = button.parentNode;
    const items = Array.from(parent.querySelectorAll("li"));

    items.forEach((item, index) => {
      item.querySelector("button").addEventListener("keyup", e => {
        if (e.key === "ArrowDown" && index !== items.length - 1) {
          const next = items[index + 1];

          if (next) {
            next.querySelector("button").focus();
          }
        } else if (e.key === "ArrowUp" && index !== 0) {
          const prev = items[index - 1];

          if (prev) {
            prev.querySelector("button").focus();
          }
        }
      });
    });

    button.addEventListener("click", () => {
      parent.classList.toggle("active");
    });

    parent.addEventListener("keyup", e => {
      if (e.key === "Escape") {
        parent.classList.remove("active");
      }
    });

    button.addEventListener("keyup", e => {
      if (e.key === "Enter") {
        parent.classList.add("active");
      }
    });
  });
})();
