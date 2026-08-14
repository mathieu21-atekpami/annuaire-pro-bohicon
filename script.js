/* =========================================
   ANNUAIRE PRO BOHICON
   JAVASCRIPT
========================================= */


/* =========================================
   DONNÉES
========================================= */

const businesses = [

    {
        id: 1,
        name: "Bohicon Digital",
        category: "Informatique",
        location: "Centre-ville",
        phone: "22997000001",
        displayPhone: "+229 97 00 00 01",
        icon: "💻",
        description: "Services informatiques, création de sites web et assistance numérique.",
        featured: true
    },

    {
        id: 2,
        name: "Chez Maman",
        category: "Restaurant",
        location: "Agongointo",
        phone: "22997000002",
        displayPhone: "+229 97 00 00 02",
        icon: "🍛",
        description: "Restaurant proposant des plats locaux et africains.",
        featured: true
    },

    {
        id: 3,
        name: "Style Coiffure",
        category: "Beauté",
        location: "Zongo",
        phone: "22997000003",
        displayPhone: "+229 97 00 00 03",
        icon: "💇",
        description: "Coiffure homme et femme, tresses et soins capillaires.",
        featured: false
    },

    {
        id: 4,
        name: "Élégance Couture",
        category: "Couture",
        location: "Saclo",
        phone: "22997000004",
        displayPhone: "+229 97 00 00 04",
        icon: "🧵",
        description: "Création de vêtements modernes et traditionnels sur mesure.",
        featured: true
    },

    {
        id: 5,
        name: "Photo Vision",
        category: "Photographie",
        location: "Bohicon",
        phone: "22997000005",
        displayPhone: "+229 97 00 00 05",
        icon: "📸",
        description: "Photographie, vidéos, mariages et événements.",
        featured: false
    },

    {
        id: 6,
        name: "Bohicon Auto",
        category: "Automobile",
        location: "Route de Cotonou",
        phone: "22997000006",
        displayPhone: "+229 97 00 00 06",
        icon: "🚗",
        description: "Entretien automobile, diagnostic et réparation.",
        featured: false
    },

    {
        id: 7,
        name: "Maison Déco",
        category: "Décoration",
        location: "Lissèzoun",
        phone: "22997000007",
        displayPhone: "+229 97 00 00 07",
        icon: "🎨",
        description: "Décoration de cérémonies, anniversaires et événements.",
        featured: false
    },

    {
        id: 8,
        name: "Express Livraison",
        category: "Livraison",
        location: "Bohicon",
        phone: "22997000008",
        displayPhone: "+229 97 00 00 08",
        icon: "🛵",
        description: "Service de livraison rapide dans Bohicon et environs.",
        featured: false
    },

    {
        id: 9,
        name: "Tech Services",
        category: "Informatique",
        location: "Ouassaho",
        phone: "22997000009",
        displayPhone: "+229 97 00 00 09",
        icon: "🖥️",
        description: "Maintenance informatique et installation de logiciels.",
        featured: false
    }

];


/* =========================================
   CATÉGORIES
========================================= */

const categories = [
    {
        name: "Restaurant",
        icon: "🍛"
    },
    {
        name: "Informatique",
        icon: "💻"
    },
    {
        name: "Beauté",
        icon: "💇"
    },
    {
        name: "Couture",
        icon: "🧵"
    },
    {
        name: "Photographie",
        icon: "📸"
    },
    {
        name: "Automobile",
        icon: "🚗"
    },
    {
        name: "Décoration",
        icon: "🎨"
    },
    {
        name: "Livraison",
        icon: "🛵"
    },
    {
        name: "Commerce",
        icon: "🛍️"
    },
    {
        name: "Services",
        icon: "🛠️"
    }
];


/* =========================================
   ELEMENTS
========================================= */

const professionalsContainer =
    document.getElementById("professionalsContainer");

const categoriesContainer =
    document.getElementById("categoriesContainer");

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");

const resultsCount =
    document.getElementById("resultsCount");

const emptyState =
    document.getElementById("emptyState");

const resetBtn =
    document.getElementById("resetBtn");

const modal =
    document.getElementById("modal");

const openFormBtn =
    document.getElementById("openFormBtn");

const closeModal =
    document.getElementById("closeModal");

const businessForm =
    document.getElementById("businessForm");

const formSuccess =
    document.getElementById("formSuccess");

const businessCategory =
    document.getElementById("businessCategory");

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


/* =========================================
   AFFICHER LES CATÉGORIES
========================================= */

function renderCategories() {

    categoriesContainer.innerHTML = "";

    categories.forEach(category => {

        const count = businesses.filter(
            business =>
                business.category.toLowerCase() ===
                category.name.toLowerCase()
        ).length;

        const element = document.createElement("button");

        element.className = "category";

        element.innerHTML = `
            <div class="category-icon">
                ${category.icon}
            </div>

            <h3>
                ${category.name}
            </h3>

            <p>
                ${count} activité${count > 1 ? "s" : ""}
            </p>
        `;

        element.addEventListener("click", () => {

            searchInput.value = category.name;

            filterBusinesses(category.name);

            document
                .getElementById("professionnels")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

        categoriesContainer.appendChild(element);

    });

}


/* =========================================
   AFFICHER LES PROFESSIONNELS
========================================= */

function renderBusinesses(list) {

    professionalsContainer.innerHTML = "";

    if (list.length === 0) {

        professionalsContainer.style.display = "none";

        emptyState.style.display = "block";

        resultsCount.textContent = "0 résultat";

        return;
    }

    professionalsContainer.style.display = "grid";

    emptyState.style.display = "none";

    resultsCount.textContent =
        `${list.length} résultat${list.length > 1 ? "s" : ""}`;

    list.forEach(business => {

        const card = document.createElement("article");

        card.className =
            `business-card ${business.featured ? "featured" : ""}`;

        card.innerHTML = `

            ${
                business.featured
                ?
                `<span class="featured-badge">
                    ⭐ Mis en avant
                </span>`
                :
                ""
            }

            <div class="business-top">

                <div class="business-logo">
                    ${business.icon}
                </div>

                <div>

                    <h3>
                        ${business.name}
                    </h3>

                    <span class="business-category">
                        ${business.category}
                    </span>

                </div>

            </div>

            <p class="business-description">
                ${business.description}
            </p>

            <div class="business-info">

                <span>
                    📍 ${business.location}
                </span>

                <span>
                    📞 ${business.displayPhone}
                </span>

            </div>

            <div class="business-actions">

                <a
                    class="call-btn"
                    href="tel:+${business.phone}"
                >
                    📞 Appeler
                </a>

                <a
                    class="whatsapp-btn"
                    href="https://wa.me/${business.phone}"
                    target="_blank"
                >
                    💬 WhatsApp
                </a>

                <button
                    class="share-btn"
                    onclick="shareBusiness(${business.id})"
                >
                    ↗
                </button>

            </div>
        `;

        professionalsContainer.appendChild(card);

    });

}


/* =========================================
   RECHERCHE
========================================= */

function filterBusinesses(searchTerm = "") {

    const term =
        searchTerm
            .toLowerCase()
            .trim();

    const filtered =
        businesses.filter(business => {

            return (

                business.name
                    .toLowerCase()
                    .includes(term)

                ||

                business.category
                    .toLowerCase()
                    .includes(term)

                ||

                business.location
                    .toLowerCase()
                    .includes(term)

                ||

                business.description
                    .toLowerCase()
                    .includes(term)

            );

        });

    renderBusinesses(filtered);
}


/* =========================================
   BOUTON RECHERCHE
========================================= */

searchBtn.addEventListener("click", () => {

    filterBusinesses(searchInput.value);

    document
        .getElementById("professionnels")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* =========================================
   RECHERCHE EN DIRECT
========================================= */

searchInput.addEventListener("input", () => {

    filterBusinesses(searchInput.value);

});


/* =========================================
   RECHERCHE RAPIDE
========================================= */

document
    .querySelectorAll(".quick-search")
    .forEach(button => {

        button.addEventListener("click", () => {

            const search =
                button.dataset.search;

            searchInput.value = search;

            filterBusinesses(search);

            document
                .getElementById("professionnels")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    });


/* =========================================
   RESET
========================================= */

resetBtn.addEventListener("click", () => {

    searchInput.value = "";

    renderBusinesses(businesses);

});


document
    .getElementById("showAllBtn")
    .addEventListener("click", () => {

        searchInput.value = "";

        renderBusinesses(businesses);

        document
            .getElementById("professionnels")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


/* =========================================
   PARTAGE
========================================= */

function shareBusiness(id) {

    const business =
        businesses.find(item => item.id === id);

    if (!business) return;

    const shareText =
        `${business.name} - ${business.category} à Bohicon`;

    if (navigator.share) {

        navigator.share({
            title: business.name,
            text: shareText,
            url: window.location.href
        });

    } else {

        navigator.clipboard.writeText(
            `${shareText} ${window.location.href}`
        );

        alert("Lien copié !");

    }

}


/* =========================================
   MODAL
========================================= */

openFormBtn.addEventListener("click", () => {

    modal.classList.add("active");

    formSuccess.style.display = "none";

    businessForm.style.display = "block";

});


closeModal.addEventListener("click", () => {

    modal.classList.remove("active");

});


modal.addEventListener("click", event => {

    if (event.target === modal) {

        modal.classList.remove("active");

    }

});


/* =========================================
   REMPLIR SELECT CATÉGORIE
========================================= */

categories.forEach(category => {

    const option =
        document.createElement("option");

    option.value = category.name;

    option.textContent = category.name;

    businessCategory.appendChild(option);

});


/* =========================================
   FORMULAIRE
========================================= */

businessForm.addEventListener("submit", event => {

    event.preventDefault();

    businessForm.style.display = "none";

    formSuccess.style.display = "block";

    businessForm.reset();

});


/* =========================================
   MENU MOBILE
========================================= */

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });


/* =========================================
   STATISTIQUES
========================================= */

document.getElementById("heroNumber").textContent =
    businesses.length;

document.getElementById("categoryNumber").textContent =
    categories.length;


/* =========================================
   ANNÉE
========================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================================
   INITIALISATION
========================================= */

renderCategories();

renderBusinesses(businesses);