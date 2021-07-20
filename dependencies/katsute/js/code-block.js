---
layout: compress
---

"use strict";

/* add header to code block */ {
    for(let block of document.getElementsByClassName("highlighter-rouge")){
        if(block.tagName.toLowerCase() != "div") continue;

        const lang = block.className.substring(9, block.className.indexOf(' '));

        let temp = "";

        temp += `<div class="code-block-header">`;
        temp += `<p>${lang == "plaintext" ? "" : lang}</p>`;
        temp += `<button class="code-copy-button">`;
        temp += `<i class="far fa-fw fa-clipboard"></i>`;
        temp += `<i class="fas fa-fw fa-check"></i>`;
        temp += `</button>`;
        temp += `</div>`;

        block.innerHTML = temp + block.innerHTML;
    }
}

/* copy button click event */ {
    const board = navigator && navigator.clipboard ? navigator.clipboard : clipboard;
    for(let button of document.getElementsByClassName("code-copy-button")){
        const code = button.parentElement.parentElement.getElementsByTagName("code")[0];
        const raw = code.innerText;
        button.addEventListener("click", () => {
            board.writeText(raw).then(() => {
                button.className = "code-copy-button success";

                setTimeout(() => {
                    button.className = "code-copy-button";
                }, 2000);
            });
        });
    }
}