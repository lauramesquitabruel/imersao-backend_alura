//indica que se utiliza o express
import express from "express";
import routes from "./src/routes/postsRoutes.js"

//o app representa o servidor
const app = express();
routes(app);

app.listen(3000, () => {
    console.log("servidor escutando");
});

/*app.get("/post/:id", (req, res) => {
    //obtém o parâmento dinâmico
    res.status(200).json(posts[req.params.id]);
});

function buscarPorId(id){
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
};

app.get("/posts/:id", (req, res) => {
    const index = buscarPorId(req.params.id);
    res.status(200).json(posts[index]);
});*/
