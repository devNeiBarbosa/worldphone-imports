document.addEventListener('DOMContentLoaded', function () {
  emailjs.init("jkB5CHRiHgFKdHByN");

  class NotificationManager {
    static show(message, type = 'success') {
      const container = document.getElementById('notification-container');
      const notification = document.createElement('div');

      let icon = '';
      switch (type) {
        case 'warning':
          icon = '!';
          break;
        case 'error':
          icon = '✕';
          break;
        case 'success':
          icon = '✓';
          break;
      }

      notification.className = `notification ${type}`;
      notification.innerHTML = `
            <div class="notification-icon">${icon}</div>
            <div class="notification-content">${message}</div>
            <button class="notification-close">✕</button>
            <div class="notification-progress"></div>
        `;

      container.appendChild(notification);

      const timeout = setTimeout(() => {
        this.remove(notification);
      }, 5000);

      const closeButton = notification.querySelector('.notification-close');
      closeButton.addEventListener('click', () => {
        this.remove(notification);
      });

      const progress = notification.querySelector('.notification-progress');
      notification.addEventListener('mouseenter', () => {
        progress.style.animationPlayState = 'paused';
      });

      notification.addEventListener('mouseleave', () => {
        progress.style.animationPlayState = 'running';
      });
    }

    static remove(notification) {
      notification.style.animation = 'slideOut 0.5s ease-out';
      notification.remove();
    }
  }

  const formElement = document.getElementById("contact");

  if (!formElement) {
    console.error("Formulário não encontrado!");
    return;
  }

  formElement.addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validação básica
    if (!name || !email || !telefone || !message) {
      NotificationManager.show('Por favor, preencha todos os campos obrigatórios.', 'warning');
      return false;
    }

    const submitButton = formElement.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';
    }

    emailjs.send("service_za4aivk", "template_x61afyb", {
      name,
      email,
      telefone,
      message
    }).then(function (response) {
      console.log("SUCCESS!", response.status, response.text);
      NotificationManager.show('Mensagem enviada com sucesso!', 'success');

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("telefone").value = "";
      document.getElementById("message").value = "";
    }).catch(function (error) {
      console.log("FAILED...", error);
      NotificationManager.show('Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
    }).finally(function () {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar';
      }
    });

    return false;
  });
});