---
title: Adding Pages
description: |
    Pages are added to the server by adding handlers at a specified context.
---

# Adding Pages

Pages (referred to as a context) can be added using the [`createContext`](/simplehttpserver/javadoc/simplehttpserver/com/kttdevelopment/simplehttpserver/SimpleHttpServer.html#createContext(java.lang.String,com.sun.net.httpserver.HttpHandler)) method on a [`SimpleHttpServer`](/simplehttpserver/javadoc/simplehttpserver/com/kttdevelopment/simplehttpserver/SimpleHttpServer.html). This method accepts a string, where the page will be located at; and a [handler](/simplehttpserver/handler), which handles the request.

```java
SimpleHttpServer server = SimpleHttpServer.create(8080);

// this would be accessible at
// localhost:8080/some/web/page
server.createContext("/some/web/page");

// this would be accessible at
// localhost:8080/some/other/web/page
server.createContext(
    "/some/other/web/page",
    new HttpHandler(){

        @Override
        public void handle(HttpExchange httpExchange){
            // ...
        }

    }
);
```

Contexts in a server are case sensitive and will use the most specific context available.

**Example:** If a user goes to `/this/web/page` and there are only handlers for `/this` and `/this/web`, then the handler for `/this/web` would be used because its the most specific context that exists on the server.

This consequently means that any handler added to the root `/` context would handle any requests that don’t have a handler, since it’s the most specific one available.

To resolve this issue the libary provides a [root handler](/simplehttpserver/handler/root-handler).