---
layout: compress
---

"use strict";

{
    const hn = location.hostname;
    const md = document.getElementsByClassName("markdown")[0];
    if(md)
        for(let a of md.getElementsByTagName("a"))
            if(a.getAttribute("href") && a.hostname != hn)
                a.target = "_blank";
}