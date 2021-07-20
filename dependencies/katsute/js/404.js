---
layout: compress
---

"use strict";

/* 404 contribution link */ {
    const btn = document.getElementById("contributing-button");

    if(btn.getAttribute("href") == '')
        btn.setAttribute("href", `https://github.com/KatsuteDev/docs.katsute.dev/new/main?filename=${document.location.pathname}.md`);
}