
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

        let cadastroALuno = await db.tb_matricula.create({

            nm_produto: requerimento.nomeProduto,
            ds_categoria: requerimento.categoria,
            vl_preco_de: requerimento.precoDe,
            vl_preco_por: requerimento.precoPor,
            vl_avaliacao: requerimento.avaliacao,
            ds_produto: requerimento.descricao,
            qtd_estoque: requerimento.estoque,
            img_produto: requerimento.imagem,
            bt_ativo: true,
            dt_inclusao: new Date()

        })
        resp.send({status: "Post da matricula realizado com sucesso!"})
    } catch (error) {
        resp.send(toString(error))
    }
});

app.delete('/produto', async (req, resp) => {
    try {
        let id = req.query.idMatricula;
        let deletar = await db.tb_matricula.destroy({ where: { id_produto: id } } );
        resp.sendStatus(200);
    } catch (error) {
        resp.send(error.toString())
    }
});



app.put('/matricula', async (req, resp) => {
    try {
        let requerimento = req.body;
        let id = req.query.idMatricula;
        let cadastroALuno = await db.tb_matricula.update({

            nm_produto: requerimento.nomeProduto,
            ds_categoria: requerimento.categoria,
            vl_preco_de: requerimento.precoDe,
            vl_preco_por: requerimento.precoPor,
            vl_avaliacao: requerimento.avaliacao,
            ds_produto: requerimento.descricao,
            qtd_estoque: requerimento.estoque,
            img_produto: requerimento.imagem,
            bt_ativo: true,
            dt_inclusao: new Date()
        },
        {
            where: { id_produto: id }
        })
        
        resp.sendStatus(200)
    } catch (error) {
        resp.send(toString(error))
    }
});



app.listen(process.env.PORT,
    x => console.log(`Servidou rodou caminhão virou!" ${process.env.PORT}`))