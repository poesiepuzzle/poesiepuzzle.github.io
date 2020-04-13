---
title: SVG
layout: code
---
Pour intégrer un fichier SVG et pouvoir le redimensionner, on peut le mettre
dans un conteneur HTML. Il va s'arranger pour tout afficher et centrer le
résultat, comme ça :

``` html
<span class="svgContainer" style="background-color: gray;">
  <svg viewbox="0 0 100 100" width="20em" height="10em">
    <path fill="white" stroke="black" d="M0,0 H100 V100 H0 Z">
  </svg>
</span>
```

``` html
<span class="svgContainer" style="background-color: gray;">
  <svg viewbox="0 0 100 100" width="10em" height="20em">
    <path fill="transparent" stroke="black" d="M0,0 H100 V100 H0 Z">
  </svg>
</span>
```

Si on veut qu'il "stretche" sur son conteneur, on peut ajouter l'option `preserveAspectRatio = none` :

``` html
<span id="svgContainer">
  <svg viewbox="0 0 100 100" width="20em" height="10em"
      preserveAspectRatio="none">
    <path fill="transparent" stroke="black" d="M0,0 H100 V100 H0 Z">
  </svg>
</span>
```

# Position et taille

L'élément SVG a des attributs transitionables, comme `svg.width` et `svg.height`,
`svg.style.left` et `svg.style.top`. En utilisant le mode `position = relative`,
on peut déplacer l'élément tout en gardant sa place initiale réservée, comme si
rien n'avait changé :

``` html
<span class="svgContainer" style="background-color: gray;">
  <svg viewbox="0 0 100 100" width="10em" height="10em"
  style="position: relative; left: -3em; top: 1.5em;">
    <path fill="white" stroke="black" d="M0,0 H100 V100 H0 Z">
  </svg>
</span>
```

On peut enfin utiliser le mode `position = absolute`, où le conteneur est
arraché au flot du document. Il est positionné relativement à son plus proche
parent positionné. La plupart des éléments ont par défaut `position = static`,
qui la laisse à sa place dans le flot du document. Donc le positionnement se
fait le plus souvent par rapport à l'élément `<body>`. Ici l'élément est
`absolute` et son parent direct `relative` :

``` html
<span class="svgContainer"
    style="background-color: gray; position: relative">
  <svg viewbox="0 0 100 100" width="10em" height="10em"
  style="position: absolute; left: 30vw; top: 10vw;">
    <path fill="white" stroke="black" d="M0,0 H100 V100 H0 Z">
  </svg>
</span>
```

