import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:3030'
});

export default class Api {

    async cadastrarProduto(nomeProduto, categoria, precoDe, precoPor, avaliacao, descricao, estoque, imagem) {
        let cadastroJson = {
            nomeProduto: nomeProduto,
            categoria: categoria,
            precoDe: precoDe,
            precoPor: precoPor,
            avaliacao: avaliacao,
            descricao: descricao,
            estoque: estoque,
            imagem: imagem
        }

        let r = await api.post(`/produto`, cadastroJson );
        return r.data
    }

    async listarProdutos() {
        let listar = await api.get(`/produto`);
        return listar.data;
    }

    async removerProduto(id) {
        let remover = await api.delete(`/produto?idProduto=${id}`);
        return remover.data;
    }

    async alterarProduto(id, nomeProduto, categoria, precoDe, precoPor, avaliacao, descricao, estoque, imagem) {
        let alterar = await api.put(`/produto?idProduto=${id}`, {
            nomeProduto: nomeProduto,
            categoria: categoria,
            precoDe: precoDe,
            precoPor: precoPor,
            avaliacao: avaliacao,
            descricao: descricao,
            estoque: estoque,
            imagem: imagem
        });
        //console.log(alterar)
        return alterar.data;
    }
}
