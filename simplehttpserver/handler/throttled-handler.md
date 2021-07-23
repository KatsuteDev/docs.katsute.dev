---
title: Throttled Handler
description: |
    A throttled handler limits the amount of simultaneous connections to a handler.
---

# Throttled Handler

The [`ThrottledHandler`](/simplehttpserver/javadoc/simplehttpserver/com/kttdevelopment/simplehttpserver/handler/ThrottledHandler.html) limits the amount of simultaneous connections to a handler. The handler requires a [throttler](#throttlers), which determines how to allocate the connections.

You must use a [*multithreaded server*](/simplehttpserver/server/multithreaded-server) for this handler to work properly.

# Throttlers

Throttlers determine how to allocate connections.

A value of `0` means no connections allowed and `-1` means unlimited connections allowed.

## Exchange Throttler

The [`ExchangeThrottler`](/simplehttpserver/javadoc/simplehttpserver/com/kttdevelopment/simplehttpserver/handler/ExchangeThrottler.html) limits the amount of simultaneous connections a single address can have. This limit is determined by the [`getMaxConnections`](/simplehttpserver/javadoc/simplehttpserver/com/kttdevelopment/simplehttpserver/handler/ExchangeThrottler.html#getMaxConnections(com.sun.net.httpserver.HttpExchange)) method in the throttler.

A value of `0` means no connections allowed and `-1` means unlimited connections allowed.

```java
HttpHandler handler =  new HttpHandler(){

    @Override
    public void handle(HttpExchange httpExchange){
        // handle exchange
    }

};

ExchangeThrottler throttler = new ExchangeThrottler(){

    @Override
    public int getMaxConnections(HttpExchange exchange){
        // only allow user to have two simultaneous exchanges
        return 2;
    }

};

HttpServer server = HttpServer.create(8080);
server.createContext("/", new ThrottledHandler(handler, throttler));
```

## Server Exchange Throttler

The [`ServerExchangeThrottler`](/simplehttpserver/javadoc/simplehttpserver/com/kttdevelopment/simplehttpserver/handler/ServerExchangeThrottler.html) is the same as the exchange throttler but also has a limit on the total connections the server can have simultaneously. This limit is determined in the [`setMaxServerConnections`](/simplehttpserver/javadoc/simplehttpserver/com/kttdevelopment/simplehttpserver/handler/ServerExchangeThrottler.html#setMaxServerConnections(int)) method on the throttler.

A value of `0` means no connections allowed and `-1` means unlimited connections allowed.

An exchange can be exempt from the server limit if they return true in the [`canIgnoreConnectionLimit`](/simplehttpserver/javadoc/simplehttpserver/com/kttdevelopment/simplehttpserver/handler/ServerExchangeThrottler.html#canIgnoreConnectionLimit(com.sun.net.httpserver.HttpExchange)) method of the throttler.

```java
HttpHandler handler =  new HttpHandler(){

    @Override
    public void handle(HttpExchange httpExchange){
        // handle exchange
    }

};

ServerExchangeThrottler throttler = new ServerExchangeThrottler(){

    @Override
    public int getMaxConnections(HttpExchange exchange){
        // only allow user to have two simultaneous exchanges
        return 2;
    }

    @Override
    public boolean canIgnoreConnectionLimit(HttpExchange exchange){
        // make all users exempt from server connection limit
        return true;
    }

};
// only allow one connection to access the server at any time
throttler.setMaxServerConnections(1);

HttpServer server = HttpServer.create(8080);
server.createContext("/", new ThrottledHandler(handler, throttler));
```

## Session Throttler

The [`SessionThrottler`](/simplehttpserver/javadoc/simplehttpserver/com/kttdevelopment/simplehttpserver/handler/SessionThrottler.html) limits the amount of simultaneous connections a single session can have. This limit is determined by the getMaxConnections method in the throttler.

A value of 0 means no connections allowed and -1 means unlimited connections allowed.

A [`HttpSessionHandler`](/simplehttpserver/javadoc/simplehttpserver/com/kttdevelopment/simplehttpserver/HttpSessionHandler.html) is required in order the handler to retrive sessions from the server. See [http session](/simplehttpserver/exchange/http-session) for more details.

```java
HttpHandler handler = new HttpHandler(){

    @Override
    public void handle(HttpExchange httpExchange){
        // handle exchange
    }

};

HttpSessionHandler sessionHandler = new HttpSessionHandler();

SessionThrottler throttler = new SessionThrottler(sessionHandler){

    @Override
    public int getMaxConnections(HttpSession session, HttpExchange exchange){
        // only allow session to have two simultaneous exchanges
        return 2;
    }

};

SimpleHttpServer server = SimpleHttpServer.create(8080);
server.setHttpSessionHandler(sessionHandler);

server.createContext("/", new ThrottledHandler(handler, throttler))
```

## Server Session Throttler

The [`ServerSessionThrottler`](/simplehttpserver/javadoc/simplehttpserver/com/kttdevelopment/simplehttpserver/handler/ServerSessionThrottler.html) is the same as the session throttler but also has a limit on the total connections the server can have simultaneously. This limit is determined in the [`setMaxServerConnections`](/simplehttpserver/javadoc/simplehttpserver/com/kttdevelopment/simplehttpserver/handler/ServerSessionThrottler.html#setMaxServerConnections(int)) method on the throttler.

A value of `0` means no connections allowed and `-1` means unlimited connections allowed.

An exchange can be exempt from the server limit if they return true in the [`canIgnoreConnectionLimit`](/simplehttpserver/javadoc/simplehttpserver/com/kttdevelopment/simplehttpserver/handler/ServerSessionThrottler.html#canIgnoreConnectionLimit(com.kttdevelopment.simplehttpserver.HttpSession,com.sun.net.httpserver.HttpExchange)) method of the throttler.

```java
HttpHandler handler =  new HttpHandler(){

    @Override
    public void handle(HttpExchange httpExchange){
        // handle exchange
    }

};

HttpSessionHandler sessionHandler = new HttpSessionHandler();

ServerSessionThrottler throttler = new ServerSessionThrottler(sessionHandler){

    @Override
    public int getMaxConnections(HttpSession session, HttpExchange exchange){
        // only allow session to have two simultaneous exchanges
        return 2;
    }

    @Override
    public boolean canIgnoreConnectionLimit(HttpSession session, HttpExchange exchange){
        // make all sessions exempt from server connection limit
        return true;
    }

};
// only allow one connection to access the server at any time
throttler.setMaxServerConnections(1);

SimpleHttpServer server = SimpleHttpServer.create(8080);
server.setHttpSessionHandler(sessionHandler);

server.createContext("/", new ThrottledHandler(handler, throttler));
```

<hr>

[Multithreaded server is not processing requests in parallel](/simplehttpserver/server/multithreaded-server#multithreaded-server-is-not-processing-requests-in-parallel)