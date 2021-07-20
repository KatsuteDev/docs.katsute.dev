---
layout: compress
---

"use strict";

/* search */ {
    const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());

    const search_results = document.getElementById("search-results");

    if(search_results && params.q){
        const q = document.getElementById("search-query").value = params.q;

        const pages = {
            {% include data/pages.liquid %}
        };

        const index = lunr(function (){
            this.ref("id");
            this.field("title", {boost: 10});
            this.field("content");
            for(let key in pages)
                this.add({
                    "id": key,
                    "path": pages[key].path,
                    "title": pages[key].title,
                    "content": pages[key].content
                });
        });

        const results = index.search(q);
        const resultPages = results.map((m) => pages[m.ref]);

        const regexp = new RegExp(q.replace(/[-[\]{}()*+?.,\\^$|#\s]/gm, "\\$&"), "gmi");

        let resultsString = "";

        for(let r of resultPages){
            let body =
                r.content.length > 500
                ? r.content.substring(0, 500) + " …"
                : r.content;

            resultsString += "<li>";
            resultsString += r.crumb;
            resultsString += `<a href="${r.path}">`;
            resultsString += "<h5>" + r.title.replace(regexp, (s) => `<mark>${s}</mark>`) + "</h5>";
            resultsString += "</a>";
            resultsString += "<p>";
            resultsString += body.replace(regexp, (s) => `<mark>${s}</mark>`);
            resultsString += "</p>";
            resultsString += "</li>";
        }

        search_results.innerHTML = resultsString;

    }

}
