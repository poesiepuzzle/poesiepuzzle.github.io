function move_into(el, destEl) {
    if(el.classList.contains('transition-deplacement')) {
        console.log('! already movin');
    } else {

        el.classList.add('transition-deplacement');

        let startPos = el.getBoundingClientRect();
        console.log('déplacement depuis', startPos.left, startPos.top);

        destEl.appendChild(el);
        let endPos = el.getBoundingClientRect();
        console.log("destination", endPos.left, endPos.top);

        // Remove transitional class on completion.
        el.addEventListener('transitionend', function declasse() {
            console.log("élément", el, "déclassé");
            el.removeEventListener('transitionend', declasse);
            el.classList.remove('transition-deplacement');
        });

        // Move to initial position, coords from final position :
        console.log(
            startPos.left - endPos.left + "px",
            startPos.top - endPos.top + "px");
        el.style.transition = "0s";
        el.style.left = startPos.left - endPos.left + "px";
        el.style.top = startPos.top - endPos.top + "px";

        // Let javascript notice current state.
        void el.offsetLeft;

        // Trigger transition : move to final position.
        el.style.transition = "";
        el.style.left = "";
        el.style.top = "";
    }
}
function toggle(el, destEl) {
    if(el.classList.contains('ouvert')) {
        el.classList.remove('ouvert');
        move_into(el, destEl.parentElement);
    } else {
        el.classList.add('ouvert');
        move_into(el, destEl);
    }
}

