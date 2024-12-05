// Armazenamento de dados no localStorage
const localStorageData = {
    usuario: null,
    aulasAgendadas: [],
    planosEscolhidos: []
};

// Cadastro de usuário
document.getElementById("form-cadastro")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;
    const email = document.getElementById("email").value;
    const funcao = document.getElementById("funcao").value;

    // Criar o usuário no localStorage
    localStorageData.usuario = { nome, email, senha, funcao };
    localStorage.setItem("usuario", JSON.stringify(localStorageData.usuario));

    // Redirecionar para o dashboard do usuário
    if (funcao === "aluno") {
        window.location.href = "dashboard.html?funcao=aluno";
    } else {
        window.location.href = "dashboard.html?funcao=professor";
    }
});

// Função para exibir o plano escolhido
function escolherPlano(plano) {
    localStorageData.planosEscolhidos.push(plano);
    localStorage.setItem("planosEscolhidos", JSON.stringify(localStorageData.planosEscolhidos));
    alert(`Você escolheu o plano: ${plano}`);
}

// Dashboard do usuário (Aluno ou Professor)
function carregarDashboard() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
        alert("Você não está logado!");
        return;
    }

    if (usuario.funcao === 'aluno') {
        carregarDashboardAluno();
    } else if (usuario.funcao === 'professor') {
        carregarDashboardProfessor();
    }
}

// Função para o Dashboard do Aluno
function carregarDashboardAluno() {
    document.body.innerHTML = `
        <h1>Bem-vindo, Aluno!</h1>
        <p>Seu progresso de treino:</p>
        <div class="progress-bar">
            <div class="progress" style="width: 70%;"></div>
        </div>

        <h2>Suas Aulas Agendadas:</h2>
        <ul id="aulas-agendadas"></ul>

        <h2>Marcar Aula:</h2>
        <form id="form-marcar-aula">
            <label for="data">Data:</label><input type="date" id="data">
            <label for="hora">Hora:</label><input type="time" id="hora">
            <button type="submit">Marcar Aula</button>
        </form>
    `;

    document.getElementById("form-marcar-aula").addEventListener("submit", function(event) {
        event.preventDefault();
        const data = document.getElementById("data").value;
        const hora = document.getElementById("hora").value;

        if (data && hora) {
            const aula = { data, hora };
            localStorageData.aulasAgendadas.push(aula);
            localStorage.setItem("aulasAgendadas", JSON.stringify(localStorageData.aulasAgendadas));
            atualizarAulas();
        } else {
            alert("Preencha todos os campos!");
        }
    });

    atualizarAulas();
}

// Atualizar lista de aulas agendadas no dashboard
function atualizarAulas() {
    const aulasList = document.getElementById("aulas-agendadas");
    aulasList.innerHTML = '';
    localStorageData.aulasAgendadas.forEach((aula) => {
        const li = document.createElement("li");
        li.textContent = `${aula.data} - ${aula.hora}`;
        aulasList.appendChild(li);
    });
}

// Função para o Dashboard do Professor
function carregarDashboardProfessor() {
    document.body.innerHTML = `
        <h1>Bem-vindo, Professor!</h1>
        <p>Aqui você pode agendar aulas e interagir com os alunos.</p>
        <button onclick="mostrarAulasAgendadas()">Ver Aulas Agendadas</button>
    `;
}

// Exibir as aulas agendadas do professor
function mostrarAulasAgendadas() {
    alert("Aqui você verá todas as aulas agendadas.");
}
