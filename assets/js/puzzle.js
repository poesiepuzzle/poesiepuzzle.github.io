function toggle(mot) {
    //var article = document.querySelector("#" + mot.target);
    var article = document.getElementById(mot.target);

    event.preventDefault();
    console.log('article :');
    console.log(article);

    function show_mot() {
        // event.target est le mot, event.target.target est l'article :
        event.target.removeEventListener('transitionend', show_mot);
        show(mot);
    }

    // Si le mot est clickable, fermer l'éventuel mot clicked, puis ouvrir :
    if(! mot.classList.contains('clicked')) {
        if(mot_ouvert = document.querySelector('.clicked')) {
            //article_ouvert = document.getElementById(mot_ouvert.target);
            mot_ouvert.addEventListener('transitionend', show_mot);
            hide(mot_ouvert);
        } else {
            show(mot);
        }
    } else {
        hide(mot);
    }
}

function hide(mot) {
    //var article = document.querySelector("#" + mot.target);
    var article = document.getElementById(mot.target);

    function hide_article() {
        event.target.removeEventListener('transitionend', hide_article);
        //article.style.visibility = "hidden";
        article.style.display = "none";
    }
    function unclick_mot() {
        event.target.removeEventListener('transitionend', unclick_mot);
        mot.classList.remove('clicked');
    }

    if(article != null) {
        // D'abord déclencher le fondu en opacité, puis cacher :
        article.addEventListener('transitionend', hide_article);
        article.style.opacity = 0;
    }
    // D'abord déclencher l'animation du mouvement, puis déclasser :
    mot.addEventListener('transitionend', unclick_mot);
    mot.style.top = "0px";
    mot.style.left = "0px";
}

function show(mot) {
    //var article = document.querySelector(mot.target);
    var article = document.getElementById(mot.target);
    article.style.display = "block";
    var keyword = mot.textContent.trim();
    var texte = article.innerHTML;
    var texteFinal = '';

    // Remplacer l'occurence de keyword dans texte par un span avec id
    // TODO ne faire qu'une fois
    // TODO faire en php

    tampon = texte.split(keyword);
    texteFinal += tampon[0];
    texteFinal += '<span class="mot" id="mot' + mot.target + '">' + keyword + '</span>';
    texteFinal += tampon.slice(1).join(keyword);

    // Réinjection du html

    article.innerHTML = texteFinal;

    // Placer le mot en positionnement absolu

    //mot.style.top = mot.offsetTop;
    //mot.style.left = mot.offsetLeft;
    //mot.style.position = 'absolute';
    //offset_abs = mot.offset();

    // Déplacer le mot jusqu'à sa position dans le texte

    //motdanstexte = document.querySelector("#mot" + mot.target);
    motdanstexte = document.getElementById("mot" + mot.target);
    console.log('motdanstexte :');
    console.log(motdanstexte);
    //motdanstexte.style.visibility = 'hidden';
    motdanstexte.style.opacity = 0;
    mot.style.top = String(+motdanstexte.offsetTop - mot.offsetTop) + "px";
    mot.style.left = String(+motdanstexte.offsetLeft - mot.offsetLeft) + "px";

    function rearmer_mot() {
        // event.target est le mot, event.target.target est l'article :
        //var article = document.getElementById(event.target.target);
        //article.css('visibility', 'visible');

        event.target.removeEventListener('transitionend', rearmer_mot);
        //article.addEventListener('transitionend', changeClass);
        event.target.classList.add('clicked');
    }
    mot.addEventListener('transitionend', rearmer_mot);
    article.style.display = "block";
    article.style.opacity = 1;
}

