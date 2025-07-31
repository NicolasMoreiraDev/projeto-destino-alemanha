// script.js

document.addEventListener('DOMContentLoaded', function() {// Espera até que todo o conteúdo da página esteja pronto antes de executar o código dentro do bloco

    // --- SELEÇÃO DOS ELEMENTOS ---
    const taskInput = document.getElementById('task-input');// Input onde o usuário escreve a tarefa
    const addTaskBtn = document.getElementById('add-task-btn');// Botão para adicionar uma nova tarefa
    const taskList = document.getElementById('task-list');// Lista onde as tarefas serão mostradas

    // --- FUNÇÕES ---

    // Função para salvar todas as tarefas atuais no localStorage
    function saveTasks() {
        const tasks = [];
        // Pega todos os itens da lista na página
        document.querySelectorAll('.task-item').forEach(taskItem => {
            // Para cada item, cria um objeto com o texto e o estado 'completed'
            tasks.push({
                text: taskItem.querySelector('span').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        // Converte a lista de objetos em texto (JSON) e salva no localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Função para carregar as tarefas salvas quando a página abre
    function loadTasks() {
        // Pega as tarefas salvas no localStorage
        const savedTasks = localStorage.getItem('tasks');
        // Se houver tarefas salvas...
        if (savedTasks) {
            // Converte o texto (JSON) de volta para uma lista de objetos
            const tasks = JSON.parse(savedTasks);
            // Para cada tarefa na lista, cria o elemento HTML correspondente
            tasks.forEach(task => {
                createTaskElement(task.text, task.completed);
            });
        }
    }

    // Função para criar um novo elemento de tarefa na lista
    function createTaskElement(text, isCompleted) {
        const listItem = document.createElement('li');
        listItem.className = 'task-item';
        // Se a tarefa já estava completa, adiciona a classe 'completed'
        if (isCompleted) {
            listItem.classList.add('completed');
        }

        const taskTextSpan = document.createElement('span');// Cria um span para mostrar o texto da tarefa
        taskTextSpan.textContent = text;

        const completeBtn = document.createElement('button');// Cria um botão para marcar como concluído
        completeBtn.textContent = 'Concluir';
        completeBtn.className = 'complete-btn';

        const deleteBtn = document.createElement('button');// Cria um botão para deletar a tarefa
        deleteBtn.textContent = 'Excluir';
        deleteBtn.className = 'delete-btn';

        listItem.appendChild(taskTextSpan);
        listItem.appendChild(completeBtn);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
    }

    // A função principal usa a 'createTaskElement' e salva
    function handleAddTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Por favor, digite uma tarefa válida.');
            return;
        }
        createTaskElement(taskText, false); // Cria uma nova tarefa, sempre como não concluída
        taskInput.value = '';
        taskInput.focus();
        saveTasks(); // NOVO: Salva a lista toda vez que uma nova tarefa é adicionada
    }

    // --- EVENT LISTENERS ---

    addTaskBtn.addEventListener('click', handleAddTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    });

    taskList.addEventListener('click', function(event) {
        const clickedElement = event.target;

        if (clickedElement.className === 'complete-btn') {
            const taskItem = clickedElement.parentElement;
            taskItem.classList.toggle('completed');
            saveTasks(); // Salva a lista toda vez que uma tarefa é concluída/desconcluída
        }

        if (clickedElement.className === 'delete-btn') {
            const taskItem = clickedElement.parentElement;
            taskItem.remove();
            saveTasks(); // Salva a lista toda vez que uma tarefa é excluída
        }
    });

    // --- CARGA INICIAL ---
    loadTasks(); // Carrega as tarefas salvas assim que a página estiver pronta

});

document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DA CALCULADORA DE CUSTOS ---

    // 1. Seleciona todos os elementos da calculadora
    const salaryInput = document.getElementById('salary-input');
    const rentInput = document.getElementById('rent-input');
    const transportInput = document.getElementById('transport-input');
    const foodInput = document.getElementById('food-input');

    const netSalarySpan = document.getElementById('net-salary');
    const totalExpensesSpan = document.getElementById('total-expenses');
    const remainingBalanceSpan = document.getElementById('remaining-balance');

    // 2. Cria a função que faz todos os cálculos
    function calculateBudget() {
        // Pega os valores dos inputs, convertendo para número. Se estiver vazio, considera como 0.
        const grossSalary = parseFloat(salaryInput.value) || 0;
        const rent = parseFloat(rentInput.value) || 0;
        const transport = parseFloat(transportInput.value) || 0;
        const food = parseFloat(foodInput.value) || 0;

        // Lógica de cálculo (simplificada)
        // Na Alemanha, os impostos são complexos. Vamos usar uma aproximação de 35% de impostos.
        const estimatedTaxes = grossSalary * 0.35;
        const netSalary = grossSalary - estimatedTaxes;
        
        const totalExpenses = rent + transport + food;
        const remainingBalance = netSalary - totalExpenses;

        // 3. Atualiza o HTML com os resultados formatados
        netSalarySpan.textContent = `€ ${netSalary.toFixed(2)}`;
        totalExpensesSpan.textContent = `€ ${totalExpenses.toFixed(2)}`;
        remainingBalanceSpan.textContent = `€ ${remainingBalance.toFixed(2)}`;
    }

    // 4. Adiciona 'ouvintes' de evento para chamar a função de cálculo
    // O evento 'input' é acionado toda vez que o usuário digita algo
    salaryInput.addEventListener('input', calculateBudget);
    rentInput.addEventListener('input', calculateBudget);
    transportInput.addEventListener('input', calculateBudget);
    foodInput.addEventListener('input', calculateBudget);
});
// --- LÓGICA DA CONVERSÃO VIA API BACEN ---

// 1. Seleciona os novos elementos
const brlInput = document.getElementById('brl-input');
const convertBtn = document.getElementById('convert-btn');
const rateInfo = document.getElementById('rate-info');
const salaryInput = document.getElementById('salary-input');

// 2. Cria a função assíncrona para buscar os dados na API
async function fetchConversionRate() {
    // --- 1. PREPARAÇÃO DAS DATAS  ---
    const endDate = new Date(); // Data de hoje
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7); // Buscando na janela dos últimos 7 dias para garantir

    // Função auxiliar para formatar a data no padrão MM-DD-YYYY que a API exige
    function formatDateForApi(date) {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
    }

    const formattedStartDate = formatDateForApi(startDate);
    const formattedEndDate = formatDateForApi(endDate);

    rateInfo.textContent = 'Buscando a cotação mais recente...';
    convertBtn.disabled = true;
    convertBtn.classList.add('loading');

    try {
        // --- 2. MONTAGEM DA URL INTELIGENTE ---
        // Usando o endpoint de período e os truques de OData para pegar apenas a última cotação 
        const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='EUR'&@dataInicial='${formattedStartDate}'&@dataFinalCotacao='${formattedEndDate}'&$top=1&$orderby=dataHoraCotacao%20desc&$format=json&$select=cotacaoCompra,dataHoraCotacao`;

        rateInfo.textContent = 'Buscando a cotação mais recente...';

        // --- 3. EXECUÇÃO DA CHAMADA (A lógica interna continua a mesma) ---
        const response = await fetch(url);// Faz a chamada à API
        if (!response.ok) {
            throw new Error('Não foi possível obter a cotação. Verifique a conexão.');
        }

        const data = await response.json();// Converte a resposta em JSON
        
        if (data.value.length === 0) {
            throw new Error('Nenhuma cotação encontrada no período. Tente mais tarde.');
        }
        
        const latestQuote = data.value[0];
        const exchangeRate = latestQuote.cotacaoCompra;
        
        // Pega a data da cotação e formata para exibição
        const quoteDate = new Date(latestQuote.dataHoraCotacao);
        const friendlyDate = quoteDate.toLocaleDateString('pt-BR');
        
        rateInfo.textContent = `Cotação de ${friendlyDate}: 1 EUR = R$ ${exchangeRate.toFixed(2)}`;

        const brlValue = parseFloat(brlInput.value) || 0;
        if (brlValue > 0) {
            const euroValue = brlValue / exchangeRate;
            salaryInput.value = euroValue.toFixed(2);
            salaryInput.dispatchEvent(new Event('input'));
        }

    } catch (error) {
        rateInfo.textContent = error.message;
        console.error("Erro ao buscar API:", error);
    } finally {
        convertBtn.disabled = false;
        convertBtn.classList.remove('loading');
    }
}

// 3. Adiciona o 'ouvinte' de evento ao botão de conversão
convertBtn.addEventListener('click', fetchConversionRate);