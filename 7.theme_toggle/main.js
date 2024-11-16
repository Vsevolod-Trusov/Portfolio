function main() {
  const Themes = {
    Light: "light",
    Dark: "dark",
  };
  const toggleThemeButton = document.querySelector(".toggle-theme");
  const body = document.querySelector("body");

  // ONE WAY OF IMPLEMENTATION
  //   toggleThemeButton.addEventListener("click", () => {
  //     if (body.classList.contains(Themes.Light)) {
  //       body.classList.remove(Themes.Light);
  //       body.classList.add(Themes.Dark);
  //     } else {
  //       body.classList.remove(Themes.Dark);
  //       body.classList.add(Themes.Light);
  //     }

  //     if (toggleThemeButton.classList.contains(Themes.Light)) {
  //       toggleThemeButton.classList.remove(Themes.Light);
  //       toggleThemeButton.classList.add(Themes.Dark);
  //     } else {
  //       toggleThemeButton.classList.remove(Themes.Dark);
  //       toggleThemeButton.classList.add(Themes.Light);
  //     }
  //   });

  // THE SECOND WAY OF IMPLEMENTATION
  toggleThemeButton.addEventListener("click", () => {
    if (body.getAttribute("data-theme") === "dark") {
      body.setAttribute("data-theme", "light");
    } else if (body.getAttribute("data-theme") === "light") {
      body.setAttribute("data-theme", null);
    } else {
      body.setAttribute("data-theme", "dark");
    }
    // toggleThemeButton.setAttribute("data-theme", "dark");
  });
}

main();
