import type { Produto } from "./interfaces/Produto.js";
import { TV } from "./models/TV.js";
import { Celular } from "./models/Celular.js";
import { Bicicleta } from "./models/Bicicleta.js";
import { Carrinho } from "./models/Carrinho.js";

const carrinho =
  new Carrinho(
    crypto.randomUUID()
  );

const form =
  document.querySelector<HTMLFormElement>(
    "#productForm"
  )!;


const productType =
  document.querySelector<HTMLSelectElement>(
    "#productType"
  )!;


const modelInput =
  document.querySelector<HTMLInputElement>(
    "#model"
  )!;


const manufacturerInput =
  document.querySelector<HTMLInputElement>(
    "#manufacturer"
  )!;


const valueInput =
  document.querySelector<HTMLInputElement>(
    "#value"
  )!;

const tvFields =
  document.querySelector<HTMLElement>(
    "#tvFields"
  )!;


const resolutionInput =
  document.querySelector<HTMLInputElement>(
    "#resolution"
  )!;


const inchesInput =
  document.querySelector<HTMLInputElement>(
    "#inches"
  )!;


const cellphoneFields =
  document.querySelector<HTMLElement>(
    "#cellphoneFields"
  )!;


const memoryInput =
  document.querySelector<HTMLInputElement>(
    "#memory"
  )!;


const bikeFields =
  document.querySelector<HTMLElement>(
    "#bikeFields"
  )!;


const rimSizeInput =
  document.querySelector<HTMLInputElement>(
    "#rimSize"
  )!;


const productCount =
  document.querySelector<HTMLElement>(
    "#productCount"
  )!;


const cartTotal =
  document.querySelector<HTMLElement>(
    "#cartTotal"
  )!;


const productsList =
  document.querySelector<HTMLDivElement>(
    "#productsList"
  )!;


function atualizarCampos(): void {

  tvFields.hidden =
    true;

  cellphoneFields.hidden =
    true;

  bikeFields.hidden =
    true;


  if (
    productType.value === "tv"
  ) {

    tvFields.hidden =
      false;

  }

  if (
    productType.value === "celular"
  ) {

    cellphoneFields.hidden =
      false;

  }


  if (
    productType.value === "bicicleta"
  ) {

    bikeFields.hidden =
      false;

  }

}


function atualizarEstatisticas(): void {

  productCount.textContent =
    String(
      carrinho.getNumProdutos()
    );


  cartTotal.textContent =
    carrinho
      .getValorTotal()
      .toLocaleString(
        "pt-BR",
        {
          style: "currency",
          currency: "BRL"
        }
      );

}

function criarElementoProduto(
  produto: Produto
): HTMLDivElement {

  const produtoDiv =
    document.createElement(
      "div"
    );


  produtoDiv.classList.add(
    "product"
  );


  const tipo =
    document.createElement(
      "h3"
    );


  tipo.textContent =
    `${produto.getTipo()} - ${produto.getModelo()}`;


  const fabricante =
    document.createElement(
      "p"
    );


  fabricante.textContent =
    `Fabricante: ${produto.getFabricante()}`;


  const detalhes =
    document.createElement(
      "p"
    );


  detalhes.textContent =
    produto.getDetalhes();


  const valor =
    document.createElement(
      "p"
    );


  valor.textContent =
    produto
      .getValor()
      .toLocaleString(
        "pt-BR",
        {
          style: "currency",
          currency: "BRL"
        }
      );


  produtoDiv.append(
    tipo,
    fabricante,
    detalhes,
    valor
  );


  return produtoDiv;

}


productType.addEventListener(
  "change",
  () => {

    atualizarCampos();

  }
);


form.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    const modelo =
      modelInput.value.trim();


    const fabricante =
      manufacturerInput.value.trim();


    const valor =
      valueInput.valueAsNumber;


    if (
      modelo === "" ||
      fabricante === ""
    ) {

      alert(
        "Preencha os campos obrigatórios."
      );

      return;

    }


    if (
      Number.isNaN(valor) ||
      valor <= 0
    ) {

      alert(
        "Informe um valor válido."
      );

      return;

    }


    let produto: Produto;

    if (
      productType.value === "tv"
    ) {

      const resolucao =
        resolutionInput.value.trim();


      const polegadas =
        inchesInput.valueAsNumber;


      if (
        resolucao === "" ||
        Number.isNaN(polegadas) ||
        polegadas <= 0
      ) {

        alert(
          "Preencha os dados da TV."
        );

        return;

      }


      produto =
        new TV(
          crypto.randomUUID(),
          modelo,
          resolucao,
          polegadas,
          fabricante,
          valor
        );

    }

    else if (
      productType.value === "celular"
    ) {

      const memoria =
        memoryInput.valueAsNumber;


      if (
        Number.isNaN(memoria) ||
        memoria <= 0
      ) {

        alert(
          "Informe a memória do celular."
        );

        return;

      }


      produto =
        new Celular(
          crypto.randomUUID(),
          modelo,
          memoria,
          fabricante,
          valor
        );

    }

    else {

      const aro =
        rimSizeInput.valueAsNumber;


      if (
        Number.isNaN(aro) ||
        aro <= 0
      ) {

        alert(
          "Informe o tamanho do aro."
        );

        return;

      }


      produto =
        new Bicicleta(
          crypto.randomUUID(),
          modelo,
          aro,
          fabricante,
          valor
        );

    }


    carrinho.adicionarProduto(
      produto
    );


    const produtoElement =
      criarElementoProduto(
        produto
      );


    productsList.appendChild(
      produtoElement
    );


    atualizarEstatisticas();


    form.reset();


    atualizarCampos();

  }
);

atualizarCampos();

atualizarEstatisticas();