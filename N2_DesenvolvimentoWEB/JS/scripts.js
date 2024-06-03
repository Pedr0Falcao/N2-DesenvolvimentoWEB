document.addEventListener('DOMContentLoaded', function() {
    // Validação e formatação do telefone
    document.getElementById('telefone').addEventListener('blur', function() {
        var telefone = this.value.replace(/\D/g, '');
        if(!(telefone.slice(0,2) == "55")) telefone = telefone.replace(/^(\d{2})(\d)/g, '55$1$2');
        telefone = telefone.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/g, '+$1 ($2) $3-$4').slice(0,19);
        this.value = telefone;
    });

    // Validação e formatação do CEP
    document.getElementById('cep').addEventListener('blur', function() {
        var cep = this.value.replace(/\D/g, '');
        if (cep.length === 7) {
            // Requisição AJAX para buscar o endereço com base no CEP
            fetch(`https://viacep.com.br/ws/${'0'+cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById('endereco').value = data.logradouro;
                        document.getElementById('bairro').value = data.bairro;
                        document.getElementById('cidade').value = data.localidade;
                        document.getElementById('estado').value = data.uf;
                    } else {
                        alert('CEP não encontrado.');
                    }
                })
                .catch(() => {
                    alert('Erro ao buscar o CEP.');
                });
        } else {
            alert('Formato de CEP inválido.');
        }
    });

    // Validação do e-mail
    document.getElementById('email').addEventListener('blur', function() {
        var email = this.value;
        var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (email && !regex.test(email)) {
            this.setCustomValidity('Por favor, insira um e-mail válido.');
        }
    });

    // Prevenir o envio do formulário com campos inválidos
    document.getElementById('pacienteForm').addEventListener('submit', function(event) {
        var isValid = true;
        this.querySelectorAll('input[required], select[required]').forEach(function(input) {
            if (!input.value) {
                isValid = false;
                alert('Por favor, preencha todos os campos obrigatórios.');
                return false; // sair do loop
            }
        });

        if (!isValid) {
            event.preventDefault();
        }
    });

    // Adicionando mensagens de aviso para campos fora do padrão
    var inputs = document.querySelectorAll('#rg,#cns, select');
    inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            if(this.value == ""){
                alert('Preencha o campo ' + this.name + ".")
            }
            else if (this.checkValidity() === false) {
                alert('O campo ' + this.name + ' está fora do padrão.');
            }
        });
    });
});
