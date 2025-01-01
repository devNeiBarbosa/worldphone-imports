const API_KEY = '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';

const chatContainer = document.querySelector('#chat-container');
const inputField = document.querySelector('#user-input');
const sendButton = document.querySelector('#send-button');

const faqs = {
  'os produtos são originais e possuem garantia?': 'Sim, todos os nossos produtos são 100% originais, lacrados de fábrica e acompanham nota fiscal. Oferecemos garantia de 1 ano para smartphones e 3 meses para acessórios.',
  'quais são as formas de pagamento disponíveis?': 'Aceitamos pagamentos via Pix, cartão de crédito, débito e boleto bancário. As compras podem ser parceladas em até 12 vezes sem juros, dependendo do valor e da operadora do cartão.',
  'qual é o prazo de entrega e o custo do frete?': 'O prazo de entrega varia entre 5 a 15 dias úteis, dependendo da sua região. O custo do frete é calculado com base no seu CEP e será informado no momento da compra.',
  'como posso rastrear meu pedido?': 'Após a confirmação do pagamento e o envio do produto, você receberá um código de rastreamento por e-mail, permitindo acompanhar a entrega pelo site da transportadora.',
  'posso devolver ou trocar um produto?': 'Sim, conforme o Código de Defesa do Consumidor, você tem até 7 dias após o recebimento para solicitar a devolução ou troca do produto por arrependimento. O item deve estar em perfeitas condições, com embalagem original e todos os acessórios.',
  'como posso ter certeza de que estou comprando em uma loja confiável?': 'Verifique se a loja possui CNPJ, endereço físico, canais de atendimento ao cliente e avaliações de outros consumidores. Nossa empresa está há mais de 5 anos no mercado, com milhares de clientes satisfeitos.',
  'é seguro comprar online com vocês?': 'Sim, nossa loja online é totalmente confiável, com mais de 5 anos de credibilidade no mercado. Enviamos todos os produtos com nota fiscal e garantia, assegurando uma compra sem riscos para o consumidor.'
};

function disableButtonContainer(container) {
  const buttons = container.querySelectorAll('button:not(.whatsapp-button):not(.restart-button)');
  buttons.forEach(button => {
    button.disabled = true;
    button.classList.add('disabled');
  });
}

function addMessage(message, sender, options = []) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.textContent = message;
  chatContainer.appendChild(messageElement);

  if (options.length > 0) {
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');
    options.forEach(option => {
      const optionButton = document.createElement('button');
      optionButton.classList.add('option-button');
      optionButton.textContent = option;
      optionButton.addEventListener('click', () => {
        disableButtonContainer(optionsContainer);
        handleOptionClick(option);
      });
      optionsContainer.appendChild(optionButton);
    });
    chatContainer.appendChild(optionsContainer);
  }

  chatContainer.scrollTop = chatContainer.scrollHeight;
  setTimeout(() => inputField.focus(), 100);
}

function showTypingIndicator(show) {
  let typingIndicator = document.querySelector('.typing-indicator');
  if (show) {
    if (!typingIndicator) {
      typingIndicator = document.createElement('div');
      typingIndicator.classList.add('typing-indicator');
      typingIndicator.textContent = 'Digitando...';
      chatContainer.appendChild(typingIndicator);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  } else {
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
  setTimeout(() => inputField.focus(), 100);
}

function handleOptionClick(option) {
  addMessage(option, 'user');

  setTimeout(() => {
    showTypingIndicator(true);
  }, 500);

  setTimeout(() => {
    if (option.toLowerCase() === 'sim') {
      handleYesResponse();
    } else if (option.toLowerCase() === 'não') {
      handleNoResponse();
    } else if (faqs[option.toLowerCase()]) {
      addMessage(faqs[option.toLowerCase()], 'bot');
      askIfResolved();
    }
    showTypingIndicator(false);
    setTimeout(() => inputField.focus(), 100);
  }, 2500);
}

function askIfResolved() {
  setTimeout(() => {
    showTypingIndicator(true);
  }, 500);

  setTimeout(() => {
    const yesNoContainer = document.createElement('div');
    yesNoContainer.classList.add('options-container');
    const options = ['Sim', 'Não'];
    
    addMessage('O seu problema foi resolvido?', 'bot', options);
    showTypingIndicator(false);
    setTimeout(() => inputField.focus(), 100);
  }, 2000);
}

function handleYesResponse() {
  setTimeout(() => {
    showTypingIndicator(true);
  }, 500);

  setTimeout(() => {
    addMessage('Por favor, avalie sua experiência de 0 a 10, com base no seu nível de satisfação.', 'bot');
    const ratingContainer = document.createElement('div');
    ratingContainer.classList.add('rating-buttons-container');
    
    for (let i = 0; i <= 10; i++) {
      const ratingButton = document.createElement('button');
      ratingButton.classList.add('rating-button');
      ratingButton.textContent = i;
      ratingButton.addEventListener('click', () => {
        disableButtonContainer(ratingContainer);
        handleRating(i);
      });
      ratingContainer.appendChild(ratingButton);
    }
    showTypingIndicator(false);
    chatContainer.appendChild(ratingContainer);
    setTimeout(() => inputField.focus(), 100);
  }, 1000);
}

function handleNoResponse() {
  setTimeout(() => {
    showTypingIndicator(true);
  }, 500);

  setTimeout(() => {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('options-container');
    
    const whatsappButton = document.createElement('button');
    whatsappButton.classList.add('whatsapp-button');
    whatsappButton.textContent = 'Falar com um atendente';
    whatsappButton.addEventListener('click', () => {
      window.open('https://wa.me/5511999999999', '_blank');
    });
    buttonContainer.appendChild(whatsappButton);
    chatContainer.appendChild(buttonContainer);
    showTypingIndicator(false);
    setTimeout(() => inputField.focus(), 100);
  }, 1000);

  setTimeout(() => {
    showTypingIndicator(true);
  }, 5000);

  setTimeout(() => {
    showTypingIndicator(false);
    addMessage('Sua sessão foi encerrada. Fale conosco novamente quando quiser!', 'bot');
    
    setTimeout(() => {
      const restartButton = document.createElement('button');
      restartButton.textContent = 'Reiniciar Conversa';
      restartButton.classList.add('restart-button');
      restartButton.addEventListener('click', resetChat);
      chatContainer.appendChild(restartButton);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      setTimeout(() => inputField.focus(), 100);
    }, 1000);
  }, 5500);
}

function handleRating(rating) {
  addMessage(`Minha avaliação: ${rating}`, 'user');

  setTimeout(() => {
    showTypingIndicator(true);
  }, 500);

  setTimeout(() => {
    addMessage(`Sua avaliação: ${rating}/10. Obrigado pelo seu feedback, ele é essencial para continuarmos melhorando!`, 'bot');
    showTypingIndicator(false);
    setTimeout(() => inputField.focus(), 100);
  }, 2000);

  setTimeout(() => {
    showTypingIndicator(true);
  }, 4500);

  setTimeout(() => {
    showTypingIndicator(false);
    addMessage('Sua sessão foi encerrada. Fale conosco novamente quando quiser!', 'bot');
    
    setTimeout(() => {
      const restartButton = document.createElement('button');
      restartButton.textContent = 'Reiniciar Conversa';
      restartButton.classList.add('restart-button');
      restartButton.addEventListener('click', resetChat);
      chatContainer.appendChild(restartButton);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      setTimeout(() => inputField.focus(), 100);
    }, 1000);
  }, 5000);
}

function resetChat() {
  chatContainer.innerHTML = '';
  window.firstMessageProcessed = false;
  addMessage('Digite algo para começar!', 'bot');
  setTimeout(() => inputField.focus(), 100);
}

async function sendMessageToChatGPT(message) {
  if (faqs[message.toLowerCase()]) {
    addMessage(faqs[message.toLowerCase()], 'bot');
    askIfResolved();
    return;
  }

  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  };

  const body = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: message }],
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      const reply = data.choices[0].message.content.trim();
      addMessage(reply, 'bot');
    } else {
      addMessage('Desculpe, não consegui processar sua solicitação.', 'bot');
    }
  } catch (error) {
    addMessage('Erro ao se comunicar com o chatbot. Tente novamente.', 'bot');
  }
  setTimeout(() => inputField.focus(), 100);
}

sendButton.addEventListener('click', () => {
  const userMessage = inputField.value.trim();
  if (userMessage) {
    addMessage(userMessage, 'user', []);
    inputField.value = '';

    setTimeout(() => {
      showTypingIndicator(true);
    }, 500);

    if (!window.firstMessageProcessed) {
      window.firstMessageProcessed = true;
      setTimeout(() => {
        addMessage('Olá! Como posso te ajudar? Selecione uma opção abaixo.', 'bot', Object.keys(faqs));
        showTypingIndicator(false);
        setTimeout(() => inputField.focus(), 100);
      }, 2500);
    } else {
      sendMessageToChatGPT(userMessage);
    }
  }
});

inputField.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    sendButton.click();
  }
});

window.onload = () => {
  addMessage('Digite algo para começar!', 'bot');
  setTimeout(() => inputField.focus(), 100);
};