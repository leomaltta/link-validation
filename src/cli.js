import pegaArquivo from "./index.js";
import chalk from "chalk";
import fs from "fs";
import listaValidada from "./http-validacao.js";

const path = process.argv;

async function imprimeLinks(valida, resultado, fileName) {
  if (valida) {
    console.log(
      chalk.yellow(" Lista de links do arquivo: "),
      chalk.magenta(fileName),
      await listaValidada(resultado)
    );
  } else {
    console.log(
      chalk.yellow(" Lista de links do arquivo: "),
      chalk.magenta(fileName),
      resultado
    );
  }
}

async function processaTexto(args) {
  const path = args[2];
  const valida = args[3] === "--valida";

  try {
    fs.lstatSync(path);
  } catch (erro) {
    if (erro.code === "ENOENT") {
      console.log(chalk.red("Arquivo ou diretório não existe"));
      return;
    }
  }

  if (fs.lstatSync(path).isFile()) {
    const resultado = await pegaArquivo(path);
    imprimeLinks(valida, resultado, path);
  } else if (fs.lstatSync(path).isDirectory()) {
    const arquivos = await fs.promises.readdir(path);
    arquivos.forEach(async (arquivo) => {
      const lista = await pegaArquivo(`${path}/${arquivo}`);
      imprimeLinks(valida, lista, arquivo);
    });
  }
}

processaTexto(path);
