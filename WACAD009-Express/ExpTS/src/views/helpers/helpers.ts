interface Prof {
  name: string;
  room: number;
}

function printProfs(profs: Prof[]) {
  return `<ul>${profs.map((p) => `<li>${p.name}-${p.room}</li>`).join('')}</ul>`;
}

export default { printProfs };
