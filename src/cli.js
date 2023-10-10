import pegaArquivo from "./index.js";
import chalk from "chalk";
import fs from "fs";

const path = process.argv;

function imprimeLinks(resultado, fileName) {
  console.log(
    chalk.yellow(" Lista de links do arquivo: "),
    chalk.magenta(fileName),
    resultado
  );
}

async function processaTexto(args) {
  const path = args[2];

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
    imprimeLinks(resultado, path);
  } else if (fs.lstatSync(path).isDirectory()) {
    const arquivos = await fs.promises.readdir(path);
    arquivos.forEach(async (arquivo) => {
      const lista = await pegaArquivo(`${path}/${arquivo}`);
      imprimeLinks(lista, arquivo);
    });
  }
}

processaTexto(path);
