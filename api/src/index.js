
import db from './db.js';
import express from 'express'
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());


app.get('/produto', async (req, resp) => {
    try {
        let consultarInformacoes = await db.tb_produto.findAll({order: [['id_produto', 'desc']]});
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
            return resp.send({ erro: "Nome do produto já existe!" });
       
        if (requerimento.nomeProduto === '')
            return resp.send({ Status: 'O campo do nome do produto não pode ser nulo' });
        if (requerimento.categoria === '')
            return resp.send({ Status: 'O campo da categoria do produto não pode ser nulo' });
        if (requerimento.precoDe === '')
            return resp.send({ Status: 'O campo preço de do produto não pode ser nulo' });
        if (requerimento.precoPor === '')
            return resp.send({ Status: 'O campo preco por do produto não pode ser nulo' });
        if (requerimento.avaliacao === '')
            return resp.send({ Status: 'O campo da avaliação do produto não pode ser nulo' });
        if (requerimento.imagem === '')
            return resp.send({ Status: 'O campo da imagem do produto não pode ser nulo' });
        if (requerimento.descricao === '')
            return resp.send({ Status: 'O campo da descrição do produto não pode ser nulo' });
        if (requerimento.estoque === '')
            return resp.send({ Status: 'O campo do estoque do produto não pode ser nulo' });
        if (requerimento.precoDe < 0)
            return resp.send({ Status: 'O campo preço de do produto não pode ser menor que 0' });
        if (requerimento.precoPor < 0)
            return resp.send({ Status: 'O campo preço por do produto não pode ser menor que 0' });
        if (requerimento.estoque < 0)
            return resp.send({ Status: 'O campo do estoque do produto não pode ser menor que 0' });
        if (requerimento.avaliacao < 0)
            return resp.send({ Status: 'O campo da avaliação do produto não pode ser menor que 0' });
        
        if (!isNaN(requerimento.nomeProduto) || !isNaN(requerimento.categoria) || !isNaN(requerimento.descricao) || !isNaN(requerimento.imagem))
            return resp.send({ Status: 'O campo de Nome, Categoria, Descrição e Imagem não podem ser numero' });
        
        if (isNaN(requerimento.avaliacao) || isNaN(requerimento.precoDe) || isNaN(requerimento.precoPor) || isNaN(requerimento.estoque))
            return resp.send( {Status: 'Os campos Avaliação, PrecoDe, PrecoPor e Estoque não podem ser textos '})
       
           
        

        let cadastroALuno = await db.tb_produto.create({

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
         
        if (requerimento.nomeProduto === '')
            return resp.send({ Status: 'O campo do nome do produto não pode ser nulo' });
        if (requerimento.categoria === '')
            return resp.send({ Status: 'O campo da categoria do produto não pode ser nulo' });
        if (requerimento.precoDe === '')
            return resp.send({ Status: 'O campo preço de do produto não pode ser nulo' });
        if (requerimento.precoPor === '')
            return resp.send({ Status: 'O campo preco por do produto não pode ser nulo' });
        if (requerimento.avaliacao === '')
            return resp.send({ Status: 'O campo da avaliação do produto não pode ser nulo' });
        if (requerimento.imagem === '')
            return resp.send({ Status: 'O campo da imagem do produto não pode ser nulo' });
        if (requerimento.descricao === '')
            return resp.send({ Status: 'O campo da descrição do produto não pode ser nulo' });
        if (requerimento.estoque === '')
            return resp.send({ Status: 'O campo do estoque do produto não pode ser nulo' });
        if (requerimento.precoDe < 0)
            return resp.send({ Status: 'O campo preço de do produto não pode ser menor que 0' });
        if (requerimento.precoPor < 0)
            return resp.send({ Status: 'O campo preço por do produto não pode ser menor que 0' });
        if (requerimento.estoque < 0)
            return resp.send({ Status: 'O campo do estoque do produto não pode ser menor que 0' });
        if (requerimento.avaliacao < 0)
            return resp.send({ Status: 'O campo da avaliação do produto não pode ser menor que 0' });
        if (!isNaN(requerimento.nomeProduto) || !isNaN(requerimento.descricao) || !isNaN(requerimento.imagem) || !isNaN(requerimento.categoria))
            return resp.send({ Status: 'Os campos Nome, Descrição, Categoria e Imagem não pode ser números' });

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

        resp.send(r);


    } catch (erro) {
        resp.send({erro: erro.toString()});
    }


})


app.listen(process.env.PORT,
    x => console.log(`Servidou rodou caminhão virou!" ${process.env.PORT}`))