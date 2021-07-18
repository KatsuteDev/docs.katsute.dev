---
layout: compress
---

"use strict";

/* redirect to corrosponding 404 page */ {

    const path = self.location.href.replace(self.origin, "").toLowerCase().split('/');
    const lang = path[1];

    window.location.replace(
        !lang || lang == "" || path[2] == "404" /* edge case where lang doesn't exist */
        ? "/en/404"
        : `/${lang}/404`
    );
}