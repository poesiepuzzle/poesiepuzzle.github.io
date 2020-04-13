---
title: transition IV - SVG
layout: code
---
<script src="{% link html/transition-4.js %}" type="text/javascript"></script>

Et si c'est un objet SVG qu'on veut déplacer ? Ça fonctionne encore, en
utilisant `svg.getBoundingClientRect()` pour récupérer la position, et la même
fonction pour initialiser la position. Pour clarifier, on crée des fonctions qui
font le tri en fonction du type de l'élément : `initialize_state(el)` et
`tell_coords(el)`.

{% highlight js linenos %}
function tell_coords(el) {
  var coords = new Object();
  if(el.viewBox === undefined) {
    coords["x"] = el.offsetLeft;
    coords["y"] = el.offsetTop;
  } else {
    let geom = el.getBoundingClientRect();
    coords["x"] = geom.left;
    coords["y"] = geom.top;
  }
  return coords;
}
function initialize_state(el) {
  if(el.viewBox === undefined) {
    void el.offsetWidth;
  } else {
    el.getBoundingClientRect();
  }
}
{% endhighlight %}

Ensuite `move_into(el, destEl)` fait le même travail qu'avant, mais
en appelant les fonctions qu'on a construites.

{% highlight js linenos %}
function move_into(el, destEl) {
  if(el.classList.contains('transition-deplacement')) {
    console.log('! already movin');
  } else {
    el.classList.add('transition-deplacement');
    let coords_depart = tell_coords(el);
    console.log('déplacement depuis', el.parentElement);
    //console.log('déplacement depuis ', coords_depart);

    destEl.appendChild(el);
    el.style.position = "relative";
    let coords_arrivee = tell_coords(el);
    console.log("destination", destEl);
    //console.log("destination ", coords_arrivee);

    el.style.transition = "all 0s";
    el.style.left = coords_depart["x"] - coords_arrivee["x"]  + "px";
    el.style.top = coords_depart["y"] - coords_arrivee["y"] + "px";
    el.addEventListener('transitionend', function declasse() {
      el.removeEventListener('transitionend', declasse);
      el.classList.remove('transition-deplacement');
      console.log("élément", el, "déclassé");
    });
    initialize_state(el);
    el.style.transition = ""; // Reset to css value.
    el.style.left = "";
    el.style.top = "";
  }
}
{% endhighlight %}

Le javascript inclus complet est toujours [là]({% link html/transition-3.js %}).
Enfin le html :

```html
<style>
  span {
    display: inline-block;
  }
  .minimum {
    width: 10em;
    height: 3em;
  }
  .transition-deplacement {
    position: relative;
    top: 0;
    left: 0;
    transition: 1s;
  }
</style>
<div>
  <button onclick="toggle(fleche, cible)">bouger</button>
  <span class="minimum">
    un span pour prendre un peu de place
  </span>
  <span id="cible" class="minimum">
    texte du span d'arrivée
  </span>
  <svg id="fleche" viewBox="0 0 100 100">
    <path d="M0,0 H100 V100 H0 Z" fill="transparent" stroke="black" />
  </svg>
</div>
```

