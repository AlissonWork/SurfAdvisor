# 🏄‍♂️ SurfAdvisor API (Em Desenvolvimento 🚧)

> **Status do Projeto:** Este projeto está atualmente em fase de desenvolvimento. O núcleo do backend (MVP) está funcional, mas novas rotas, aprimoramentos no algoritmo e a interface visual (Front-end) ainda estão sendo construídos!

O **SurfAdvisor** é uma API RESTful desenvolvida em Node.js projetada para ser o assistente definitivo de qualquer surfista. O sistema permite que o usuário gerencie o seu *quiver* (coleção de pranchas) e, utilizando dados oceanográficos em tempo real, recomenda a prancha ideal para o mar do dia com base no nível de habilidade e peso do surfista.

## 🚀 O que o projeto já faz (Features Atuais)

* **Autenticação e Segurança:** * Cadastro de usuários com criptografia de senha (`bcrypt`).
  * Login seguro com geração de token (`JWT`).
  * Rotas protegidas (Apenas donos podem editar, excluir ou visualizar suas próprias pranchas).
* **Gestão de Quiver (CRUD):** * Adicionar, listar, editar e remover pranchas.
  * Rota exclusiva para listar apenas as pranchas do usuário logado (Dashboard pessoal).
* **Motor de Recomendação Inteligente:** * Integração com a API externa **Open-Meteo Marine** para buscar a altura exata das ondas em tempo real nos principais picos do Ceará (Taíba, Paracuru, Praia do Futuro, etc).
  * Algoritmo customizado que cruza o tamanho real da onda atual com o peso e nível de surf do usuário (Iniciante, Intermediário, Avançado, Pró).
  * O sistema calcula a faixa de litragem e o estilo ideal, retornando a melhor opção de prancha disponível no *quiver* para as condições reais do mar.

## 🛠️ Tecnologias Utilizadas

* **Node.js** & **Express:** Estrutura base da API e roteamento HTTP.
* **MongoDB** & **Mongoose:** Banco de dados NoSQL e modelagem de dados (com relacionamento direto entre Usuários e Pranchas).
* **Axios:** Cliente HTTP para consumo eficiente da API oceanográfica externa.
* **JSON Web Token (JWT):** Controle de sessão e autorização segura nas rotas.
