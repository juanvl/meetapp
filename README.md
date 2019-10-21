# Meetapp

Projeto final para certificação no bootcamp da <a href="https://rocketseat.com.br/" target="blank">Rocketseat</a>.

O Meetapp é uma aplicação que permite aos usuários participar, criar e gerenciar encontros (meetups).

A versão web foi desenvolvida para os organizadores poderem criar e gerenciar seus meetups, enquanto a versão mobile serve para os usuários gerenciarem suas participações em meetups.

## Passo a passo para executar a aplicação

#### 1. Meetapp Server

* Com o <a href="https://docs.docker.com/install/" target="blank">Docker</a> e <a href="https://docs.docker.com/compose/install/" target="blank">Docker Compose</a> instalados, acesse a pasta **backend** do projeto e execute no terminal:

```
docker-compose up
```

O servidor já estará rodando e pronto para receber requisições da api.

#### 2. Meetapp Web

* Acesse a pasta **frontend** deste projeto e execute no terminal:

```
yarn start
```

É necessário ter o <a href="https://nodejs.org/" target="blank">Node</a> instalado em sua máquina. Caso não tenha o <a href="https://yarnpkg.com/" target="blank">yarn</a> pode rodar também com `npm start`.

A aplicação ficará acessível no seu navegador em http://localhost:3000

#### 3. Meetapp Mobile

> :warning: **A versão mobile foi desenvolvida e testada somente no emulador do iOS. O funcionamento no Android não é garantido.**

* Acesse a pasta **mobile** deste projeto e execute no terminal:

```
react-native run-ios
```