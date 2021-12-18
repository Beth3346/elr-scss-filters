"use-strict";

(() => {
  const filters = Array.from(
    document.getElementsByClassName("js-filter-dropdown")
  );

  filters.forEach(filter => {
    const buttons = Array.from(
      filter.getElementsByClassName("js-filter-button")
    );

    // TODO: add type search feature
    // TODO: add clear selection button

    buttons.forEach(button => {
      const parent = button.parentNode;
      const items = Array.from(parent.querySelectorAll("li"));

      items.forEach((item, index) => {
        const btnItem = item.querySelector("button");

        const setValue = (val, label) => {
          button.firstChild.textContent = label;
          button.setAttribute("data-selection", val);
          filter.classList.remove("active");
        };

        btnItem.addEventListener("keyup", e => {
          // e.stopPropagation();

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
          } else if (e.key === "Escape") {
            parent.classList.remove("active");
          }
        });

        btnItem.addEventListener("click", e => {
          e.stopPropagation();
          setValue(btnItem.getAttribute("data-value"), btnItem.textContent);
          button.focus();
        });
      });

      button.addEventListener("click", e => {
        e.stopPropagation();
        parent.classList.toggle("active");
        items[0].getElementsByTagName("button")[0].focus();
      });

      parent.addEventListener("keyup", e => {
        if (e.key === "Escape") {
          parent.classList.remove("active");
        }
      });
    });
  });
})();

(() => {
  // TODO: build badge list selection filter
  // - should be able to select multiple items at the same time
  // - should be able to navigation using arrow keys
  const selectionFilters = Array.from(
    document.getElementsByClassName("js-selection-filters")
  );

  selectionFilters.forEach(item => {
    const buttons = Array.from(item.getElementsByTagName("button"));
    const currentSelections =
      item.getAttribute("data-selections").length > 0
        ? item.getAttribute("data-selections").split(",")
        : [];

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const isActive = Array.from(button.classList).includes("active");
        const val = button.getAttribute("data-value");

        if (isActive) {
          button.classList.remove("active");
          const valIndex = currentSelections.findIndex(o => o === val);
          currentSelections.splice(valIndex);
        } else {
          button.classList.add("active");
          currentSelections.push(val);
        }

        item.setAttribute("data-selections", currentSelections.join(","));
      });

      button.addEventListener("keyup", e => {
        if (e.key === "ArrowRight") {
          const next = buttons[index + 1];

          if (next) {
            next.focus();
          }
        } else if (e.key === "ArrowLeft") {
          const prev = buttons[index - 1];

          if (prev) {
            prev.focus();
          }
        }
      });
    });
  });
})();
