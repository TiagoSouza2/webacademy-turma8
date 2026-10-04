import {type Request, type Response} from "express"
import { loremIpsum } from 'lorem-ipsum';

const index = (req: Request, res: Response) => {
  res.statusCode = 200;

  res.json({
    name: 'Universidade Federal do Amazonas',
    fundation: 2011,
  });
}

const about = (req: Request, res: Response) => {
  res.send('About');
}

const lorem = (req: Request, res: Response) => {
  const quantidade = Number(req.params.quantidade);

  if (
    Number.isNaN(quantidade) ||
    !Number.isInteger(quantidade) ||
    quantidade <= 0
  ) {
    return res.status(400).send('Informe uma quantidade válida de parágrafos.');
  }

  const texto = loremIpsum({
    count: quantidade,
    format: 'html',
    units: 'paragraphs',
    paragraphLowerBound: 3,
    paragraphUpperBound: 7,
    sentenceLowerBound: 5,
    sentenceUpperBound: 15,
  });

  return res.send(texto);
}

const hb1 =  (req: Request, res: Response) => {
  const ufam = 'Universidade Federal do Amazonas';
  res.render('hb1', {
    mensagem: 'Olá!',
    layout: false,
    ufam,
  });
}

const hb2 = (req: Request, res: Response) => {
    res.render('hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
        layout: false,
    });
}

const hb3 = (req: Request, res: Response) => {
  const profes = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 },
  ];
  res.render('hb3', { profes, layout: false });
}

const hb4 = (req: Request, res: Response) => {
  const profs = [
    { name: 'David Fernandes', room: 1238 },
    { name: 'Horácio Fernandes', room: 1233 },
    { name: 'Edleno Moura', room: 1236 },
    { name: 'Elaine Harada', room: 1231 },
  ];
  res.render('hb4', { profs, layout: false });
}


export default { index, lorem, hb1, hb2, hb3, hb4, about}