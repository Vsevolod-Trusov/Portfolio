const navbar = document.querySelector("nav");
let navTop = navbar.offsetTop;

window.onscroll = () => {
  handleStickyNavbarOnScroll();
};

function handleStickyNavbarOnScroll() {
  if (window.scrollY >= navTop) navbar.classList.add("fix-navbar");
  else navbar.classList.remove("fix-navbar");
}
