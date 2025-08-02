// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Guestbook
 * @dev Um contrato inteligente simples para um livro de visitas descentralizado.
 * Qualquer um pode deixar uma mensagem que ficará registrada permanentemente.
 */
contract Guestbook {

    // Um evento que será emitido toda vez que uma nova mensagem for deixada.
    // O frontend ficará "ouvindo" esse evento para atualizações em tempo real.
    event NewMessage(address indexed from, uint256 timestamp, string message);

    // Definimos uma estrutura (um "molde") para cada mensagem.
    // Isso ajuda a organizar os dados.
    struct Message {
        address sender;   // O endereço da carteira de quem enviou.
        string content;   // O conteúdo da mensagem.
        uint256 timestamp; // O carimbo de tempo de quando a mensagem foi registrada.
    }

    // Criamos um array público que irá armazenar todas as mensagens.
    // 'public' cria automaticamente uma função para ler o array.
    Message[] public messages;

    /**
     * @dev Deixa uma nova mensagem no livro de visitas.
     * @param _content O conteúdo da mensagem a ser armazenada.
     */
    function leaveMessage(string memory _content) public {
        // Adiciona uma nova 'Message' ao final do nosso array 'messages'.
        // msg.sender -> Endereço de quem está chamando a função.
        // block.timestamp -> O timestamp do bloco atual na blockchain.
        messages.push(Message(msg.sender, _content, block.timestamp));

        // Emite o evento para notificar o frontend que uma nova mensagem chegou.
        emit NewMessage(msg.sender, block.timestamp, _content);
    }

    /**
     * @dev Retorna todas as mensagens que já foram deixadas.
     * É uma função 'view', o que significa que ela apenas lê dados
     * e não gasta gás para ser chamada.
     */
    function getAllMessages() public view returns (Message[] memory) {
        return messages;
    }
}