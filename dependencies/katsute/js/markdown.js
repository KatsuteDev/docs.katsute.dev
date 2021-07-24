---
layout: compress
---

"use strict";

{
    const hn = location.hostname;
    const md = document.getElementsByClassName("markdown")[0];
    if(md){
        /* external link */ {

            for(let a of md.getElementsByTagName("a"))
                if(a.getAttribute("href") && a.hostname != hn)
                    a.target = "_blank";

        }
        /* table */ {

            for(let t of md.getElementsByTagName("table")){
                const wrapper = document.createElement("div");
                wrapper.className = "table-responsive";

                t.parentNode.replaceChild(wrapper, t);
                wrapper.appendChild(t);
            }

        }
    }
}