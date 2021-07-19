# Functions

### get-lang

Return the language of the current page.

Example usage:

```
{% include function/get-lang.liquid %}
```
```
en
```

### get-translation

Returns the translation from the `_data/translation.yml`.

Example usage:

```yml
en:
  docs:
    title: Docs
```
```
{% include /function/get-translations.liquid key="docs.title" %}
```
```
Docs
```

### remove-extension

Returns the file name from a path without the extension.

Example usage:

```
{% include function/remove-extension.liquid path=page.path %}
```

### resolve-name

Returns the resolved file name or title.

Example usage:

```
{% include function/resolve-name.liquid path=page.path %}
```

### resolve-path

Returns the path to a page or folder if it is a `README.md` or `index.html` file.

Example usage:
```
{% include function/resolve-path.liquid path=page.path %}
```