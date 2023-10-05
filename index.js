import fs from "fs";
import chalk from "chalk";

function trataErro(error) {
  console.log(error);
  throw new Error(chalk.red(error.code, "Não há arquivo no diretório"));
}

function extraiLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultado = capturas.map((captura) => ({
    [captura[1]]: captura[2],
  }));
  return resultado;
}

async function pegaArquivo(caminhoDoArquivo) {
  try {
    const encoding = "utf-8";
    const file = await fs.promises.readFile(caminhoDoArquivo, encoding);
    console.log(extraiLinks(file));
  } catch (erro) {
    trataErro(erro);
  }
}

pegaArquivo("./arquivos/texto.md");
