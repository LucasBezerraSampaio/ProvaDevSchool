
import db from './db.js';
import express from 'express'
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());


app.get('/produto', async (req, resp) => {
    try {
        let consultarInformacoes = await db.tb_produto.findAll();
        resp.send(consultarInformacoes);

    } catch (erro) {
        resp.send( {mensagem: {erro} });
    }
});

app.post('/produto', async (req, resp) => {
    try {
        
        let requerimento = req.body;
        let nome = await db.tb_produto.findOne({ where: { nm_produto: requerimento.nomeProduto } })
        if (nome != null)
            return resp.send({ erro: "Nome do produto já existe!" })
       

        let cadastroALuno = await db.tb_produto.create({

            nm_produto: requerimento.nomeProduto,
            ds_categoria: requerimento.categoria,
            vl_preco_de: requerimento.precoDe,
            vl_preco_por:  requerimento.precoPor,
            vl_avaliacao: requerimento.avaliacao,
            ds_produto: requerimento.descricao,
            qtd_estoque: requerimento.estoque,
            img_produto: requerimento.img,
            bt_ativo: true,
            dt_inclusao: new Date()

        })
        resp.send(cadastroALuno) 

        
    } catch (erro) {
        return resp.send({ error: erro.toString() })
    }
});

app.delete('/produto', async (req, resp) => {
    try {
        let id = req.query.idProduto;
        let deletar = await db.tb_produto.destroy({ where: { id_produto: id } } );
        resp.send({Status: "Delete realizado com sucesso!"});
    } catch (error) {
        resp.send(error.toString())
    }
});


app.put('/produto', async (req, resp) => {

    try {
        let id = req.query.idProduto;
        let requerimento = req.body;

        let r = await db.tb_produto.update(

            {
                nm_produto: requerimento.nomeProduto,
                ds_categoria: requerimento.categoria,
                vl_preco_de: requerimento.precoDe,
                vl_preco_por:  requerimento.precoPor,
                vl_avaliacao: requerimento.avaliacao,
                ds_produto: requerimento.descricao,
                qtd_estoque: requerimento.estoque,
                img_produto: requerimento.imagem,
                bt_ativo: true,
                dt_inclusao: new Date()
            },
            {
                where: { id_produto: id }
            });

        resp.send({Status: "Put realizado com sucesso!"});


    } catch (erro) {
        resp.send({erro: 'Não pode conter caracteres os campos: Avaliação, PrecoDe, PrecoPor && Estoque'});
    }


})


app.listen(process.env.PORT,
    x => console.log(`Servidou rodou caminhão virou!" ${process.env.PORT}`))