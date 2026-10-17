import { prisma } from "./prisma";

async function main() {
  const clientes = await prisma.cliente.findMany();
  console.log("Clientes cadastrados:", clientes);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });