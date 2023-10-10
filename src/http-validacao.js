import chalk from "chalk";

function extraiLinks(arrLinks) {
  return arrLinks.map((link) => Object.values(link).join());
}

async function checaStatus(arrURLs) {
  const arrStatus = await Promise.all(
    arrURLs.map(async (url) => {
      try {
        const response = await fetch(url);
        return response.status;
      } catch (err) {
        return manejaErros(err);
      }
    })
  );
  return arrStatus;
}

function manejaErros(erro) {
  if (erro.cause.code === "ENOTFOUND") {
    return "Link inexistente";
  } else {
    return "Ocorreu algum erro";
  }
}

export default async function listaValidada(listaDeLinks) {
  const links = extraiLinks(listaDeLinks);
  const status = await checaStatus(links);

  return listaDeLinks.map((objeto, index) => ({
    ...objeto,
    status: status[index],
  }));
}
