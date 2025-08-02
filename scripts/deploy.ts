import { ethers } from "hardhat";

async function main() {
  // Pega o contrato compilado "Guestbook" para preparar o deploy.
  const guestbookFactory = await ethers.getContractFactory("Guestbook");

  // Inicia o processo de deploy e espera ele ser publicado.
  console.log("Fazendo o deploy do contrato Guestbook...");
  const guestbook = await guestbookFactory.deploy();

  // Espera a confirmação de que o contrato foi publicado na blockchain.
  await guestbook.waitForDeployment();

  // Pega o endereço onde o contrato foi publicado.
  const contractAddress = await guestbook.getAddress();
  
  // Imprime o endereço no console. Guarde este endereço, vamos usá-lo!
  console.log(`Contrato "Guestbook" publicado com sucesso no endereço: ${contractAddress}`);
}

// Padrão recomendado para executar a função main e tratar erros.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});