const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const colorPicker = document.querySelector("#themeColor");

function ajustarCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

ajustarCanvas();

window.addEventListener("resize", ajustarCanvas);

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function velocidadeAleatoria() {

  let velocidade = random(-7, 7);

  while (velocidade === 0) {
    velocidade = random(-7, 7);
  }

  return velocidade;
}


function hexParaHSL(hex) {

  let r = parseInt(hex.substring(1, 3), 16) / 255;
  let g = parseInt(hex.substring(3, 5), 16) / 255;
  let b = parseInt(hex.substring(5, 7), 16) / 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);

  let h;
  let s;
  let l = (max + min) / 2;


  if (max === min) {

    h = 0;
    s = 0;

  } else {

    let diferenca = max - min;

    s =
      l > 0.5
        ? diferenca / (2 - max - min)
        : diferenca / (max + min);


    switch (max) {

      case r:

        h = (g - b) / diferenca;

        if (g < b) {
          h += 6;
        }

        break;


      case g:

        h = (b - r) / diferenca + 2;

        break;


      case b:

        h = (r - g) / diferenca + 4;

        break;
    }

    h /= 6;
  }


  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}


let corTema = hexParaHSL(colorPicker.value);


// Quando o usuário escolher outra cor
colorPicker.addEventListener("input", function () {

  corTema = hexParaHSL(colorPicker.value);

});


function criarCor(intensidade) {

  return `hsl(
    ${corTema.h},
    ${corTema.s}%,
    ${intensidade}%
  )`;

}

class Forma {

  constructor(x, y, velX, velY, tamanho) {

    this.x = x;
    this.y = y;

    this.velX = velX;
    this.velY = velY;

    this.tamanho = tamanho;
    this.intensidade = random(25, 80);
  }


  atualizar() {

    if (this.x + this.tamanho >= canvas.width) {

      this.velX = -this.velX;

    }

    if (this.x - this.tamanho <= 0) {

      this.velX = -this.velX;

    }

    if (this.y + this.tamanho >= canvas.height) {

      this.velY = -this.velY;

    }

    if (this.y - this.tamanho <= 0) {

      this.velY = -this.velY;

    }

    this.x += this.velX;
    this.y += this.velY;
  }


  detectarColisao(formas) {

    for (const outraForma of formas) {

      if (this !== outraForma) {

        const dx = this.x - outraForma.x;
        const dy = this.y - outraForma.y;

        const distancia = Math.sqrt(
          dx * dx + dy * dy
        );

        if (
          distancia <
          this.tamanho + outraForma.tamanho
        ) {

          this.intensidade = random(25, 80);
          outraForma.intensidade = random(25, 80);
        }
      }
    }
  }
}


class Circulo extends Forma {

  desenhar() {

    ctx.beginPath();

    ctx.fillStyle =
      criarCor(this.intensidade);

    ctx.arc(
      this.x,
      this.y,
      this.tamanho,
      0,
      2 * Math.PI
    );

    ctx.fill();
  }

}

class Quadrado extends Forma {

  desenhar() {

    ctx.fillStyle =
      criarCor(this.intensidade);


    ctx.fillRect(

      this.x - this.tamanho,

      this.y - this.tamanho,

      this.tamanho * 2,

      this.tamanho * 2
    );
  }

}


const formas = [];

const quantidadeFormas = 30;


while (formas.length < quantidadeFormas) {

  const tamanho = random(10, 25);


  const x = random(
    tamanho,
    canvas.width - tamanho
  );


  const y = random(
    tamanho,
    canvas.height - tamanho
  );


  const velX = velocidadeAleatoria();
  const velY = velocidadeAleatoria();


  const tipo = random(0, 1);


  if (tipo === 0) {

    formas.push(

      new Circulo(
        x,
        y,
        velX,
        velY,
        tamanho
      )

    );

  } else {

    formas.push(

      new Quadrado(
        x,
        y,
        velX,
        velY,
        tamanho
      )

    );
  }
}


function loop() {

  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  for (const forma of formas) {

    forma.desenhar();

    forma.atualizar();

    forma.detectarColisao(formas);
  }


  requestAnimationFrame(loop);
}


loop();