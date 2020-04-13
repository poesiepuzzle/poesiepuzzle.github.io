---
title: transitions - css
layout: code
---
<script src="{% link html/transition-3.js %}" type="text/javascript"></script>

On a la possibilité de donner des réglages par défaut à nos transitions en css ;
ça permet d'alléger le javascript, et de contrôler les paramètres de la
transition depuis le css.

Ici `move_into(el, destEl)` va utiliser une classe qui durera le temps de la
transition, qui s'appelera `transition-deplacement`. On pourra y stocker des
valeurs par défaut pour la transition. Par exemple,

{% highlight js %}
  el.style.top = "";
{% endhighlight %}

donnera à l'élément `el` la valeur `top` décrite dans le css. Comme `el`
appartient à la classe `transition-deplacement` qui dit que `top = 0;` eh ben
voilà.

{% highlight js linenos %}
function move_into(el, destEl) {
  if(el.classList.contains('transition-deplacement')) {
    console.log('! already movin');
  } else {
    el.classList.add('transition-deplacement');

    // Do the job

    el.addEventListener('transitionend', function declasse() {
      el.removeEventListener('transitionend', declasse);
      el.classList.remove('transition-deplacement');
      console.log("élément", el, "déclassé");
    });
  }
{% endhighlight %}

Pour finir, `toggle(el, destEl)` utilisera une autre classe pour déterminer si
`el` a déjà été ouvert, la classe `ouvert`. Si oui, il le mettra dans le parent
direct de `destEl`.

Dans ce cas, on n'utilise même pas cette classe dans le css. Elle ne sert qu'à
javascript.

{% highlight js linenos %}
function toggle(el, destEl) {
  if(el.classList.contains('ouvert')) {
    el.classList.remove('ouvert');
    move_into(el, destEl.parentElement);
  } else {
    el.classList.add('ouvert');
    move_into(el, destEl);
  }
}
{% endhighlight %}

Tous ces points sont dans le fichier javascript inclus dans la page à partir de
[là]({% link html/transition-3.js %}). Et maintenant le html et la preview :

``` html
<style>
  .transition-deplacement {
    position: relative;
    transition: 1s;
    left: 0;
    top: 0;
  }
.min {
  display: inline-block;
  width: 10em;
  height: 5em;
}
</style>
<div>
  <button onclick="toggle(fleche, cible)">
    bouger le div 1
  </button>
  <div id="cible" class="min">
    texte de la cible
  </div>
  <div class="min">
    un div pour prendre un peu de place
  </div>
  <div id="fleche" class="min">
    texte de la flèche
  </div>
</div>
```
[la suite]({% link html/transition-4.md %})

