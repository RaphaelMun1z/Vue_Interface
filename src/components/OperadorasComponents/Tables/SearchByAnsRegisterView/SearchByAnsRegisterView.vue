<template>
    <div class="content-container">
        <div class="table-header">
            <h1>Busca de Operadora por Registro ANS</h1>
            <div class="filter-form">
                <p>Filtro:</p>
                <input type="text" placeholder="Buscar por número Registro ANS" v-model="registroAnsInput" @keyup.enter="handleSearch">
                <button type="submit" @click="handleSearch" :disabled="loading || !registroAnsInput.trim()"><span class="material-symbols-outlined">search</span></button>
            </div>
            <div class="msg-container" v-if="inputError || loading || error">
                <p v-if="inputError" class="error-message">{{ inputError }}</p>
                <div v-if="loading" class="status-message">
                    <p>Buscando operadora...</p>
                </div>
                <div v-else-if="error" class="error-message">
                    <p>{{ error }}</p>
                </div>
            </div>
        </div>
        <div class="data-table-container">
            <div v-if="operadoraData" class="operadora-container">
                <div class="operadora-header">
                    <h2>{{ operadoraData.nomeFantasia || 'Nome Fantasia não informado' }}</h2>
                    <p>{{ operadoraData.razaoSocial || 'Razão Social não informada' }}</p>
                </div>
                
                <div class="operadora-content">
                    <div class="info-group">
                        <h3>Informações Básicas</h3>
                        <div class="info-item">
                            <span class="info-label">Registro ANS: </span>
                            <span class="info-value">{{ operadoraData.registroAns || 'Não informado' }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">CNPJ: </span>
                            <span class="info-value">{{ operadoraData.cnpj || 'Não informado' }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Razão Social: </span>
                            <span class="info-value">{{ operadoraData.razaoSocial || 'Não informada' }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Nome Fantasia: </span>
                            <span class="info-value">{{ operadoraData.nomeFantasia || 'Não informado' }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Modalidade: </span>
                            <span class="info-value">{{ operadoraData.modalidade || 'Não informada' }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Data Registro ANS: </span>
                            <span class="info-value">{{ operadoraData.dataRegistroAns || 'Não informada' }}</span>
                        </div>
                    </div>
                    
                    <div class="info-group">
                        <h3>Endereço</h3>
                        <div class="info-item">
                            <span class="info-label">Logradouro: </span>
                            <span class="info-value">{{ operadoraData.logradouro || 'Não informado' }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Número: </span>
                            <span class="info-value">{{ operadoraData.numero || 'Não informado' }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Complemento: </span>
                            <span class="info-value">{{ operadoraData.complemento || 'Não informado' }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Bairro: </span>
                            <span class="info-value">{{ operadoraData.bairro || 'Não informado' }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Cidade/UF: </span>
                            <span class="info-value">
                                {{ operadoraData.cidade || 'Cidade não informada' }}/{{ operadoraData.uf || 'UF não informada' }}
                            </span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">CEP: </span>
                            <span class="info-value">{{ operadoraData.cep || 'Não informado' }}</span>
                        </div>
                    </div>
                    
                    <div class="info-group">
                        <h3>Contato</h3>
                        <div class="info-item">
                            <span class="info-label">DDD/Telefone: </span>
                            <span class="info-value">
                                <template v-if="operadoraData.ddd && operadoraData.telefone">
                                    ({{ operadoraData.ddd }}) {{ operadoraData.telefone }}
                                </template>
                                <template v-else>Não informado</template>
                            </span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Fax: </span>
                            <span class="info-value">{{ operadoraData.fax || 'Não informado' }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">E-mail: </span>
                            <div class="contact-links">
                                <a v-if="operadoraData.enderecoEletronico" :href="'mailto:' + operadoraData.enderecoEletronico">
                                    {{ operadoraData.enderecoEletronico }}
                                </a>
                                <span v-else>Não informado</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="info-group">
                        <h3>Representante</h3>
                        <div class="info-item">
                            <span class="info-label">Nome: </span>
                            <span class="info-value">{{ operadoraData.representante || 'Não informado' }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Cargo: </span>
                            <span class="info-value">{{ operadoraData.cargoRepresentante || 'Não informado' }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Região Comercialização: </span>
                            <span class="info-value">{{ operadoraData.regiaoDeComercializacao || 'Não informada' }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <p v-else-if="!initialLoad && !loading">Nenhuma operadora encontrada com o registro informado!</p>
        </div>
    </div>
</template>

<script setup lang="ts">
// Style
import './SearchByAnsRegisterView.scss'

// Interfaces
import type { OperadoraInterface } from '../../../../types/Operadora';

// Services
import OperadorasService from '@/services/OperadorasService';

import { ref } from 'vue';

const operadoraData = ref<OperadoraInterface | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);
const registroAnsInput = ref('');
const inputError = ref<string | null>(null);
const initialLoad = ref(true);

const service = new OperadorasService();

function validateInput() {
    if (!registroAnsInput.value.trim()) {
        inputError.value = 'Por favor, digite um número de registro';
        return false;
    }
    
    if (!/^\d+$/.test(registroAnsInput.value)) {
        inputError.value = 'O registro deve conter apenas números';
        return false;
    }
    
    inputError.value = null;
    return true;
}

async function handleSearch() {
    if (!validateInput()) return;
    
    loading.value = true;
    error.value = null;
    operadoraData.value = null;
    
    try {
        const data = await service.getOperadorasByAnsRegister(registroAnsInput.value.trim());
        operadoraData.value = data;
        initialLoad.value = false;
    } catch (err) {
        error.value = 'Erro ao buscar operadora. Tente novamente.';
        console.error('Erro:', err);
    } finally {
        loading.value = false;
    }
}
</script>