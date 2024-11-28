import React from "react";
import { useParams } from "react-router-dom";
import "./KayntiTiedot.css";

const kaynnit = [
    {
        id: 1,
        Käynti: "Vastaanotto",
        Päivämäärä: "10.07.2024",
        Kommentit: `
        Potilas tuli vastaanotolle yleiseen terveystarkastukseen ja verikokeiden tuloksia tarkasteltiin. 
        Verikokeet suoritettiin edellisellä viikolla ja niiden perusteella voidaan todeta seuraavat tulokset:

        **Hemoglobiini (Hb)**: 149 g/l (Normaali: 135-175 g/l)
        - Hemoglobiinitaso on hyvä ja osoittaa, että potilas ei ole aneeminen.

        **Punasolujen määrä (RBC)**: 5.1 milj/µl (Normaali: 4.5-5.9 milj/µl)
        - Punasolujen määrä on normaali, mikä viittaa hyvään hapenkuljetuskykyyn kehossa.

        **B-HCG (Kreatiniini)**: 65 µmol/l (Normaali: 60-115 µmol/l)
        - Kreatiniinitaso on normaalialueella, mikä viittaa hyvään munuaistoimintaan.

        **Kolesteroli (TC)**: 5.2 mmol/l (Normaali: <5.0 mmol/l)
        - Kolesteroliarvo on hieman koholla. Suositellaan ruokavalion tarkistamista ja liikunnan lisäämistä.

        **Verensokeri (Glukoosi)**: 5.4 mmol/l (Normaali: 3.5-5.5 mmol/l)
        - Verensokeriarvo on normaalirajoissa, mikä viittaa siihen, että potilas ei ole altis diabetekselle.

        **Leukosyytit (WBC)**: 6.2 x 10^9/l (Normaali: 4.0-11.0 x 10^9/l)
        - Valkosolumäärä on normaali, mikä osoittaa, että ei ole tulehdusta tai infektioita.

        **Maksaentsyymit (ALAT)**: 22 U/l (Normaali: 10-50 U/l)
        - Maksaentsyymiarvot ovat normaalit, ei merkkejä maksasairauksista.

        **Rauta (Ferritiini)**: 80 µg/l (Normaali: 30-300 µg/l)
        - Raudan määrä veressä on normaali, eikä potilas kärsi raudanpuutteesta.

        Potilaan yleinen terveydentila näyttää hyvältä verikokeiden perusteella. Kolesteroliarvojen kohonnut taso on kuitenkin huomioitava ja potilasta neuvottiin tekemään muutoksia ruokavaliossaan ja lisäämään liikuntaa. 

        Seuraavaksi suositellaan, että potilas palaa vuosittaiseen terveystarkastukseen, ja jos ruokavalion tai elämäntapojen muutokset eivät paranna kolesteroliarvoja, voidaan harkita lääkityksen aloittamista.
    `,
    },
    {
        id: 2,
        Käynti: "Hammaslääkäri",
        Päivämäärä: "10.06.2023",
        Kommentit: `
            Potilas saapui hammaslääkärin vastaanotolle tarkastusta varten. 
            Ennen vastaanottoa potilas ilmoitti, ettei hänellä ollut akuuteja kipuja, mutta oli huomannut lievää herkkyyttä juomia nauttiessa.

            Suoritin suun perusteellisen tutkimuksen ja röntgenkuvauksen, joka paljasti kaksi reikää:
            1. **Yläleuan vasen kulmahampaan (hampaan numero 24) alueella** löytyi pieni reikä, joka oli edennyt hammaskudoksen syvemmälle kerrokseen.
            2. **Alaleuan oikeaan poskihampaaseen (hampaan numero 46)** oli tullut syvempi reikä, joka oli aiheuttanut hammaskiilteen vaurioitumista.

            Reikien hoito aloitettiin välittömästi.
            - **Hampaan 24 paikkaus:** Puhdistin reikäalueen ja valmistin sen paikkaamista varten. Käytettiin komposiittimateriaalia, joka soveltuu hyvin esteettisiin alueisiin.
            - **Hampaan 46 paikkaus:** Puhdistuksen jälkeen syvempi reikä täytettiin komposiitilla, joka mukautui hampaan muotoon ja värisävyyn.

            Hoito-ohjeet:
            Potilas ohjeistettiin välttämään kovia ruokia ja juomia toimenpiteen jälkeen. Lääkäriltä annettiin myös suositus käyttää fluorihammastahnaa ja hoitaa hampaita erityisen huolellisesti seuraavan viikon ajan.

            Seuranta:
            Potilas palaa vuoden sisällä kontrollikäynnille, ja hammastarkastus suositellaan tehtäväksi säännöllisesti. Mikäli uusia ongelmia ilmenee, on suositeltavaa ottaa yhteyttä mahdollisimman pian.
        `,
    },
    {
        id: 3,
        Käynti: "Ortopedia",
        Päivämäärä: "15.11.2024",
        Kommentit: `
            Potilas saapui vastaanotolle äkillisen vamman vuoksi. Potilas kertoi kaatuneensa lenkkeillessään ja koki voimakasta kipua vasemmassa alaraajassa. Potilas ei pystynyt astumaan jalalleen ja oli huolissaan mahdollisesta luunmurtumasta.

            Potilasta tutkittiin tarkasti ja röntgenkuva otettiin vamman alueelta. Röntgenkuvassa todettiin, että **vasemman alaraajan sääriluu** oli murtunut noin puolivälin alueelta. Murtuma oli luonteeltaan avomurtuma, jossa luunpala oli osittain siirtynyt ja aiheuttanut vamman ympärille tulehdusta ja kudosvaurioita.

            Hoitotoimenpiteet:
            1. **Murtuman paikallaan asettaminen ja stabilointi:** Murtuma alueella tehtiin paikallinen puudutus, jonka jälkeen murtuneen luun osat asennettiin paikoilleen ja kiinnitettiin kirurgisesti metallilevyillä ja ruuveilla.
            2. **Sidoksen asettaminen:** Murtuman tukemiseksi asetettiin kirurginen kipsi, joka piti luut paikallaan ja vähensi liikettä.
            3. **Kivun hallinta:** Potilas sai kipulääkkeitä, sekä tulehduskipulääkkeitä, jotka auttavat vamman jälkeisessä toipumisessa ja tulehduksen hallinnassa.

            Hoito-ohjeet:
            Potilas ohjeistettiin:
            - Vältettävä painon kohdistamista murtuneelle jalalle, erityisesti ensimmäisten viikkojen aikana.
            - Käyttämään kyynärsauvoja liikkumisen apuna.
            - Pitämään jalka koholla vähentääkseen turvotusta.
            - Seuraava kontrollikäynti on 2 viikon kuluttua, jolloin tarkistetaan murtuman paraneminen ja mahdollisesti kuvataan jalka uudelleen.

            Seuranta:
            Potilas palaa seuraavaan tarkastukseen noin kahden viikon kuluttua. Tällöin röntgenkuvauksella tarkistetaan murtuman paraneminen ja tehdään tarvittavat jatkotoimenpiteet, kuten kipsin poisto, mikäli murtuma on parantunut riittävästi.

            Kommentit:
            Hoitotoimenpiteet sujuivat hyvin, ja potilas oli tyytyväinen saamaansa hoitoon. Potilaan kivunlievitystä hallittiin tehokkaasti, ja hänet ohjeistettiin tarkasti jatkotoimenpiteistä.
        `,
    },
];

function KayntiTiedot() {
    const { id } = useParams();

    const kaynti = kaynnit.find((item) => item.id.toString() === id);

    if (!kaynti) {
        return <p>Tietoja ei löytynyt.</p>;
    }

    return (
        <div className="kaynti-container">
            <h2 className="kaynti-title">
                Lääkärikäynnin tiedot - {kaynti.Käynti}
            </h2>
            <div className="kaynti-details">
                <p>
                    <strong>Päivämäärä:</strong> {kaynti.Päivämäärä}
                </p>
                <p>
                    <strong>Kommentit:</strong> {kaynti.Kommentit}
                </p>
            </div>
        </div>
    );
}

export default KayntiTiedot;
