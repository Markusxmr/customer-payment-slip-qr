<script lang="ts">
  export let sifra_namjene;
</script>

<select
  bind:value={sifra_namjene}
  class="form-field form-field--sifra-namjene"
  maxlength="4"
  id="sifra_namjene"
  ><option value="" /><option value="ADMG">ADMG - Administracija</option><option
    value="GVEA">GVEA - Austrijski državni zaposlenici, Kategorija A</option
  ><option value="GVEB"
    >GVEB - Austrijski državni zaposlenici, Kategorija B</option
  ><option value="GVEC"
    >GVEC - Austrijski državni zaposlenici, Kategorija C</option
  ><option value="GVED"
    >GVED - Austrijski državni zaposlenici, Kategorija D</option
  ><option value="BUSB">BUSB - Autobusni</option><option value="CPYR"
    >CPYR - Autorsko pravo</option
  ><option value="HSPC">HSPC - Bolnička njega</option><option value="RDTX"
    >RDTX - Cestarina</option
  ><option value="DEPT">DEPT - Depozit</option><option value="DERI"
    >DERI - Derivati (izvedenice)</option
  ><option value="FREX">FREX - Devizno tržište</option><option value="CGDD"
    >CGDD - Direktno terećenje nastalo kao rezultat kartične transakcije</option
  ><option value="DIVD">DIVD - Dividenda</option><option value="BECH"
    >BECH - Dječji doplatak</option
  ><option value="CHAR">CHAR - Dobrotvorno plaćanje</option><option value="ETUP"
    >ETUP - Doplata e-novca</option
  ><option value="MTUP">MTUP - Doplata mobilnog uređaja (bon)</option><option
    value="GOVI">GOVI - Državno osiguranje</option
  ><option value="ENRG">ENRG - Energenti</option><option value="CDCD"
    >CDCD - Gotovinska isplata</option
  ><option value="CSDB">CSDB - Gotovinska isplata</option><option value="TCSC"
    >TCSC - Gradske naknade</option
  ><option value="CDCS">CDCS - Isplata gotovine s naknadom</option><option
    value="FAND">FAND - Isplata naknade za elementarne nepogode</option
  ><option value="CSLP">CSLP - Isplata socijalnih zajmova društava banci</option
  ><option value="RHBS"
    >RHBS - Isplata za vrijeme profesionalne rehabilitacije</option
  ><option value="GWLT">GWLT - Isplata žrtvama rata i invalidima</option><option
    value="ADCS"
    >ADCS - Isplate za donacije, sponzorstva, savjetodavne, intelektualne i
    druge usluge</option
  ><option value="PADD">PADD - Izravno terećenje</option><option value="INTE"
    >INTE - Kamata</option
  ><option value="CDDP">CDDP - Kartično plaćanje s odgodom</option><option
    value="CDCB"
    >CDCB - Kartično plaćanje uz gotovinski povrat (Cashback)</option
  ><option value="BOCE">BOCE - Knjiženje konverzije u Back Office-u</option
  ><option value="POPE">POPE - Knjiženje mjesta kupnje</option><option
    value="RCKE">RCKE - Knjiženje ponovne prezentacije čeka</option
  ><option value="AREN">AREN - Knjiženje računa potraživanja</option><option
    value="COMC">COMC - Komercijalno plaćanje</option
  ><option value="UBIL">UBIL - Komunalne usluge</option><option value="COMT"
    >COMT - Konsolidirano plaćanje treće strane za račun potrošača.</option
  ><option value="SEPI">SEPI - Kupnja vrijednosnica (interna)</option><option
    value="GDDS">GDDS - Kupovina-prodaja roba</option
  ><option value="GSCB"
    >GSCB - Kupovina-prodaja roba i usluga uz gotovinski povrat</option
  ><option value="GDSV">GDSV - Kupovina/prodaja roba i usluga</option><option
    value="SCVE">SCVE - Kupovina/prodaja usluga</option
  ><option value="HLTC">HLTC - Kućna njega bolesnika</option><option
    value="CBLK">CBLK - Masovni kliring kartica</option
  ><option value="MDCS">MDCS - Medicinske usluge</option><option value="NWCM"
    >NWCM - Mrežna komunikacija</option
  ><option value="RENT">RENT - Najam</option><option value="ALLW"
    >ALLW - Naknada</option
  ><option value="SSBE">SSBE - Naknada socijalnog osiguranja</option><option
    value="LICF">LICF - Naknada za licencu</option
  ><option value="GFRP">GFRP - Naknada za nezaposlene u toku stečaja</option
  ><option value="BENE">BENE - Naknada za nezaposlenost/invaliditet</option
  ><option value="CFEE">CFEE - Naknada za poništenje</option><option
    value="AEMP">AEMP - Naknada za zapošljavanje</option
  ><option value="COLL">COLL - Naplata</option><option value="FCOL"
    >FCOL - Naplata naknade po kartičnoj transakciji</option
  ><option value="DBTC">DBTC - Naplata putem terećenja</option><option
    value="NOWS">NOWS - Nenavedeno</option
  ><option value="IDCP"
    >IDCP - Neopozivo plaćanje sa računa debitne kartice</option
  ><option value="ICCP"
    >ICCP - Neopozivo plaćanje sa računa kreditne kartice</option
  ><option value="BONU">BONU - Novčana nagrada (bonus).</option><option
    value="PAYR">PAYR - Obračun plaća</option
  ><option value="BLDM">BLDM - Održavanje zgrada</option><option value="HEDG"
    >HEDG - Omeđivanje rizika (Hedging)</option
  ><option value="CDOC">CDOC - Originalno odobrenje</option><option value="PPTI"
    >PPTI - Osiguranje imovine</option
  ><option value="LBRI">LBRI - Osiguranje iz rada</option><option value="OTHR"
    >OTHR - Ostalo</option
  ><option value="CLPR">CLPR - Otplata glavnice kredita za automobil</option
  ><option value="HLRP">HLRP - Otplata stambenog kredita</option><option
    value="LOAR">LOAR - Otplata zajma</option
  ><option value="ALMY">ALMY - Plaćanje alimentacije</option><option
    value="RCPT">RCPT - Plaćanje blagajničke potvrde. (ReceiptPayment)</option
  ><option value="PRCP">PRCP - Plaćanje cijene</option><option value="SUPP"
    >SUPP - Plaćanje dobavljača</option
  ><option value="CFDI">CFDI - Plaćanje dospjele glavnice</option><option
    value="GOVT">GOVT - Plaćanje države</option
  ><option value="PENS">PENS - Plaćanje mirovine</option><option value="DCRD"
    >DCRD - Plaćanje na račun debitne kartice.</option
  ><option value="CCRD">CCRD - Plaćanje na račun kreditne kartice</option
  ><option value="SALA">SALA - Plaćanje plaće</option><option value="REBT"
    >REBT - Plaćanje popusta/rabata</option
  ><option value="TAXS">TAXS - Plaćanje poreza</option><option value="VATX"
    >VATX - Plaćanje poreza na dodatnu vrijednost</option
  ><option value="RINP">RINP - Plaćanje rata koje se ponavljaju</option><option
    value="IHRP">IHRP - Plaćanje rate pri kupnji na otplatu</option
  ><option value="IVPT">IVPT - Plaćanje računa</option><option value="CDBL"
    >CDBL - Plaćanje računa za kreditnu karticu</option
  ><option value="TREA">TREA - Plaćanje riznice</option><option value="CMDT"
    >CMDT - Plaćanje roba</option
  ><option value="INTC">INTC - Plaćanje unutar društva</option><option
    value="INVS">INVS - Plaćanje za fondove i vrijednosnice</option
  ><option value="PRME">PRME - Plemeniti metali</option><option value="AGRT"
    >AGRT - Poljoprivredni transfer</option
  ><option value="INTX">INTX - Porez na dohodak</option><option value="PTXP"
    >PTXP - Porez na imovinu</option
  ><option value="NITX">NITX - Porez na neto dohodak</option><option
    value="ESTX">ESTX - Porez na ostavštinu</option
  ><option value="GSTX">GSTX - Porez na robu i usluge</option><option
    value="HSTX">HSTX - Porez na stambeni prostor</option
  ><option value="FWLV">FWLV - Porez na strane radnike</option><option
    value="WHLD">WHLD - Porez po odbitku</option
  ><option value="BEXP">BEXP - Poslovni troškovi</option><option value="REFU"
    >REFU - Povrat</option
  ><option value="TAXR">TAXR - Povrat poreza</option><option value="RIMB"
    >RIMB - Povrat prethodne pogrešne transakcije</option
  ><option value="OFEE">OFEE - Početna naknada (Opening Fee)</option><option
    value="ADVA">ADVA - Predujam</option
  ><option value="INSU">INSU - Premija osiguranja</option><option value="INPC"
    >INPC - Premija osiguranja za vozilo</option
  ><option value="TRPT">TRPT - Prepaid cestarina (ENC)</option><option
    value="SUBS">SUBS - Pretplata</option
  ><option value="CASH">CASH - Prijenos gotovine</option><option value="PENO"
    >PENO - Prisilna naplata</option
  ><option value="COMM">COMM - Provizija</option><option value="INSM"
    >INSM - Rata</option
  ><option value="ELEC">ELEC - Račun za električnu energiju</option><option
    value="CBTV">CBTV - Račun za kabelsku TV</option
  ><option value="OTLC">OTLC - Račun za ostale telekom usluge</option><option
    value="GASB">GASB - Račun za plin</option
  ><option value="WTER">WTER - Račun za vodu</option><option value="ANNI"
    >ANNI - Renta</option
  ><option value="BBSC">BBSC - Rodiljna naknada</option><option value="NETT"
    >NETT - Saldiranje (netiranje)</option
  ><option value="CAFI">CAFI - Skrbničke naknade (interne)</option><option
    value="STDY">STDY - Studiranje</option
  ><option value="ROYA">ROYA - Tantijeme</option><option value="PHON"
    >PHON - Telefonski račun</option
  ><option value="FERB">FERB - Trajektni</option><option value="DMEQ"
    >DMEQ - Trajna medicinska pomagala</option
  ><option value="WEBI">WEBI - Transakcija inicirana internetom</option><option
    value="TELI">TELI - Transakcija inicirana telefonom</option
  ><option value="HREC"
    >HREC - Transakcija se odnosi na doprinos poslodavca za troškove stanovanja</option
  ><option value="CBFR"
    >CBFR - Transakcija se odnosi na kapitalnu štednju za mirovinu</option
  ><option value="CBFF"
    >CBFF - Transakcija se odnosi na kapitalnu štednju, općenito</option
  ><option value="TRAD">TRAD - Trgovinske usluge</option><option value="COST"
    >COST - Troškovi</option
  ><option value="CPKC">CPKC - Troškovi parkiranja</option><option value="TBIL"
    >TBIL - Troškovi telekomunikacija</option
  ><option value="NWCH">NWCH - Troškovi za mrežu</option><option value="EDUC"
    >EDUC - Troškovi školovanja</option
  ><option value="LIMA">LIMA - Upravljanje likvidnošću</option><option
    value="ACCT">ACCT - Upravljanje računom</option
  ><option value="ANTS">ANTS - Usluge anestezije</option><option value="VIEW"
    >VIEW - Usluge oftalmološke skrbi</option
  ><option value="LTCF">LTCF - Ustanova dugoročne zdravstvene skrbi</option
  ><option value="ICRF">ICRF - Ustanova socijalne skrbi</option><option
    value="CVCF">CVCF - Ustanova za usluge skrbi za rekonvalescente</option
  ><option value="PTSP">PTSP - Uvjeti plaćanja</option><option value="MSVC"
    >MSVC - Višestruke vrste usluga</option
  ><option value="SECU">SECU - Vrijednosni papiri</option><option value="LOAN"
    >LOAN - Zajam</option
  ><option value="FCPM">FCPM - Zakašnjele naknade</option><option value="TRFD"
    >TRFD - Zaklada</option
  ><option value="CDQC">CDQC - Zamjenska gotovina</option><option value="HLTI"
    >HLTI - Zdravstveno osiguranje</option
  ><option value="AIRB">AIRB - Zračni</option><option value="DNTS"
    >DNTS - Zubarske usluge</option
  ><option value="SAVG">SAVG - Štednja</option><option value="RLWY"
    >RLWY - Željeznički</option
  ><option value="LIFI">LIFI - Životno osiguranje</option></select
>
