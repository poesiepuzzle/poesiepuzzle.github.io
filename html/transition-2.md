---
title: transitions II - javascript
layout: code
---
<script>
  function move_into(el, destEl) {
    let destStyle = window.getComputedStyle(destEl);
    let destHeight = destStyle.height;
    let startPos = el.getBoundingClientRect();
    console.log('start point', startPos.left, startPos.top);

/*
    destEl.style.backgroundColor = "grey";
    destEl.style.position = "relative";
    destEl.style.height = destEl.offsetHeight + "px";
    destEl.style.width = destEl.offsetWidth + "px";
    destEl.style.transition = "all 1s";
    void destEl.offsetLeft;
    //destEl.focus();

    // DEBUG Trigger transition on destination ?
    destEl.appendChild(el);
*/

    destEl.appendChild(el);
    destFinalHeight = destEl.offsetHeight;
    console.log(destHeight, destFinalHeight);
    destEl.style.transition = "0s";
    destEl.style.height = destHeight;
    void destEl.offsetHeight;
    destEl.style.transition = "1s";
    destEl.style.height = destFinalHeight + "px";

    let endPos = el.getBoundingClientRect();
    console.log("way to go", endPos.left-startPos.left, endPos.top-startPos.top);

    // We are in final position, we need to move back to inital pos.
    el.style.position = "relative";
    el.style.left = startPos.left - endPos.left + "px";
    el.style.top = startPos.top - endPos.top + "px";

    // Let javascript notice current state :
    void el.offsetLeft;

    el.addEventListener('transitionend', function log() {
      el.removeEventListener('transitionend', log);
      console.log("après", destEl.offsetHeight);
    });
    // Trigger transition : move to final position.
    el.style.transition = "all 1s";
    el.style.left = "0";
    el.style.top = "0";
  }
</script>

On veut maintenant déplacer un div dans un autre avec une transition sur le
déplacement. Ppur ça, on va dans l'ordre :
  - récupérer les coordonnées de départ par rapport à la racine du document
  - arracher l'élément et le mettre dans le conteneur d'arrivée
  - le basculer en position relative et lui passer les coodonnées de départ
  - déclencher le déplacement jusqu'à sa position dans le conteneur d'arrivée

{% highlight js linenos %}
function move_into(el, destEl) {
  let startPos = el.getBoundingClientRect();
  console.log('start point', startPos.left, startPos.top);

  destEl.appendChild(el);
  let endPos = el.getBoundingClientRect();
  console.log("way to go", endPos.left-startPos.left, endPos.top-startPos.top);

  // We are in final position, we need to move back to inital pos.
  el.style.position = "relative";
  el.style.left = startPos.left - endPos.left + "px";
  el.style.top = startPos.top - endPos.top + "px";
  el.style.transition = "all 1s";

  // Let javascript notice current state :
  void el.offsetLeft;

  // Trigger transition : move to final position.
  el.style.left = "0";
  el.style.top = "0";
}
{% endhighlight %}

Si vous lisez l'anglais, ce qu'on vient de voir devrait être assez lisible. Le
plus obscur est certainement l'utilisation de `void`. Ligne 16, On utilise la
commande 

{% highlight js %}
  void el.offsetLeft;
{% endhighlight %}

pour obliger javascript à constater l'état de
départ, avant de rentrer les coordonnées d'arrivée.  En effet, sinon javascript
ne voit pas le changement de valeur des coordonnées, il ne voit que la valeur
finale. Et dans ce cas, pas d'animation de la transition, on va directement aux
valeurs finales. Voilà le fragment de html et sa prévisualisation :

``` html
<style>
  .half {
    display: inline-block;
    width: 45%;
  }
  .large {
    height: 8em;
  }
</style>
<div class="half">
  <button onclick="move_into(fleche, cible)">
    bouger la flèche
  </button>
  <div id="cible">
    texte dans la cible
  </div>
</div>
<div class="half">
  <div class="large">
    un div pour prendre un peu de place
  </div>
  <div id="fleche" class="large">
    texte dans la flèche
  </div>
</div>
```

Je dois dire que je trouve assez frustrant de ne pas pouvoir déclencher les
transitions sur les éléments impactés. J'ai essayé, je n'ai rien trouvé de
concluant.

[la suite !]({% link html/transition-3.md %})

