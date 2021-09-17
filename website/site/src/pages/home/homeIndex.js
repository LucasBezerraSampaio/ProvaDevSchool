


import BarraLateral from '../../components/left-barcomponent';
import Cabecalho from '../../components/headercomponent'

import { Home } from './styled';
import { useEffect, useState, useRef } from 'react';
import Api from '../../service/api';
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import LoadingBar from 'react-top-loading-bar'

const api = new Api();



export default function HomePage() {
    const [nomeProduto, setNomeProduto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precoDe, setPrecoDe] = useState('');
    const [precoPor, setPrecoPor] = useState('');
    const [avaliacao, setAvaliacao] = useState('');
    const [descricao, setDescricao] = useState('');
    const [estoque, setEstoque] = useState('');
    const [imagem, setImagem] = useState('');
    
  
    const barraCarregamento= useRef(null);
    const [alterando, setAlterando] = useState(0);
    const [todosProdutos, setTodosProdutos] = useState([]);



    const verificarErro = (resp) => {
        if (!resp.situacao) 
            return true;
        toast.error(`${resp.situacao}`);
        return false;
        
    }

    useEffect(() => {
        getProdutos();
    }, [])

    const getProdutos = async () => {
        barraCarregamento.current.continuousStart();
        
        let x = await api.listarProdutos()
        setTodosProdutos(x)

        barraCarregamento.current.complete();
    }

    const deleteProdutos = async (info) => {

        confirmAlert({
            title: 'Remover Produto',
            message: `Certeza que deseja remover o produto ${info.nm_produto}?`,
            buttons: [
                {
                    label: 'sim',
                    onClick: async () => {
                        let x = await api.removerProduto(info.id_produto);
                        toast.success(`Produto ${info.nm_produto} removido!`);
                        getProdutos();
                    }
                },
                {
                    label: 'não'
                }
            ]
        });

        
    }

    const postProduto = async () => {
        
        
        if (alterando > 0) {
            let r = await api.alterarProduto(alterando, nomeProduto, categoria, precoDe, precoPor, avaliacao, descricao, estoque, imagem);
            if (r.erro)
                return toast.error(`Os campos Avaliação, PrecoDe, PrecoPor e Estoque não podem ser texto`)
            if (r.Status)
                return toast.error(`${r.Status}`)

            toast.success(`Produto ${nomeProduto} alterado!`)
           
            getProdutos();
            limparVariavel();
        } else {
           
            const y = await api.cadastrarProduto(nomeProduto, categoria, precoDe, precoPor, avaliacao, descricao, estoque, imagem);
            if (y.erro)
                return toast.error("Nome do produto já existe")
            if (y.error)
                return toast.error(`${y.error}`)
            if (y.Status)
                return toast.error(`${y.Status}`)
           
            toast.success(`Produto ${nomeProduto} Adicionado`);

            getProdutos();
            limparVariavel();
        }
        
        
       
       
    }


    const putProduto = async (info)  => {
        setAlterando(info.id_produto);
        setNomeProduto(info.nm_produto);
        setCategoria(info.ds_categoria);
        setPrecoDe(info.vl_preco_de);
        setPrecoPor(info.vl_preco_por);
        setAvaliacao(info.vl_avaliacao);
        setDescricao(info.ds_produto);
        setEstoque(info.qtd_estoque);
        setImagem(info.img_produto);

       console.log(info.ds_descricao)

    }
   
    const limparVariavel = () => {
        setAlterando(0);
        setNomeProduto('');
        setCategoria('');
        setPrecoDe('')
        setPrecoPor('');
        setAvaliacao('');
        setDescricao('');
        setEstoque('');
        setImagem('');

    }

    return (
        <Home>
            <ToastContainer />
            <BarraLateral />
            <LoadingBar color="#119FDC" ref={ barraCarregamento } />
            <div class="right-box">
                <Cabecalho recarregar={getProdutos}/>
                <div class="bottom-bar-right-header"></div>
                <div class="body-right-box">
                <div class="cadastrar-produto">
                    <div class="txt-produto">
                        <div class="barra-produto"></div>
                            <div class="oie">{ alterando > 0 ?`Alterando Produto ${nomeProduto}` :"Novo Produto" }</div>
                    </div>

                    <div class="box-inputs">
                        <div class="sub-box-inputs">
                            <div class="input-item">
                                Nome: <input type="text"    value={nomeProduto} onChange={ e => setNomeProduto(e.target.value)}/>
                            </div>
                            <div class="input-item">
                                Categoria: <input type="text"  value={categoria} onChange={ e => setCategoria(e.target.value)}/> 
                            </div>
                            <div class="input-item">
                                Avaliação: <input type="text"   value={avaliacao} onChange={ e => setAvaliacao(e.target.value)}/> 
                            </div>
                        </div>

                        <div class="sub-box-inputs">
                            <div class="input-item">
                                Preço DE: <input type="text"    value={precoDe} onChange={ e => setPrecoDe(e.target.value)} /> 
                            </div>
                            <div class="input-item">
                                Preço POR: <input type="text"   value={precoPor} onChange={ e => setPrecoPor(e.target.value)}/> 
                            </div>
                            <div class="input-item">
                                Estoque: <input type="text"     value={estoque} onChange={ e => setEstoque(e.target.value)}/> 
                            </div>
 
                        </div>
                    </div>
                    <div class="box-inputs2">
                    <div class="sub-box-inputs3">
                        <div class="input-item3">
                            Link imagem: <input type="text" value={imagem} onChange={ e => setImagem(e.target.value)}/> 
                        </div>
                        <div class="txt-item3">
                            <p>Descrição:</p> <textarea value={descricao} onChange={ e => setDescricao(e.target.value)}/>
                        </div>
                    </div>
                    <button onClick={postProduto}>{alterando > 0 ?"Alterar" :"Cadastrar" }</button>
                    </div>


                </div>
                    <div class="matriculed-stutents">
                    <div class="text-matriculed-students">
                        <div class="bar-matriculed"></div>
                        <div class="text-matriculed">Produtos Cadastrados</div>
                    </div>

                    <table class ="table-user">
                        <thead>
                                <tr>
                                <th></th>
                                <th > ID </th>
                                <th> Produto </th>
                                <th> Categoria </th>
                                <th> Preço </th>
                                <th> Estoque </th>
                                <th  className="classebotao"> </th>
                                <th className="classebotao"> </th>
                                
                            </tr>
                        </thead>
                        <tbody >
                            {todosProdutos.map((info, linha) => 
                                <tr className={linha % 2 === 0 ?`linha1` :`linha2`}>
                                    <td> <img src={info.img_produto} alt="" style={ {width: "55px", height: "55px", borderRadius: ".5em" } }/> </td>
                                    <td> {info.id_produto }</td>
                                    <td title={info.nm_produto}> {info.nm_produto != null && info.nm_produto.length >= 20
                                                                ? info.nm_produto.substr(0, 20) + "..."
                                                                :info.nm_produto} </td>
                                    <td> {info.ds_categoria} </td>
                                    <td> {info.vl_preco_por} </td>
                                    <td> {info.qtd_estoque}</td>
                                    <td className="classebotao"> <button onClick={() => putProduto(info)} style={{cursor: "pointer"}}> <img src="/assets/svgs/editiButton.svg" alt="" /> </button> </td>
                                    <td className="classebotao"> <button onClick={() => deleteProdutos(info)} style={{cursor: "pointer"}}> <img src="/assets/svgs/deleteButton.svg" alt="" /> </button> </td>
                                </tr>     
                           )}  
                        </tbody>
                    </table>
                </div>
                </div>



               


            </div>
        </Home>
            
    )
}