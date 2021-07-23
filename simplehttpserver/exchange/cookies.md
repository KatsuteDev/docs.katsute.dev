---
title: Cookies
description: |
    Cookies are used to save information for a user across multiple sessions.
---

# Retrieving Cookies

To retrieve cookies from an exchange you use the [`getCookies`](/simplehttpserver/javadoc/simplehttpserver/com/kttdevelopment/simplehttpserver/SimpleHttpExchange.html#getCookies()) method on a [simple http exchange](/simplehttpserver/exchange/simple-http-exchange).

```java
SimpleHttpHandler handler = new SimpleHttpHandler(){

    @Override
    public void handle(SimpleHttpExchange exchange){
        Map<String,String> cookies = exchange.getCookies();
    }

}
```

# Creating and Modifying Cookies

For simple key-value cookies, the [`setCookie`](/simplehttpserver/javadoc/simplehttpserver/com/kttdevelopment/simplehttpserver/SimpleHttpExchange.html#setCookie(java.lang.String,java.lang.String)) method on a [simple http exchange](/simplehttpserver/exchange/simple-http-exchange) can be used.

For cookies with additional parameters the [`SimpleHttpCookie.Builder`](/simplehttpserver/javadoc/simplehttpserver/com/kttdevelopment/simplehttpserver/SimpleHttpCookie.Builder.html) can be used instead.

The exchange **must** be [sent](/simplehttpserver/exchange/simple-http-exchange#sending-data) in order for the cookies to be set.

```java
SimpleHttpHandler handler = new SimpleHttpHandler(){

    @Override
    public void handle(SimpleHttpExchange exchange){
        SimpleHttpCookie cookie = new SimpleHttpCookie
            .Builder("key","value")
            .build();

        exchange.setCookie(cookie);
        exchange.setCookie("anotherKey","value");
        exchange.send(200);
        exchange.close();
    }

}
```