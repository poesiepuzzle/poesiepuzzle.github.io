---
title: transition
layout: code
---
<script>
function move_span() {
  let span = document.querySelector("#movableSpan");
  if(span.classList.contains('slider')) {
    span.classList.remove('slider');
  } else {
    span.classList.add('slider');
  }
}
</script>

Voilà un sujet délicat. Les transitions permettent de changer un paramètre de
manière progressive sur un temps donné.

Pour créer ces effets avec accélération matérielle, il faut les écrire comme
effets css. Il y a pour ça les paramètres `transitionProperty` et
`transitionDuration`, avec le paramètre abrégé `transition`. La transition est
déclenchée la prochaine fois qu'un élément prend la classe impliquée. Par
exemple :

``` html
<script>
  function move_span(span) {
    let span = document.querySelector("#movableSpan");
    if(span.classList.contains('slider')) {
      span.classList.remove('slider');
    } else {
      span.classList.add('slider');
    }
  }
</script>
<style>
  #movableSpan {
    position: relative;
    top: 0;
    left: 0;
    transition: 1s;
  }
  .slider {
    transition: 1s;
    top: 5em !important;
  }
</style>
<div>
  <button onclick="move_span()">bouger le span 1</button>
  <span id="movableSpan" >
    texte du span 1
  </span>
  <span>
    texte du span 2
  </span>
</div>
```
[la suite]({% link html/transition-2.md %})

