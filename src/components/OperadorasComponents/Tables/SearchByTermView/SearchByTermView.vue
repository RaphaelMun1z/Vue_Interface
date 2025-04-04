<template>
    <div class="content-container">
        <div class="table-header">
            <h1>Busca de Operadoras por Termo Textual</h1>
            <div class="filter-form">
                <p>Filtro:</p>
                <input type="text" placeholder="Buscar por termo textual" v-model="textTermInput" @keyup.enter="handleSearch">
                <button type="submit" @click="handleSearch" :disabled="loading || !textTermInput.trim()"><span class="material-symbols-outlined">search</span></button>
            </div>
            <div class="msg-container" v-if="inputError || loading || error">
                <p v-if="inputError" class="error-message">{{ inputError }}</p>
                <div v-if="loading" class="status-message">
                    <p>Buscando operadoras...</p>
                </div>
                <div v-else-if="error" class="error-message">
                    <p>{{ error }}</p>
                </div>
            </div>
        </div>
        <div class="data-table-container">
            <p v-if="operadorasData.length == 0">Não foram encontradas operadoras.</p>
            <table v-else>
                <thead>
                    <tr>
                        <th>Registro_ANS</th>
                        <th>CNPJ</th>
                        <th>Razao_Social</th>
                        <th>Nome_Fantasia</th>
                        <th>Modalidade</th>
                        <th>Logradouro</th>
                        <th>Numero</th>
                        <th>Complemento</th>
                        <th>Bairro</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>CEP</th>
                        <th>DDD</th>
                        <th>Telefone</th>
                        <th>Fax</th>
                        <th>Endereco_eletronico</th>
                        <th>Representante</th>
                        <th>Cargo_Representante</th>
                        <th>Regiao_de_Comercializacao</th>
                        <th>Data_Registro_ANS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="operadora in operadorasData" :key="operadora.registroAns">
                        <td>{{ operadora.registroAns }}</td>
                        <td>{{ operadora.cnpj }}</td>
                        <td>{{ operadora.razaoSocial }}</td>
                        <td>{{ operadora.nomeFantasia }}</td>
                        <td>{{ operadora.modalidade }}</td>
                        <td>{{ operadora.logradouro }}</td>
                        <td>{{ operadora.numero }}</td>
                        <td>{{ operadora.complemento }}</td>
                        <td>{{ operadora.bairro }}</td>
                        <td>{{ operadora.cidade }}</td>
                        <td>{{ operadora.uf }}</td>
                        <td>{{ operadora.cep }}</td>
                        <td>{{ operadora.ddd }}</td>
                        <td>{{ operadora.telefone }}</td>
                        <td>{{ operadora.fax }}</td>
                        <td>{{ operadora.enderecoEletronico }}</td>
                        <td>{{ operadora.representante }}</td>
                        <td>{{ operadora.cargoRepresentante }}</td>
                        <td>{{ operadora.regiaoDeComercializacao }}</td>
                        <td>{{ operadora.dataRegistroAns }}</td>
                    </tr>
                </tbody>
            </table> 
        </div>
        
        <div class="pagination-controls" v-if="totalItems > itemsPerPage">
            <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="pagination-btn">Anterior</button>
            
            <span class="page-info">
                Página {{ currentPage }} de {{ totalPages }}
            </span>
            
            <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            class="pagination-btn">Próxima</button>
            
            <select 
            v-model="itemsPerPage" 
            @change="handleItemsPerPageChange"
            class="page-select">
            <option value="10">10 itens</option>
            <option value="20">20 itens</option>
            <option value="50">50 itens</option></select>
        </div>
    </div>
</template>

<script setup lang="ts">
// Style
import './SearchByTermView.scss'

// Interfaces
import type { OperadoraInterface } from '../../../../types/Operadora';

// Services
import OperadorasService from '@/services/OperadorasService';

import { ref, computed } from 'vue';

const service = new OperadorasService();

const operadorasData = ref<OperadoraInterface[] | []>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const textTermInput = ref('');
const inputError = ref<string | null>(null);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));

function validateInput() {
    if (!textTermInput.value.trim()) {
        inputError.value = 'Por favor, digite um termo textual';
        return false;
    }
    
    inputError.value = null;
    return true;
}

async function handleSearch() {
    if (!validateInput()) return;
    
    currentPage.value = 1;
    await fetchOperadoras();
}

async function fetchOperadoras() {
    loading.value = true;
    error.value = null;
    
    try {
        const { data, total } = await service.getOperadorasByTextTerm(
        textTermInput.value.trim(),
        currentPage.value,
        itemsPerPage.value
        );
        
        operadorasData.value = data;
        totalItems.value = total;
    } catch (err) {
        error.value = 'Erro ao buscar operadoras. Tente novamente.';
        console.error('Erro:', err);
    } finally {
        loading.value = false;
    }
}

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchOperadoras();
    }
}

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
        fetchOperadoras();
    }
}

function handleItemsPerPageChange() {
    currentPage.value = 1;
    fetchOperadoras();
}
</script>