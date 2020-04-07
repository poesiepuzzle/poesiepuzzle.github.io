---
title:  "fragilistique"
tags:   nonsense test
---

# Vagabondage parmi les formes dans le html.

Pour dessiner des formes dans du html, il y a plusieurs solutions
disponibles. On cherche ici à contraindre du texte à l'intérieur d'un dessin.
On peut soit :
  - utiliser canvas, et créer un dessin en javascript avec le texte brut
  - utiliser svg, et une des dizaines de manières de l'inclure dans du html
Ici on va chercher les solutions à base de svg.

## `shape-outside`

La solution qui fonctionne : `shape-outside`. Cette option css permet de
donner une forme arbitraire (y compris svg) qui contient le paragraphe _qui 
suit_.

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

Le mot n'arrive pas jusqu'ici ; visiblement le texte a été "bousculé" par la manipulation, et le calcul des coordonnées d'arrivée était déjà fait : fragilistique


## `clipPath`

Un svg inline, où le texte doit suivre les lignes. Les lignes sont coupées avec un `clipPath` en espérant qu'elles guident le texte sur les nouvelles coordonnées. Visiblement ça ne fonctionne pas :

<svg width="100%" height="100%" viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
 <defs>
    <clipPath id="nd" clipPathUnits="objectBoundingBox">
               M.3,0
               C0,0 0,0 0,.50
               S0,.95 .35,.95" />
    </clipPath>
    <clipPath id="nuach" clipPathUnits="objectBoundingBox">
      <path fill="#FFFFFF" stroke="#000000" stroke-width="1"
            d="M.35,.95 H.65
               S1,.95 1,.75
               S.9,.25 .6,.35
               C.6,0 0,0 0,.50
               S0,.95 .35,.95
               Z" />
    </clipPath>
  <!-- define lines for text lies on -->
  <path id="lignes" d="M0,0 h100
                      M0,10 h100
                      M0,20 h100
                      M0,30 h100
                      M0,40 h100
                      M0,50 h100
                      M0,60 h100
                      M0,70 h100
                      M0,80 h100
                      M0,90 h100" />
 </defs>
 <use xlink:href="#lignes" x="0" y="0" stroke="blue" stroke-width="1" />
 <text>
  <textPath xlink:href="#lignes" style='font-size: 10px;'>This is a long long long text ......</textPath>
 </text>
</svg>

## `foreignObject`

Une autre tentative : un paragraphe html à l'intérieur d'un svg. Mais la
zone de texte est limitée par les dimensions fournies dans le
foreignObject donc ça ne fonctionne pas non plus.

<svg width="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="100" fill="blue" stoke="red"/>
  <foreignObject x="0" y="0" width="100%" height="100%">
    <body xmlns="http://www.w3.org/1999/xhtml">
      <p>
        Un texte long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long
      </p>
    </body>
  </foreignObject>
</svg>

## Pour aller plus loin

[lire le svg](https://css-tricks.com/svg-path-syntax-illustrated-guide/)

