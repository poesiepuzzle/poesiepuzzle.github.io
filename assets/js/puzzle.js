function toggle(mot) {
    var id_aiguille = mot.href.split('#')[1];
    var article = document.getElementById("article-" + id_aiguille);
    var ecran = document.getElementById("ecran");

    event.preventDefault();
    // TODO Acter le changement d'url ?

    console.log('id présenté : ' + id_aiguille);

    function show_mot() {
        event.target.removeEventListener('transitionend', show_mot);
        console.log("ouverture du mot " + mot.id);
        montrer(mot);
    }

    // Si un mot est ouvert dans ecran, fermer le mot actif, puis ouvrir mot :
    if(mot_ouvert = document.getElementById('mot_ouvert')) {
        id_ouverte = mot_ouvert.id.split('-')[1];
        let article_ouvert = document.getElementById("article-" + id_ouverte);
        console.log("id ouverte : " + id_ouverte);
        if(mot_ouvert == mot) {
            // Ne devrait pas arriver, le lien est dans ecran, qui est en-dessous.
            console.log(mot.id + " était déjà ouvert, fermeture");
            cacher(mot);
        } else {
            mot_ouvert.addEventListener('transitionend', show_mot);
            cacher(mot_ouvert);
        }
    } else {
        montrer(mot);
    }
}

function cacher(mot) {
    var trousseau = document.getElementById("mots");
    var id_aiguille = mot.href.split('#')[1];
    var article = document.getElementById("article-" + id_aiguille);

    console.log("fermeture du mot : " + mot.id);
    function hide_article() {
        event.target.removeEventListener('transitionend', hide_article);
        //article.style.visibility = "hidden";
        article.style.display = "none";
    }
    function put_mot_back() {
        event.target.removeEventListener('transitionend', put_mot_back);
        //trousseau.appendChild(mot);
        mot.style.position = 'static';
        mot.style.left = "";
        mot.style.top = "";
        mot.id = "mot-" + id_aiguille;
    }

    if(article != null) {
        // D'abord déclencher le fondu en opacité, puis cacher :
        article.addEventListener('transitionend', hide_article);
        console.log("fermeture de l'article " + article.id);
        article.style.opacity = 0;
    } else {
        console.log("! toggle ferme l'article " + id_aiguille + " mais il est déjà fermé");
    }
    mot.addEventListener('transitionend', put_mot_back);
    mot.style.left = String(trousseau.offsetLeft) + "px";
    mot.style.top = String(trousseau.offsetTop) + "px";

    console.log("fermeture de l'id " + id_aiguille);
}

function montrer(mot) {
    var id_aiguille = mot.href.split('#')[1];
    var article = document.getElementById("article-" + id_aiguille);
    var ecran = document.getElementById("ecran");
    article.style.display = "block";
    var keyword = mot.textContent.trim();
    var texte = article.innerHTML;
    var texteFinal = '';

    // Si elle n'existe pas encore, copier l'aiguille du trousseau dans la article.
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

    //window.setTimeout(20);
    let aiguille = document.getElementById(id_aiguille);

    // Déplacer le mot jusqu'à sa position dans le texte
    // Placer le mot en positionnement absolu
    // TODO rapporter quand on referme.

    initialLeft = mot.offsetLeft;
    initialTop = mot.offsetTop;
    console.log('coordonnées mot : ', initialLeft, initialTop);
    console.log('coordonnées aiguille : ', aiguille.offsetLeft, aiguille.offsetTop);

    mot.style.position = 'absolute';
    mot.style.left = String(initialLeft) + "px";
    mot.style.top = String(initialTop) + "px";
    //mot.style.left = 0;
    //mot.style.top = 0;

    console.log("déplacement vers : ", aiguille.offsetLeft, aiguille.offsetTop);
    mot.style.left = String(aiguille.offsetLeft) + "px";
    mot.style.top = String(aiguille.offsetTop) + "px";
    //console.log("déplacement vers : ", aiguille.offsetLeft - initialLeft, aiguille.offsetTop - initialTop);
    //mot.style.left = String(aiguille.offsetLeft - initialLeft) + "px";
    //mot.style.top = String(aiguille.offsetTop - initialTop) + "px";

    if(mot.className.search("wordcount")) {
        aiguille.classList.add(mot.className.slice(mot.className.search("wordcount")).split(' ')[0]);
    }

    function rearmer_mot() {
        // event.target est le mot, event.target.target est l'article :
        //var article = document.getElementById(event.target.target);
        //article.css('visibility', 'visible');

        event.target.removeEventListener('transitionend', rearmer_mot);
        // Attendre que le changement de `display` sur l'article se tasse :
        window.setTimeout(20);
        //event.target.classList.add('active');

        //ecran.appendChild(mot);
        mot.id = "mot_ouvert";
    }
    mot.addEventListener('transitionend', rearmer_mot);
    article.style.display = "block";
    article.style.opacity = 1;
}

