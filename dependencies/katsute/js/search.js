---
layout: compress
---

"use strict";

{
    const pages = {
        {% include data/pages.liquid %}
    };

    const lang = document.documentElement.lang;

    const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());

    if(params.q)
        document.getElementById("search-query").value = params.q;

    const results = document.getElementById("search-results");

    const index = lunr(() => {
        this.ref("id");
        this.field("title", {boost: 10});
        this.field("content");
        for(let key in pages)
            if(key["lang"] == lang)
                this.add({
                    "id": key,
                    "title": pages[key].title,
                    "content": pages[key].content
                });
    });
}
