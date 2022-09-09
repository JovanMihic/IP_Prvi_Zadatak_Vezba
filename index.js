class Korisnik {
    constructor(ime, prezime) {
        this.id = null;
        this.ime = ime;
        this.prezime = prezime;
        this.listaAnaliza = [];
    }

}
class Analiza {
    constructor(naziv, donjaRef, gornjaRef, merenaVrednost, cena) {
        this.naziv = naziv;
        this.donjaRef = parseFloat(donjaRef);
        this.gornjaRef = parseFloat(gornjaRef);
        this.merenaVrednost = parseFloat(merenaVrednost);
        this.cena = parseFloat(cena);
    }
}

let listaKorisnika = [];
function osveziKorisnik() {
    let tbody = document.getElementById('teloKorisnik');
    tbody.innerHTML = '';
    let select = document.getElementById('selectAnalize');
    select.innerHTML = '';
    for (let i = 0; i < listaKorisnika.length; i++) {
        tbody.innerHTML += `
        <tr>
            <td>${listaKorisnika[i].id}</td>
            <td>${listaKorisnika[i].ime}</td>
            <td>${listaKorisnika[i].prezime}</td>
        </tr>
        `
        select.innerHTML += `
            <option value='${listaKorisnika[i].id}'>${listaKorisnika[i].ime}</option>
        `

    }
}
function addKorisnik(ime, prezime) {
    let korisnik = new Korisnik(ime, prezime)
    let noviId = 1;
    if (listaKorisnika != 0) {
        noviId = listaKorisnika[listaKorisnika.length - 1].id + 1
    }
    korisnik.id = noviId;
    listaKorisnika.push(korisnik);
    osveziKorisnik();
}
function addKorisnikDugme() {
    let ime = document.getElementById("imeKorisnik").value;
    let prezime = document.getElementById("prezimeKorisnik").value;
    console.log(ime, prezime);
    addKorisnik(ime, prezime);
}
// function addAnaliza(naziv, donjaRef, gornjaRef, merenaVrednost, cena) {
//     let analiza = new Analiza(naziv, donjaRef, gornjaRef, merenaVrednost, cena);
//     let noviId = 1;
//     if (listaKorisnika != 0) {
//         noviId = listaAnaliza[listaAnaliza.length - 1].id + 1;
//     }
//     listaAnaliza.id = noviId;
//     console.log(analiza);
//     listaAnaliza.push(analiza);
// }
function addAnalizaDugme() {
    let id = document.getElementById("idKorisnika").value
    let naziv = document.getElementById("naziv").value
    let donjaRef = document.getElementById("donjaRef").value
    let gornjaRef = document.getElementById("gornjaRef").value
    let merenaVrednost = document.getElementById("merenaVrednost").value
    let cena = document.getElementById("cena").value
    let analiza = new Analiza(naziv, donjaRef, gornjaRef, merenaVrednost, cena);
    console.log(id + " id poslat addAnalizaKorisnik" + document.getElementById("idKorisnika").value)
    addAnalizaKorisnik(id, analiza);
    prikazAnaliza()

}
function addAnalizaKorisnik(idKorisnik, analiza) {
    // console.log(listaKorisnika)
    for (let i = 0; i < listaKorisnika.length; i++) {
        // let trenutni = listaKorisnika[i]
        console.log(listaKorisnika[i].listaAnaliza)
        if (listaKorisnika[i].id == idKorisnik) {
            listaKorisnika[i].listaAnaliza.push(analiza);
            break;
        }
    }

}
function prikazAnaliza() {
    let tbody = document.getElementById('teloAnaliza');
    let idKorisnik = document.getElementById('selectAnalize').value;
    let pUkupnaCena = document.getElementById('pUkupnaCena');

    tbody.innerHTML = '';
    for (let i = 0; i < listaKorisnika.length; i++) {
        let korisnik = listaKorisnika[i];
        if (korisnik.id == idKorisnik) {
            let ukupnaCena = 0;
            for (let j = 0; j < korisnik.listaAnaliza.length; j++) {
                let boja = 'green';
                let trenutnaAnaliza = korisnik.listaAnaliza[j];
                ukupnaCena += parseFloat(trenutnaAnaliza.cena);

                if (trenutnaAnaliza.merenaVrednost < trenutnaAnaliza.donjaRef
                    || trenutnaAnaliza.merenaVrednost > trenutnaAnaliza.gornjaRef)
                    boja = 'red';
                tbody.innerHTML += `
                    <tr id="analiza${j}" style='background-color:${boja}'>
                        <td>${trenutnaAnaliza.naziv}</td>
                        <td>${trenutnaAnaliza.donjaRef}</td>
                        <td>${trenutnaAnaliza.gornjaRef}</td>
                        
                        <td>${trenutnaAnaliza.merenaVrednost}</td>
                        <td>${trenutnaAnaliza.cena}</td>
                    </tr>
                `
            }
            pUkupnaCena.innerHTML = "Ukupna cena analiza: " + ukupnaCena + "rsd.";
            break;
        }
    }
}
addKorisnik("Miki", "Manojlovic");
addKorisnik("Joca", "Janojlovic");
prikazAnaliza();




