function tell_coords(el) {
    var coords = new Object();
    if(el.viewBox === undefined) {
        coords.left = el.offsetLeft;
        coords.top = el.offsetTop;
    } else {
        let geom = el.getBoundingClientRect();
        coords.left = geom.left;
        coords.top = geom.top;
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
function move_into(el, destEl) {
    if(el.classList.contains('transition-deplacement')) {
        console.log('! already movin');
    } else {
        el.classList.add('transition-deplacement');
        let startPos = tell_coords(el);
        console.log('déplacement depuis', el.parentElement);
        //console.log('déplacement depuis ', startPos);

        destEl.appendChild(el);
        let endPos = tell_coords(el);
        console.log("destination", destEl);
        //console.log("destination ", endPos);

        el.style.transition = "all 0s";
        el.style.left = startPos.left - endPos.left + "px";
        el.style.top = startPos.top - endPos.top + "px";
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
function toggle(el, destEl) {
    if(el.classList.contains('ouvert')) {
        //move_into(depart, arrivee.parentElement);
        el.classList.remove('ouvert');
        move_into(el, destEl.parentElement);
    } else {
        el.classList.add('ouvert');
        move_into(el, destEl);
    }
}

