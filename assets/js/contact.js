// ===== CONTACT FORM JAVASCRIPT =====

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = null;
        this.originalBtnText = '';
        this.isSubmitting = false;
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.submitBtn = this.form.querySelector('button[type="submit"]');
        this.originalBtnText = this.submitBtn.innerHTML;
        
        this.setupEventListeners();
        this.setupValidation();
        this.initEmailJS();
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Validação em tempo real
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    // ===== FORM SUBMISSION =====
    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting) return;
        
        if (!this.validateForm()) {
            this.showMessage('Por favor, corrija os erros antes de enviar.', 'error');
            return;
        }

        this.isSubmitting = true;
        this.setLoadingState(true);

        try {
            await this.sendEmail();
            this.showMessage('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            this.resetForm();
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            this.showMessage('Erro ao enviar mensagem. Tente novamente ou entre em contato pelo WhatsApp.', 'error');
        } finally {
            this.isSubmitting = false;
            this.setLoadingState(false);
        }
    }

    // ===== EMAIL SENDING =====
    initEmailJS() {
        // Configuração do EmailJS (substitua pelos seus IDs)
        // Para usar o EmailJS, você precisa:
        // 1. Criar conta em emailjs.com
        // 2. Configurar um serviço de email
        // 3. Criar um template
        // 4. Substituir os IDs abaixo
        
        if (typeof emailjs !== 'undefined') {
            emailjs.init("E3FqdvN35Qn3i7XIY"); // Substitua pela sua chave pública
        }
    }

    async sendEmail() {
        const formData = new FormData(this.form);
        const templateParams = {
            from_name: formData.get('nome'),
            from_email: formData.get('email'),
            subject: formData.get('assunto'),
            message: formData.get('mensagem'),
            to_name: 'Mr.IT'
        };

        // Se EmailJS estiver disponível, use-o
        if (typeof emailjs !== 'undefined') {
            return emailjs.send(
                'service_ejuw27g',    // Substitua pelo seu Service ID
                'template_6yuxdh4',   // Substitua pelo seu Template ID
                templateParams
            );
        } else {
            // Fallback: simular envio (para demonstração)
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('Email simulado enviado:', templateParams);
                    resolve();
                }, 1500);
            });
        }
    }

    // ===== FORM VALIDATION =====
    setupValidation() {
        // Configurar regras de validação
        this.validationRules = {
            nome: {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
                message: 'Nome deve conter apenas letras e ter pelo menos 2 caracteres'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Por favor, insira um email válido'
            },
            assunto: {
                required: true,
                minLength: 5,
                message: 'Assunto deve ter pelo menos 5 caracteres'
            },
            mensagem: {
                required: true,
                minLength: 10,
                message: 'Mensagem deve ter pelo menos 10 caracteres'
            }
        };
    }

    validateForm() {
        let isValid = true;
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        const rules = this.validationRules[fieldName];
        
        if (!rules) return true;
        
        // Limpar erros anteriores
        this.clearFieldError(field);
        
        // Validação obrigatória
        if (rules.required && !value) {
            this.showFieldError(field, 'Este campo é obrigatório');
            return false;
        }
        
        // Validação de comprimento mínimo
        if (rules.minLength && value.length < rules.minLength) {
            this.showFieldError(field, rules.message);
            return false;
        }
        
        // Validação de padrão
        if (rules.pattern && !rules.pattern.test(value)) {
            this.showFieldError(field, rules.message);
            return false;
        }
        
        // Se chegou até aqui, o campo é válido
        this.showFieldSuccess(field);
        return true;
    }

    showFieldError(field, message) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        
        // Remover mensagem de erro anterior
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Adicionar nova mensagem de erro
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-danger mt-1';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    showFieldSuccess(field) {
        field.classList.add('is-valid');
        field.classList.remove('is-invalid');
        this.clearFieldError(field);
    }

    clearFieldError(field) {
        field.classList.remove('is-invalid', 'is-valid');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // ===== UI FEEDBACK =====
    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.disabled = true;
            this.submitBtn.innerHTML = `
                <i class="fas fa-spinner fa-spin me-2"></i>
                Enviando...
            `;
            this.form.classList.add('loading');
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.innerHTML = this.originalBtnText;
            this.form.classList.remove('loading');
        }
    }

    showMessage(message, type = 'info') {
        // Remover mensagem anterior
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Criar nova mensagem
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message alert alert-${type === 'error' ? 'danger' : 'success'} mt-3`;
        messageDiv.style.animation = 'fadeInUp 0.5s ease';
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'} me-2"></i>
            ${message}
        `;

        this.form.appendChild(messageDiv);

        // Remover mensagem após 5 segundos
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.animation = 'fadeOut 0.5s ease';
                setTimeout(() => {
                    messageDiv.remove();
                }, 500);
            }
        }, 5000);

        // Scroll para a mensagem
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    resetForm() {
        this.form.reset();
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            this.clearFieldError(input);
        });
    }

    // ===== UTILITY METHODS =====
    sanitizeInput(input) {
        return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }

    formatPhoneNumber(phone) {
        // Remover caracteres não numéricos
        const cleaned = phone.replace(/\D/g, '');
        
        // Formatar como (XX) XXXXX-XXXX
        if (cleaned.length === 11) {
            return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
        
        return phone;
    }
}

// ===== WHATSAPP INTEGRATION =====
class WhatsAppIntegration {
    constructor() {
        this.init();
    }

    init() {
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
        whatsappLinks.forEach(link => {
            link.addEventListener('click', (e) => this.trackWhatsAppClick(e, link));
        });
    }

    trackWhatsAppClick(event, link) {
        // Analytics tracking (se necessário)
        console.log('WhatsApp link clicked:', link.href);
        
        // Adicionar animação de feedback
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = 'scale(1)';
        }, 150);
    }

    openWhatsApp(message = '') {
        const phoneNumber = '5511997274119'; // Número do WhatsApp
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url, '_blank');
    }
}

// ===== SOCIAL MEDIA INTEGRATION =====
class SocialMediaIntegration {
    constructor() {
        this.init();
    }

    init() {
        this.setupSocialLinks();
        this.setupShareButtons();
    }

    setupSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link, .social-link-contact');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => this.trackSocialClick(e, link));
        });
    }

    setupShareButtons() {
        // Adicionar botões de compartilhamento se necessário
        const shareData = {
            title: 'Mr.IT - Desenvolvedor Front-end',
            text: 'Confira o portfólio do Mr.IT, desenvolvedor front-end especializado em tecnologias web modernas.',
            url: window.location.href
        };

        // Web Share API (se suportada)
        if (navigator.share) {
            const shareBtn = document.createElement('button');
            shareBtn.className = 'btn btn-outline-light btn-sm';
            shareBtn.innerHTML = '<i class="fas fa-share-alt me-2"></i>Compartilhar';
            shareBtn.addEventListener('click', () => {
                navigator.share(shareData);
            });
            
            // Adicionar botão em local apropriado
            const heroButtons = document.querySelector('.hero-buttons');
            if (heroButtons) {
                heroButtons.appendChild(shareBtn);
            }
        }
    }

    trackSocialClick(event, link) {
        const platform = this.getSocialPlatform(link.href);
        console.log(`Social link clicked: ${platform}`);
        
        // Adicionar animação de feedback
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = 'scale(1)';
        }, 150);
    }

    getSocialPlatform(url) {
        if (url.includes('whatsapp') || url.includes('wa.me')) return 'WhatsApp';
        if (url.includes('github')) return 'GitHub';
        if (url.includes('linkedin')) return 'LinkedIn';
        if (url.includes('instagram')) return 'Instagram';
        if (url.includes('twitter')) return 'Twitter';
        return 'Unknown';
    }
}

// ===== CSS ADICIONAL =====
const contactCSS = `
.form-control.is-invalid {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.form-control.is-valid {
    border-color: #28a745;
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}

.error-message {
    animation: fadeInUp 0.3s ease;
}

.form-message {
    border-radius: 10px;
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@keyframes fadeOut {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-10px);
    }
}

.loading {
    position: relative;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    z-index: 1;
}
`;

// Adicionar CSS ao documento
const contactStyle = document.createElement('style');
contactStyle.textContent = contactCSS;
document.head.appendChild(contactStyle);

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
    new WhatsAppIntegration();
    new SocialMediaIntegration();
});

// ===== EXPORT =====
window.ContactForm = ContactForm;
window.WhatsAppIntegration = WhatsAppIntegration;
window.SocialMediaIntegration = SocialMediaIntegration;

