function planWhenDone(transitionable, func) {
  function wrapper(arg) {
    transitionable.removeEventListener('transitionend', wrapper);
    func(arg);
  }
  transitionable.addEventListener('transitionend', wrapper);

  //setTimeout(20);
  style = transitionable.currentStyle || window.getComputedStyle(transitionable);
  if(style.transitionProperty == "" || style.transitionDuration == "0s" || style.transitionDuration == "0s 0s") {
      console.log(transitionable.id + " fires straight away, calling " + func.name);
      var endEvent = document.createEvent("HTMLEvents");
      endEvent.eventName = "transitionend";
      endEvent.initEvent("transitionend", true, true);
      transitionable.dispatchEvent(endEvent);
  } else {
      console.log(transitionable.id + " in transition, " + func.name + " programmed");
  }
}

function toggle(mot) {
    var id_aiguille = mot.href.split('#')[1];
    var article = document.getElementById("article-" + id_aiguille);
    var nuage = document.getElementById("nuage");

    event.preventDefault();
    // TODO Acter le changement d'url ?

    console.log('switch ' + id_aiguille);

    // Si un mot est ouvert, fermer le mot actif, puis ouvrir mot :
    ouverts = document.getElementsByClassName("mot-ouvert");
    if(ouverts.length) {
        if(ouverts.length > 1) { console.log("! plus d'un article ouvert"); }
        let mot_ouvert = ouverts[0];
        let id_ouverte = mot_ouvert.id.split('-')[1];
        let article_ouvert = document.getElementById("article-" + id_ouverte);
        console.log("id ouverte : " + id_ouverte);
        if(mot_ouvert == mot) {
            console.log(mot.id + " était déjà ouvert, fermeture");
            planWhenDone(mot, rappeler_nuage);
            cacher(mot);
            /*
            planWhenDone(nuage, function() {
                cacher(mot);
            });
            rappeler_nuage();
            */
        } else {
            planWhenDone(mot_ouvert, function() {
                console.log("ouverture du mot " + mot.id);
                montrer(mot);
            });
            cacher(mot_ouvert);
        }
    } else {
        montrer(mot);
    }
}
function rappeler_nuage() {
    var nuage = document.getElementById("nuage");
    var mots = document.getElementById("mots");
    let nav = document.getElementById("nav");

    console.log("grandissement du nuage");
    //planWhenDone(nuage, function() { document.body.appendChild(nuage.parentElement); });
    nav.appendChild(nuage);
    nav.style.position = "relative";
    /*
    nuage.style.position = "absolute";
    nuage.style.left = "0";
    nuage.style.top = "0";
    */
    void nuage.offsetWidth;
    nuage.style.width = "90vw";
    nuage.style.height = "45vw";
    //nuage.style.opacity = "";
    //nuage.style.display = "";
}

function reduire_nuage() {
    var nuage = document.getElementById("nuage");
    var mots = document.getElementById("mots");
    let nuageIniBBox = nuage.getBoundingClientRect();
    let destLeft = banner.offsetLeft + banner.offsetWidth + "px";
    let destTop = banner.offsetTop + banner.offsetHeight + "px";

    /*
    planWhenDone(nuage, function() {
        banner.appendChild(nuage);
        setTimeout(40);
        console.log("nuage dans banner");
        //nuage.parentElement.style.position = "static";
    });
    */

    console.log("réduction du nuage, déplacement vers ", destLeft, destTop);
    banner.appendChild(nuage);
    nuage.style.left = nuageIniBBox['left'] + "px";
    nuage.style.top = nuageIniBBox['top'] + "px";

    void nuage.offsetWidth;
    //console.log(nuage.style.transition);
    //console.log(window.getComputedStyle(nuage).transition);
    nuage.style.width = "10em";
    nuage.style.height = "5em";
    //nuage.style.opacity = "0";
    //nuage.style.display = "none";
}

function cacher(mot) {
    var trousseau = document.getElementById("mots");
    var nuage = document.getElementById("nuage");
    var id_aiguille = mot.href.split('#')[1];
    var article = document.getElementById("article-" + id_aiguille);
    //let box_style = window.getComputedStyle(nuage).getBoundingRect;
    let boxPos = nuage.getBoundingClientRect();

    function put_mot_back() {
        console.log("remettre le mot dans le trousseau");
        //setTimeout(20);
        // Truc pour relancer l'animation :
        void mot.offsetTop;
        mot.style.position = 'static';
        trousseau.appendChild(mot);
        //mot.style.left = '0';
        //mot.style.top = '0';
        mot.classList.remove("mot-ouvert");
        //mot.id = "mot-" + id_aiguille;
    }

    if(article != null) {
        // D'abord déclencher le fondu en opacité, puis cacher :
        planWhenDone(mot, function() {
            console.log("fermeture de l'article " + article.id);
            //article.style.visibility = "hidden";
            //article.hidden = true;
            // DEBUG enpêche le fondu en opacité ?
            article.style.display = "none";
        });
        article.style.opacity = 0;
    } else {
        console.log("! toggle ferme l'article " + id_aiguille + " mais il est déjà fermé");
    }
    console.log("fermeture du mot : " + id_aiguille);

    planWhenDone(mot, put_mot_back);
    console.log("position : ", mot.offsetLeft, mot.offsetTop);
    console.log("Destination nuage : ", destLeft, destTop);
    //mot.style.position = "relative";
    // Truc pour initialiser la transition :
    void mot.offsetLeft;

    rappeler_nuage();
    //mot.style.left = destLeft + "px";
    //mot.style.top = destTop + "px";
    //let destLeft = nuage.parentElement.offsetLeft;
    //let destTop = nuage.parentElement.offsetTop + nuage.parentElement.offsetHeight;
    //let destLeft = boxPos.left;
    //let destTop = boxPos.top + boxPos.height;
    mot.style.left = boxPos.left + "px";
    mot.style.top = boxPos.top + boxPos.height + "px";
}

function montrer(mot) {
    var ecran = document.getElementById("ecran");
    var nuage = document.getElementById("nuage");
    var id_aiguille = mot.href.split('#')[1];
    var article = document.getElementById("article-" + id_aiguille);
    var keyword = mot.textContent.trim();
    var texte = article.innerHTML;
    var texteFinal = '';

    let nuageIniBBox = mot.offsetParent.getBoundingClientRect();
    let initialLeft = facteur_nuage * mot.offsetLeft + nuageIniBBox['left'];
    let initialTop = facteur_nuage * mot.offsetTop + nuageIniBBox['top'];

    let initialStyle = window.getComputedStyle(mot);
    let initialFontSize = facteur_nuage * initialStyle.fontSize.replace(/px$/, '');

    //console.log('coordonnées parent : ', nuageIniBBox['left'], nuageIniBBox['top']);
    console.log('coordonnées mot : ', initialLeft, initialTop);

    function planter_aiguille() {
        // Si elle n'existe pas encore, copier le span contenant le mot
        // dans l'article.
        // TODO faire en php ou liquid ?
        if(! document.getElementById(id_aiguille)) {
            console.log("injection de l'aiguille");
            let tampon = texte.split(keyword);

            texteFinal += tampon[0];
            texteFinal += '<span class="aiguille" id="' + id_aiguille + '">' + keyword + '</span>';
            texteFinal += tampon.slice(1).join(keyword);

            // Réinjection du html :
            article.innerHTML = texteFinal;
        }
    }

    function deplacer_mot() {
        //window.setTimeout(20);
        let aiguille = document.getElementById(id_aiguille);

        // Déplacer le mot jusqu'à sa position dans le texte
        // TODO rapporter quand on referme.

        destLeft = aiguille.offsetLeft + aiguille.offsetParent.offsetLeft;
        destTop = aiguille.offsetTop + aiguille.offsetParent.offsetTop;
        mot.style.position = "relative";
        console.log("déplacement vers : ", destLeft, destTop);
        void mot.offsetLeft;
        mot.style.left = String(destLeft) + "px";
        mot.style.top = String(destTop) + "px";

        if(mot.className.search("wordcount")) {
            aiguille.classList.add(mot.className.slice(mot.className.search("wordcount")).split(' ')[0]);
        }

        article.style.opacity = 1;

    }

    function rearmer_mot() {
        //article.css('visibility', 'visible');

        console.log("réarmement mot" + mot.id);
        //event.target.classList.add('active');

        //article.appendChild(mot);
        //window.setTimeout(20);
    }

    /* 
     * Action
     */

    mot.classList.add("mot-ouvert");

    // Reset à la valeur css :
    article.style.display = "";
    setTimeout(400);

    planter_aiguille();

    let aiguille = document.getElementById(id_aiguille);

    ecran.appendChild(mot);
    mot.style.fontSize = String(initialFontSize) + "px";

    aiguille.style.fontSize = String(initialFontSize) + "px";

    mot.style.position = "relative";
    mot.style.left = String(initialLeft) + "px";
    mot.style.top = String(initialTop) + "px";

    //console.log(nuage.style.transition);
    //let box_style = window.getComputedStyle(nuage);
    reduire_nuage();
    deplacer_mot();
    //planWhenDone(nuage, deplacer_mot);
    //planWhenDone(mot, rearmer_mot);
}

