// Espera o conteúdo da página carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', function() {

    // --- SELEÇÃO DOS ELEMENTOS DO HTML ---
    // Encontra os elementos com os quais vamos interagir e os guarda em variáveis
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // --- FUNÇÕES ---

    // Função principal para criar uma nova tarefa
    function createTask() {
        // 1. Pega o texto digitado pelo usuário e remove espaços em branco extras
        const taskText = taskInput.value.trim();

        // 2. Verifica se o usuário realmente digitou algo. Se não, exibe um alerta e para.
        if (taskText === '') {
            alert('Por favor, digite uma tarefa válida.');
            return; // Encerra a função aqui se o campo estiver vazio
        }

        // 3. Cria os elementos HTML para a nova tarefa
        const listItem = document.createElement('li'); // Cria o <li>
        listItem.className = 'task-item'; // Adiciona uma classe para o CSS

        const taskTextSpan = document.createElement('span'); // Cria o <span> para o texto
        taskTextSpan.textContent = taskText; // Coloca o texto digitado dentro do <span>

        const completeBtn = document.createElement('button'); // Cria o botão "Concluir"
        completeBtn.textContent = 'Concluir';
        completeBtn.className = 'complete-btn';

        const deleteBtn = document.createElement('button'); // Cria o botão "Excluir"
        deleteBtn.textContent = 'Excluir';
        deleteBtn.className = 'delete-btn';

        // 4. Monta o item da lista, colocando os elementos na ordem correta
        listItem.appendChild(taskTextSpan);
        listItem.appendChild(completeBtn);
        listItem.appendChild(deleteBtn);

        // 5. Adiciona o item da lista (<li>) completo à lista de tarefas (<ul>) na página
        taskList.appendChild(listItem);

        // 6. Limpa o campo de digitação e foca nele para a próxima tarefa
        taskInput.value = '';
        taskInput.focus();
    }

    // --- EVENT LISTENERS (OUVINTES DE EVENTOS) ---

    // 1. Diz ao botão "Adicionar" para executar a função createTask quando for clicado
    addTaskBtn.addEventListener('click', createTask);

    // 2. Bônus: Permite que o usuário adicione uma tarefa pressionando a tecla "Enter"
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            createTask();
        }
    });

    // 3. Adiciona UM ÚNICO "ouvinte" na lista inteira para gerenciar os cliques
    taskList.addEventListener('click', function(event) {
        
        // Pega o elemento exato que foi clicado (seja o texto, um botão, etc.)
        const clickedElement = event.target;

        // VERIFICA SE O CLIQUE FOI NO BOTÃO "CONCLUIR"
        if (clickedElement.className === 'complete-btn') {
            // Se for, pega o 'pai' do botão, que é o item da lista (<li>)
            const taskItem = clickedElement.parentElement;
            // Adiciona ou remove a classe 'completed' para mudar o estilo via CSS
            taskItem.classList.toggle('completed');
        }

        // VERIFICA SE O CLIQUE FOI NO BOTÃO "EXCLUIR"
        if (clickedElement.className === 'delete-btn') {
            // Se for, pega o 'pai' do botão, que é o item da lista (<li>)
            const taskItem = clickedElement.parentElement;
            // Remove o item da lista (<li>) da página
            taskItem.remove();
        }
    });

}); // Este é o '});' de fechamento do DOMContentLoaded. O código vai ACIMA dele.
