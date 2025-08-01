# 🇩🇪 Projeto Destino Alemanha

## 📝 Descrição

Um dashboard interativo construído para auxiliar no planejamento e organização de uma mudança para a Alemanha. Este projeto foi desenvolvido como parte do meu portfólio para demonstrar minhas habilidades em desenvolvimento front-end, desde a manipulação de dados locais até a integração com APIs externas.

## ✨ Funcionalidades Principais

-   ✅ **Checklist de Tarefas Interativo:** Adicione, conclua e exclua tarefas. Seu progresso é salvo automaticamente no navegador usando `localStorage`.
-   ✅ **Calculadora de Custos:** Estime seu orçamento mensal na Alemanha.
-   ✅ **Conversor de Moeda em Tempo Real:** Converta um valor em Reais (BRL) para Euros (EUR) utilizando a API de cotações do Banco Central do Brasil, buscando sempre o valor do dia útil mais recente.
-   🎨 **Design Responsivo e Temático:** Interface inspirada nas cores da bandeira da Alemanha, totalmente adaptável para dispositivos móveis, tablets e desktops.

## 🛠️ Tecnologias Utilizadas

-   **HTML5:** Estruturação semântica do conteúdo.
-   **CSS3:** Estilização moderna, Flexbox e design responsivo (Mobile First).
-   **JavaScript (ES6+):**
    -   Manipulação do DOM para interatividade.
    -   `localStorage` para persistência de dados no cliente.
    -   `fetch` API com `async/await` para consumo de APIs externas.
-   **API:** [PTAX (Banco Central do Brasil)](https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/aplicacao#!/recursos) para cotações de moeda.

## 🚀 Link para o Projeto Online

(https://nicolasmoreiradev.github.io/projeto-destino-alemanha/)

## 📂 Como Executar o Projeto Localmente

```bash
# Clone este repositório
$ git clone [https://github.com/NicolasMoreiraDev/projeto-destino-alemanha.git](https://github.com/NicolasMoreiraDev/projeto-destino-alemanha.git)

# Acesse a pasta do projeto
$ cd projeto-destino-alemanha

# Abra o arquivo index.html no seu navegador

## 💡 Melhorias Futuras

-   [ ] Implementar um modo noturno (Dark Mode) para melhorar o conforto visual.
-   [ ] Incrementar recursos visuais (imagens).
-   [ ] Permitir que os usuários adicionem e salvem seus próprios links na seção de Recursos (requer backend).
