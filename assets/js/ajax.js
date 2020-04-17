function ajaxRequest(url, callback){
    var request = new XMLHttpRequest();
    //request.onload = function(){
    request.onreadystatechange = function(){
        try {
            if (request.readyState == XMLHttpRequest.DONE) {
                if(request.status == 200) {
                    callback(request.responseText);
                } else {
                    console.log("request failed, status", request.status);
                }
            }
        } catch(error) {
            console.log("! exception caught : " + e.description);
        }
    }
    request.open("GET", url, true);
    request.send();
    return request;
}

function loadPost(href, targetClass="ajaxTarget") {
    let targetDiv = document.querySelector("." + targetClass);

    targetDiv.classList.add("ajaxLoading");
    //console.log("loading", href);
    return ajaxRequest(href, function displayPost(responseText) {
        let bufferDiv = document.createElement("div");

        bufferDiv.innerHTML = responseText.trim();
        for(i=0; i<bufferDiv.childNodes.length; i++) {
            let el = bufferDiv.childNodes[i];

            if(el.nodeName == "DIV") {
                let source = el.querySelector("." + targetClass);

                if(source) {
                    targetDiv.innerHTML = "";
                    //console.log("source", source);
                    targetDiv.appendChild(source);
                    //console.log("added to div." + targetClass, source);
                    targetDiv.classList.add("ajaxLoaded");
                    targetDiv.classList.remove("ajaxLoading");
                    break;
                }
            }
        }
    });
}

