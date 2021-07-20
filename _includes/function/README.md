# Functions

### resolve-name

Returns either:

 1. The page title
 2. (if folder) the folder name
 3. (if file) the file name without extension

Optional `raw` parameter to disable links.

Example usage:

```
{% include function/resolve-name.liquid path=page.path %}

{% include function/resolve-name.liquid path=page.path raw="true" %}
```

### resolve-path

Returns either:

 - (if `README.md` or `index.html`) the folder path
 - (if file) the file path

Optional `noext` parameter to remove extension from files.

Example usage:

```
{% include function/resolve-path.liquid path=page.path %}

{% include function/resolve-path.liquid path=page.path noext="true" %}
```