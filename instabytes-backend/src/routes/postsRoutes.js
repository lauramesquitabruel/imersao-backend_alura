import express from "express";
import multer from "multer";
import cors from "cors";
import {listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from "../controllers/postsController.js";

const constCors = {
    origin: "http://localhost:8000",
    optionSucessStatus: 200
}
const upload = multer({dest:"./uploads"});

const routes = (app) => {
    //transforma textos em json
    app.use(express.json());
    app.use(cors(constCors));

    //rotas
    app.get("/posts", listarPosts);

    app.post("/posts", postarNovoPost);

    //usa o multer para carreger imagens fora do banco
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost);
};

export default routes;