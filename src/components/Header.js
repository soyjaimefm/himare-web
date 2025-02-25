function headerListeners() {
  console.log('listeners');
  const buttonMenu = document.querySelector("#button-menu");
  const navMenu = document.querySelector("#nav-menu");

  buttonMenu?.addEventListener("click", () => {
    if (navMenu?.classList.contains('-translate-x-full')) {
      navMenu?.classList.remove('-translate-x-full');
      navMenu?.classList.add('translate-x-0');
      buttonMenu.setAttribute('aria-expanded', 'true');

    } else {
      navMenu?.classList.add('-translate-x-full');
      navMenu?.classList.remove('translate-x-0');
      buttonMenu.setAttribute('aria-expanded', 'false');
    }
  });

}

headerListeners();

document.addEventListener('astro:after-swap', headerListeners);