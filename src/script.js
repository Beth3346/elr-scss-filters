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
          const last = items[items.length - 1];

          if (e.key === "ArrowDown") {
            const next = items[index + 1];

            if (next) {
              next.querySelector("button").focus();
            } else {
              items[0].querySelector("button").focus();
            }
          } else if (e.key === "ArrowUp") {
            const prev = items[index - 1];

            if (prev) {
              prev.querySelector("button").focus();
            } else {
              last.querySelector("button").focus();
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
          } else {
            buttons[0].focus();
          }
        } else if (e.key === "ArrowLeft") {
          const prev = buttons[index - 1];

          if (prev) {
            prev.focus();
          } else {
            buttons[buttons.length - 1].focus();
          }
        }
      });
    });
  });
})();

(() => {
  const filters = Array.from(document.getElementsByClassName("filter-form"));
  const values = [];

  const updateValues = (evt, currentVals) => {
    const isChecked = evt.target.checked;
    const val = evt.target.value;

    if (isChecked) {
      currentVals.push(val);
    } else {
      const valIndex = currentVals.findIndex(o => o === val);

      if (typeof valIndex === -1) {
        console.error("could not find value", val);
      } else {
        currentVals.splice(valIndex, 1);
      }
    }

    document.getElementById("valList").textContent = currentVals.join(", ");
  };

  filters.forEach(form => {
    const options = Array.from(form.getElementsByTagName("input")).filter(
      o => o.getAttribute("type") === "checkbox"
    );

    options.forEach((option, index) => {
      const last = options[options.length - 1];

      if (option.getAttribute("checked") !== null) {
        values.push(option.getAttribute("value"));

        document.getElementById("valList").textContent = values.join(", ");
      }

      option.addEventListener("keyup", e => {
        if (e.key === "ArrowDown") {
          const next = options[index + 1];

          if (next) {
            next.focus();
          } else {
            options[0].focus();
          }
        } else if (e.key === "ArrowUp") {
          const prev = options[index - 1];

          if (prev) {
            prev.focus();
          } else {
            last.focus();
          }
        }
      });

      option.addEventListener("change", e => {
        updateValues(e, values);
      });
    });
  });
})();
