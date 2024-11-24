import fs from "fs";
import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

//requisições

//lista todos os post armazenados no bd
export async function listarPosts (req, res) {
    const resultado =  await getTodosPosts();
    res.status(200).json(resultado);
};

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    //tenta criar um novo post
    try{
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error("Erro criando post: " + erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};

export async function uploadImagem(req, res) {
    //cria um novo post para ser armazenado
    const novoPost = {
        desc: "",
        img_url: req.file.originalname,
        txt_alt: ""
    }
    //tenta criar um novo post e renomear o arquivo salvo para o nome do id dele no bd 
    try{
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error("Erro criando post: " + erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    //possibilita acessar uma imagem da pasta upload pelo navegador
    //cria a url da imagem para o bd
    const urlImagem = `http://localhost:3000/${id}.png`;

    //tenta atualizar o post criado
    try{
        const bufferImagem = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(bufferImagem);
    
        //cria um novo post para ser armazenado
        const post = {
        img_url: urlImagem,
        desc: descricao,
        txt_alt: req.body.txt_alt
    }
        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error("Erro atualizando post: " + erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};