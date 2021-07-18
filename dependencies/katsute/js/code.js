---
layout: compress
---

"use strict";

for(let block of document.getElementsByClassName("highlighter-rouge")){
    const lang = block.className.substring(9, block.className.indexOf(' '));

    let temp = "";

    temp += `<div class="code-header">`;
    temp += `<p>${lang == "plaintext" ? "" : lang}</p>`;
    temp += `<button class="code-copy-button">`;
    temp += `<i class="far fa-fw fa-clipboard"></i>`;
    temp += `<i class="fas fa-fw fa-check"></i>`;
    temp += `</button>`;
    temp += `</div>`;

    block.innerHTML = temp + block.innerHTML;
}

for(let button of document.getElementsByClassName("code-copy-button")){
    const code = button.parentElement.parentElement.getElementsByTagName("code")[0];
    const raw = code.innerText;
    button.addEventListener("click", () => {
        let board = navigator && navigator.clipboard ? navigator.clipboard : clipboard;
        board.writeText(raw).then(() => {
            button.className = "code-copy-button success";

            setTimeout(() => {
                button.className = "code-copy-button";
            }, 2000);
        });
    });
}