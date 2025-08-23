'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = () => navbar.classList.toggle("active");

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = () => navbar.classList.remove("active");

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header & back top btn active when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);



/**
 * filter function

const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter]");

let lastClickedFilterBtn = filterBtns[0];

const filter = function () {
  lastClickedFilterBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedFilterBtn = this;

  for (let i = 0; i < filterItems.length; i++) {
    if (this.dataset.filterBtn === filterItems[i].dataset.filter ||
      this.dataset.filterBtn === "all") {

      filterItems[i].style.display = "block";
      filterItems[i].classList.add("active");

    } else {

      filterItems[i].style.display = "none";
      filterItems[i].classList.remove("active");

    }
  }
}

addEventOnElem(filterBtns, "click", filter);
 */


document.addEventListener('DOMContentLoaded', () => {
  const categoryBtns = document.querySelectorAll('.filter-btn');
  const subfilterWrap = document.getElementById('subfilter-femmes'); // le conteneur des sous-onglets Femmes
  const subfilterBtns = subfilterWrap ? subfilterWrap.querySelectorAll('.subfilter-btn') : [];
  const cards = document.querySelectorAll('.pricing-card');

  function showCategory(category) {
    // état actif sur les onglets principaux
    categoryBtns.forEach(b => b.classList.toggle('active', b.dataset.category === category));

    const isFemmes = category === 'femmes';
    if (subfilterWrap) subfilterWrap.classList.toggle('hidden', !isFemmes);

    // quelle sous-catégorie afficher pour Femmes ?
    let activeSub = null;
    if (isFemmes && subfilterWrap) {
      const currentActive = subfilterWrap.querySelector('.subfilter-btn.active');
      activeSub = currentActive ? currentActive.dataset.subcategory : 'prestations';
      // si rien d'actif, on active "prestations" par défaut
      if (!currentActive) {
        subfilterBtns.forEach(b => b.classList.toggle('active', b.dataset.subcategory === activeSub));
      }
    }

    // affichage des cartes
    cards.forEach(card => {
      const cardCat = card.dataset.category;
      const cardSub = card.dataset.subcategory || null;
      const visible = (cardCat === category) && (!isFemmes || cardSub === activeSub);
      card.classList.toggle('hidden', !visible);
    });
  }

  // clic sur onglets principaux
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showCategory(btn.dataset.category);
    });
  });

  // clic sur sous-onglets Femmes
  subfilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      subfilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showCategory('femmes'); // on réapplique le filtre Femmes avec la nouvelle sous-cat active
    });
  });

  // init : on affiche la catégorie active dans le HTML (ou "hommes" par défaut)
  const initialActive = document.querySelector('.filter-btn.active');
  showCategory(initialActive ? initialActive.dataset.category : 'hommes');
});




let scrollTimer;

window.addEventListener("scroll", () => {
  document.documentElement.classList.add("show-scrollbar");

  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    document.documentElement.classList.remove("show-scrollbar");
  }, 800); // 0,8 sec avant disparition
});



// JavaScript pour gérer le défilement des avis
document.addEventListener('DOMContentLoaded', function() {
  const reviewsContainer = document.getElementById('reviewsContainer');
  
  // Dupliquer les avis pour un défilement infini
  if (reviewsContainer) {
    const reviews = reviewsContainer.innerHTML;
    reviewsContainer.innerHTML = reviews + reviews;
  }
  
  // Pause l'animation au survol
  reviewsContainer?.addEventListener('mouseenter', function() {
    this.style.animationPlayState = 'paused';
  });
  
  reviewsContainer?.addEventListener('mouseleave', function() {
    this.style.animationPlayState = 'running';
  });
});


document.addEventListener('DOMContentLoaded', function() {
    const headerTop = document.querySelector('.header-top');
    if (headerTop) {
        headerTop.classList.add('auto-scroll');
    }
});



