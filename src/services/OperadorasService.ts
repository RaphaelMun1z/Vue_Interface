// Interfaces
import type { OperadoraInterface } from "@/types/Operadora";
import api from "@/config/axios-config";
import type { AxiosResponse } from "axios";

interface ApiResponse<T = OperadoraInterface> {
    success: boolean;
    data: T;
    message: string;
    total?: number;
    page?: number;
    per_page?: number; 
}

export default class OperadorasService {
    async getOperadorasByAnsRegister(ansRegister: string): Promise<OperadoraInterface | null> {
        try {
            const response: AxiosResponse<ApiResponse<OperadoraInterface>> = await api.get(
                `/operadora/search-ans-register/?registroAns=${ansRegister}`
            );
            
            return response.data.data;
        } catch (error) {
            console.error('Erro ao buscar operadora:', error);
            throw error;
        }
    }
    
    async getOperadorasByTextTerm(term: string, page: number = 1, perPage: number = 10): Promise<{ data: OperadoraInterface[]; total: number }> {
        try {
            const response: AxiosResponse<ApiResponse<OperadoraInterface[]>> = await api.get(
                `/operadora/search-term/`, 
                {
                    params: {
                        term,
                        page,
                        per_page: perPage
                    }
                }
            );
            
            if (!response.data.total) {
                throw new Error('A API não retornou o total de itens');
            }
            
            return {
                data: response.data.data,
                total: response.data.total
            };
        } catch (error) {
            console.error('Erro ao buscar operadoras:', error);
            throw error;
        }
    }
}