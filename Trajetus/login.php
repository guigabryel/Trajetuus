<?php
// Conexão com o banco de dados
$host = '127.0.0.1';
$user = 'root';
$password = ''; // Adicione sua senha aqui
$dbname = 'trajetus';

// Cria a conexão
$conn = new mysqli($host, $user, $password, $dbname);

// Verifica se há erros na conexão
if ($conn->connect_error) {
    die('Erro na conexão: ' . $conn->connect_error);
} else {
    echo 'Conexão estabelecida com sucesso!';
}


// Verifica se os dados foram enviados pelo formulário
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['username'];
    $email = $_POST['email'];
    $senha = $_POST['password'];
    $funcao = $_POST['userType'];

    // Insere os dados no banco de dados
    $sql = "INSERT INTO usuarios (nome, email, senha, funcao) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param('ssss', $nome, $email, $senha, $funcao);
        if ($stmt->execute()) {
            echo "Registro salvo com sucesso!";
        } else {
            echo "Erro ao salvar o registro: " . $stmt->error;
        }
        $stmt->close();
    } else {
        echo "Erro na preparação da consulta: " . $conn->error;
    }
}

$conn->close();
?>