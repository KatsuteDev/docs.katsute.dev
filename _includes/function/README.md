# Functions

### get-extension

Returns the extension of a file or the file name if it has no extension.

Example usage:

```
{% include function/get-extension.liquid path=page.path %}
```

### get-file

Returns the file name from a path.

Example usage:

```
{% include function/get-file.liquid path=page.path %}
```

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

### resolve-path

Returns the path to a page or folder if it is a `README.md` or `index.html` file.

Example usage:
```
{% include function/resolve-path.liquid path=page.path %}
```