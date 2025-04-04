<template>
    <div class="profile">
        <div class="profile-header">
            <h1>Sobre mim</h1>
        </div>
        <div class="profile-content">
            <h2>Nome: Raphael Muniz Varela</h2>
            <h4>E-mail: raphaelmunizvarela@gmail.com</h4>
            <h4>Telefone: (13) 99183-8939</h4>
            <h4>LinkedIn: <a href="https://www.linkedin.com/in/raphael-muniz-7119911a2/" target="_blank">https://www.linkedin.com/in/raphael-muniz-7119911a2/</a></h4>
            <h4>GitHub: <a href="https://github.com/RaphaelMun1z" target="_blank">https://github.com/RaphaelMun1z</a></h4>
            <router-link to="/" class="back-button">Voltar</router-link>
        </div>
    </div>
</template>

<style>
.profile {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 20px;
}

.profile-header {
    text-align: center;
    margin-bottom: 20px;
}

.profile-content {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-content h2, .profile-content h4 {
    margin: 10px 0;
}

.profile-content a {
    color: #007bff;
    text-decoration: none;
}

.profile-content a:hover {
    text-decoration: underline;
}

.back-button {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white !important;
    font-weight: bold;
    text-decoration: none !important;
    border-radius: 5px;
    transition: all 0.3s ease;
    
    &:hover{
        transition: all 0.3s ease;
        opacity: 0.8;
    }
}

@media (min-width: 1024px) {
    .profile {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }
    
    .profile-content {
        max-width: 600px;
    }
}
</style>
