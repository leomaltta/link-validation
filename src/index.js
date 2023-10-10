import fs from "fs";
import chalk from "chalk";
import { captureRejectionSymbol } from "events";

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
  return resultado.length !== 0
    ? resultado
    : chalk.red("Não há links no arquivo");
}

async function pegaArquivo(caminhoDoArquivo) {
  try {
    const encoding = "utf-8";
    const file = await fs.promises.readFile(caminhoDoArquivo, encoding);
    return extraiLinks(file);
  } catch (erro) {
    trataErro(erro);
  }
}

export default pegaArquivo; // export
