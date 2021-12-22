async function gethtml(link, abc) {
    let method;
    if (abc == 1) {
        method = "normal";
    } else if (abc == 2) {
        method = "browser";
    }
    const result5 = await fetch(apiurl + '/extra/gethtml', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            link: link,
            method: method
        })
    }).then((res) => res.json());

    let final = result5.data;
    let html = parseHTML(final);

    return html;
}

function parseHTML(markup) {
    if (markup.toLowerCase().trim().indexOf('<!doctype') === 0) {
        var doc = document.implementation.createHTMLDocument("");
        doc.documentElement.innerHTML = markup;
        return doc;
    } else if ('content' in document.createElement('template')) {
        // Template tag exists!
        var el = document.createElement('template');
        el.innerHTML = markup;
        return el.content;
    } else {
        // Template tag doesn't exist!
        var docfrag = document.createDocumentFragment();
        var el = document.createElement('body');
        el.innerHTML = markup;
        for (i = 0; 0 < el.childNodes.length;) {
            docfrag.appendChild(el.childNodes[i]);
        }
        return docfrag;
    }
}