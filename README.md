# challenge RoutEasy

## Este projeto utiliza as seguintes tecnologias:
    backend:
    - NodeJS
    - Express
    - Mongoose
    - BodyParser
    - TypeScript
    - TServer (biblioteca própria de serviço http)
    frontend:
    - AngularJS
    - Bootstrap
    - Leaflet
    maps:
    - Google Maps API

## Antes de executar o projeto, é necessário ter instalado os seguintes aplicativos:
    - NodeJS (instalado)
    - MongoDB (instalado e executando)

## Para instalar as dependências do projeto:
`npm install`

## O projeto já vem com os arquivos na pasta "bin" pré-compilados.
Para compilar os arquivos na pasta "src" é necessário ter o TypeScript instalado:
`npm install -g typescript`

## Após a instalação, é necessário executar o compilador na pasta do projeto:
`tsc`

## Para executar o projeto:
`npm start`


## Se o key do Google Maps API expirar, altere o key nos arquivos :
 `public/index.html => <script src="http://maps.google.com/maps/api/js?v=3.exp&key=DigiteSuaKey"></script>`
 `public/app/factory => const googleKey = "DigiteSuaKey"`