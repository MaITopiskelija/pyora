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



 const form = document.getElementById('huoltoForm');
        const huoltoLista = document.getElementById('huoltoLista');

        // Lataa huollot LocalStoragesta
        document.addEventListener('DOMContentLoaded', () => {
            const huollot = JSON.parse(localStorage.getItem('huollot')) || [];
            huollot.forEach(naytaHuolto);
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const pyora = document.getElementById('pyora').value;
            const pvm = document.getElementById('pvm').value;
            const toimenpiteet = Array.from(document.getElementById('toimenpiteet').selectedOptions).map(option => option.value);
            const lisatietoja = document.getElementById('lisatietoja').value;

            const huolto = { pyora, pvm, toimenpiteet, lisatietoja };

            // Tallennus LocalStorageen
            const huollot = JSON.parse(localStorage.getItem('huollot')) || [];
            huollot.push(huolto);
            localStorage.setItem('huollot', JSON.stringify(huollot));

            // Näytä uusi huolto
            naytaHuolto(huolto);

            form.reset();
        });

        function naytaHuolto(huolto) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${huolto.pyora}</strong> (${huolto.pvm}): ${huolto.toimenpiteet.join(', ')}. ${huolto.lisatietoja}`;
            huoltoLista.appendChild(li);
        }
        



