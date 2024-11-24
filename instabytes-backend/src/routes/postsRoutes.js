import express from "express";
import multer from "multer";
import {listarPosts, postarNovoPost, uploadImagem} from "../controllers/postsController.js";

const upload = multer({dest:"./uploads"});
const routes = (app) => {
    //transforma textos em json
    app.use(express.json());

    app.get("/posts", listarPosts);

    app.post("/posts", postarNovoPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);
};

export default routes;