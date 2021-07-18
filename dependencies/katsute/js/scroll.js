---
layout: compress
---

"use strict";

{
    if(window.location.hash != "")
        document.getElementById(window.location.hash.substring(1)).scrollIntoView();

    const top = document.getElementById("scroll");
    const main = document.getElementById("main");

    top.addEventListener("click", () => { main.scrollTo({top: 0, behavior: "smooth"}); });

    main.addEventListener("scroll", (e) => {
        top.className = main.scrollTop < 100 ? "" : "shown";
    });
}