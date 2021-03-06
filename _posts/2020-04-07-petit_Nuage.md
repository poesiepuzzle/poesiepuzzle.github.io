---
title:  "petit Nuage"
tags:   nonsense html SVG vagabondage
published: false
---

# Vagabondage au pays du dessin pour le web

Pour dessiner des formes dans du html, il y a plusieurs solutions
disponibles. On cherche ici à contraindre du texte à l'intérieur d'un dessin.
On peut soit :
  - utiliser canvas, et créer un dessin en javascript avec le texte brut
  - utiliser SVG, et une des dizaines de manières de l'inclure dans du html

Ici on va chercher les solutions à base de SVG pour afficher un paragraphe à
l'intérieur d'une forme. Une solution est de "mouler" la forme dans 2
contreformes qui viennent imprimer la forme voulue en négatif par les côtés,
comme çi-dessous.

## `shape-outside`

La solution qui fonctionne : l'option css `shape-outside`. Elle permet de
donner une forme arbitraire (y compris SVG) qui contient le paragraphe _qui 
suit_. Cette forme doit flotter à gauche où à droite, qui est le côté où elle
empêchera le texte d'aller. C'est un petit Nuage.

<style>
.nuage.demo {
    width: 50%;
    height: 190px;
    background-repeat: no-repeat;
}
.nuage.demo.gauche {
    float: left;
    background-image: url(/images/nuage_gauche.svg);
    shape-outside: url(/images/nuage_gauche.svg);
    clip-path: url(/images/nuage_gauche.svg);
 }
.nuage.demo.droit {
    float: right;
    background-image: url(/images/nuage_droit.svg);
    background-position: right;
    shape-outside: url(/images/nuage_droit.svg);
    clip-path: url(/images/nuage_droit.svg);
 }
</style>

<div>
  <span class="demo nuage gauche"></span>
  <span class="demo nuage droit"></span>
  <p>
    C'est juste un mot comme ça, f_agilistique ça veut rien dire au fond, tout
    ça c'est juste des mots pour remplir des paragraphe qui n'ont d'utilité
    qu'illustrative, qu'est-ce que je pourrais bien écrire encore à leur propos,
    peut-être que là ça suffit ? Eh bien on dirait que oui.
  </p>
</div>

Le code source du texte ci-dessus :

```
<style>
.nuage.demo {
    width: 50%;
    height: 190px;
    background-repeat: no-repeat;
}
.nuage.demo.gauche {
    float: left;
    background-image: url(/images/nuage_gauche.svg);
    shape-outside: url(/images/nuage_gauche.svg);
    clip-path: url(/images/nuage_gauche.svg);
 }
.nuage.demo.droit {
    float: right;
    background-image: url(/images/nuage_droit.svg);
    background-position: right;
    shape-outside: url(/images/nuage_droit.svg);
    clip-path: url(/images/nuage_droit.svg);
 }
</style>

<div>
  <span class="demo nuage gauche"></span>
  <span class="demo nuage droit"></span>
  <p>
    C'est juste un mot comme ça, f_agilistique ça veut rien dire au fond, tout
    ça c'est juste des mots pour remplir des paragraphe qui n'ont d'utilité
    qu'illustrative, qu'est-ce que je pourrais bien écrire encore à leur propos,
    peut-être que là ça suffit ? Eh bien on dirait que oui.
  </p>
</div>
```

Remarque : Le lien sur lequel vous avez cliqué n'arrive pas jusqu'à la fin de ce paragraphe alors qu'il devrait ; visiblement le texte a été "bousculé" par la manipulation, et le calcul des coordonnées d'arrivée était déjà fait : petit Nuage.

## Pour aller plus loin

[lire le SVG](https://css-tricks.com/svg-path-syntax-illustrated-guide/)
[les détails sur cette solution](https://skeate.github.io/2015/07/13/Wrapping-Text-to-Fit-Shaped-Containers-with-CSS.html)

