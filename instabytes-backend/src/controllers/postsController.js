import fs from "fs";
import {getTodosPosts, criarPost} from "../models/postsModel.js";

export async function listarPosts (req, res) {
    const resultado =  await getTodosPosts();
    res.status(200).json(resultado);
};

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    
    try{
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error("Erro criando post: " + erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};

export async function uploadImagem(req, res) {
    const novoPost = {
        desc: "",
        img_url: req.file.originalname,
        txt_alt: ""
    }
    
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
