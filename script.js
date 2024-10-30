$(document).ready(function () {
    // Efeito de rolagem suave ao clicar nos links do menu
    $("a.nav-link").click(function (e) {
      e.preventDefault();
      const target = $(this).attr("href");
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top - 70, // Ajuste para compensar a navbar fixa
        },
        800
      );
    });
  
    // Exibir mensagem de confirmação ao enviar o formulário
    $("form").on("submit", function (e) {
      e.preventDefault();
      alert("Obrigado por entrar em contato! Responderemos em breve.");
      $(this).trigger("reset");
    });
  });
  