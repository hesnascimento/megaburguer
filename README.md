# MEGABURGUER

Aplicação se seleção e customização de lanches.

[![Build Status](https://travis-ci.org/hesnascimento/megaburguer.svg?branch=master)](https://travis-ci.org/hesnascimento/megaburguer)

## Pré-instalação
1. Descompacte o arquivo megaburguer.zip de {projeto}/dados
2. Realize o mongorestore (veja documentação em https://docs.mongodb.com/) do dump extraido

## Instalação
1. Clone o repositório
2. Instale as dependencias com  ``npm install``
3. Configure a variável ``MONGODB``  com a string de conexão com MongoDB
4. Configure a variável ``PORT`` com a porta que o server irá escutar
5. Configure a variável ``CORS_LIST`` com a lista de endereços com acesso a API separados por virgula.
6. Execute o comando ``npm start``
7. Realize o teste através do {endereço}/api/lanches. Você deverá ver um JSON com detalhes dos lanches.
