// Hakee elementit
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');

// Lisää napin klikille tapahtumankuuntelijan
menuIcon.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    menuIcon.classList.toggle('open'); // Lisätään Avaus-luokka hampurilaisnappiin
});

window.addEventListener('resize', () => {
    // Poista valikon aktiivisuus isolla näytöllä
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        menuIcon.classList.remove('open');
    }
});




