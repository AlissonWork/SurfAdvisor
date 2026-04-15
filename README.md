# 🏄‍♂️ SurfAdvisor (Full-Stack em Desenvolvimento 🚧)

> **Status do Projeto:** O projeto está evoluindo de uma API RESTful para uma aplicação Full-Stack completa. O núcleo do backend e o painel de gestão Front-end (MVP) já estão funcionais, com integrações robustas de UI e consumo de dados em tempo real.

O **SurfAdvisor** é o assistente definitivo de qualquer surfista. O sistema permite que o usuário gerencie o seu *quiver* (coleção de pranchas) de forma visual e inteligente e, utilizando dados oceanográficos em tempo real, recomenda a prancha ideal para o mar do dia com base no nível de habilidade e peso do surfista.

## 🚀 O que o projeto já faz (Features Atuais)

* **Gestão de Quiver Interativa (Front-end & API):** * **Dashboard Dinâmico (Read):** Visualização em grid responsivo dos *BoardCards*, com cálculo em tempo real de estatísticas do usuário (Total de pranchas, Volume acumulado, Variedade de estilos).
  * **Modais Inteligentes (Create/Update):** Componentes "Transformer" que gerenciam tanto a criação quanto a edição de pranchas. Lida com envio de imagens e textos simultaneamente usando `FormData`.
  * **Arquitetura Avançada de UI:** Utilização nativa de **React Portals** para renderização de modais, contornando limitações complexas de *Stacking Context* do CSS.
  * **Segurança de UX (Delete):** Fluxo de remoção de pranchas com barreira de segurança contra deleções acidentais e sincronização de estado com o servidor.
* **Autenticação e Segurança:** * Cadastro de usuários com criptografia de senha (`bcrypt`).
  * Login seguro com geração de token (`JWT`).
  * Rotas protegidas (Apenas donos podem editar, excluir ou visualizar suas próprias pranchas).
* **Motor de Recomendação Inteligente:** * Integração com a API externa **Open-Meteo Marine** para buscar a altura exata das ondas em tempo real nos principais picos do Ceará (Taíba, Paracuru, Praia do Futuro, etc).
  * Algoritmo customizado que cruza o tamanho real da onda atual com o peso e nível de surf do usuário (Iniciante, Intermediário, Avançado, Pró).
  * O sistema calcula a faixa de litragem e o estilo ideal, retornando a melhor opção de prancha disponível no *quiver* para as condições reais do mar.

## 🛠️ Tecnologias Utilizadas

* **Front-end:** React.js, Tailwind CSS (Design System & Animações), Axios (Consumo de API).
* **Back-end:** Node.js & Express (Estrutura base e roteamento HTTP).
* **Banco de Dados:** MongoDB & Mongoose (Modelagem NoSQL com relacionamento direto entre Usuários e Pranchas).
* **Gestão de Arquivos e Dados:** Multer (Manipulação e conversão de requisições `multipart/form-data`).
* **Segurança e Autenticação:** JSON Web Token (JWT) e Bcrypt.

## 🚧 Próximos Passos (Backlog)

* **Visualização Detalhada (Zoom-in):** Construção de uma interface dedicada para exibir as pranchas em alta resolução com a ficha técnica completa.
* **Refinamentos Finais:** Tratamento avançado de erros globais no Front-end e responsividade extrema.
