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


const kartta = L.map('kartta').setView([61.6886, 27.2736], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
}).addTo(kartta);

const liikeForm = document.getElementById('liikeForm');
const osoiteInput = document.getElementById('nimi');
const lisaaKartalleButton = document.getElementById('lisaaKartalleButton');
const liikeLista = document.getElementById('liikeUl');

let haettuPaikka = null;
let lisatytLiikkeet = JSON.parse(localStorage.getItem('huoltoliikkeet')) || [];

// Valmiit esimerkkiliikkeet
const valmisLiikkeet = [
    { nimi: "Mikkelin Pyörähuolto", koordinaatit: [61.6875, 27.2725] },
    { nimi: "Keskustan Pyöräkorjaamo", koordinaatit: [61.691, 27.271] },
];

valmisLiikkeet.forEach(liike => {
    L.marker(liike.koordinaatit).addTo(kartta)
        .bindPopup(`<strong>${liike.nimi}</strong>`);
});

lisatytLiikkeet.forEach(liike => {
    L.marker(liike.koordinaatit).addTo(kartta)
        .bindPopup(`<strong>${liike.nimi}</strong>`);
});

naytaLista();

function naytaLista() {
    liikeLista.innerHTML = '';
    lisatytLiikkeet.forEach(liike => {
        const li = document.createElement('li');
        li.textContent = liike.nimi;

        li.addEventListener('click', () => {
            kartta.setView(liike.koordinaatit, 15);
            L.popup()
              .setLatLng(liike.koordinaatit)
              .setContent(`<strong>${liike.nimi}</strong>`)
              .openOn(kartta);
        });

        liikeLista.appendChild(li);
    });
}

liikeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const osoite = osoiteInput.value.trim();

    if (!osoite) {
        alert("Anna liikkeen nimi tai osoite.");
        return;
    }

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(osoite)}`);
        const data = await response.json();

        if (data.length === 0) {
            alert("Paikkaa ei löytynyt. Kokeile tarkempaa osoitetta.");
            return;
        }

        const paikka = data[0];
        const lat = parseFloat(paikka.lat);
        const lon = parseFloat(paikka.lon);

        haettuPaikka = {
            nimi: osoite,
            koordinaatit: [lat, lon]
        };

        L.marker([lat, lon]).addTo(kartta)
            .bindPopup(`<strong>${osoite}</strong><br>Voit lisätä tämän liikkeen.`)
            .openPopup();

        kartta.setView([lat, lon], 14);
        lisaaKartalleButton.disabled = false;

    } catch (error) {
        console.error(error);
        alert("Virhe haettaessa sijaintia.");
    }
});

lisaaKartalleButton.addEventListener('click', () => {
    if (haettuPaikka) {
        L.marker(haettuPaikka.koordinaatit).addTo(kartta)
            .bindPopup(`<strong>${haettuPaikka.nimi}</strong>`).openPopup();

        lisatytLiikkeet.push(haettuPaikka);
        localStorage.setItem('huoltoliikkeet', JSON.stringify(lisatytLiikkeet));

        naytaLista();
        lisaaKartalleButton.disabled = true;
        haettuPaikka = null;
    }
});
