import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

//conecta com o bd
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

//retorna todos os posts armazenados em uma coleção do banco
export async function getTodosPosts(){
    const db = conexao.db("imersao_instabyte");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
};

//insere um novo post no bd
export async function criarPost(novoPost) {
    const db = conexao.db("imersao_instabyte");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
};

//atualiza um post recém criado
export async function atualizarPost(id, postAtualizado) {
    const db = conexao.db("imersao_instabyte");
    const colecao = db.collection("posts");
    //armazena o id do post a ser atualizado em um objeto espacial segundo a documentação do MongoDB
    const objetoID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objetoID)}, {$set: postAtualizado});
};