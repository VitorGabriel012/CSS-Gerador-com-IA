/*
📌 PROJETO: Gerador de CSS com IA

🧠 Conceitos usados:
- Variáveis: armazenam valores
- Funções: executam ações quando chamadas
- Eventos: ações do usuário (ex: clique)
- Fetch: comunicação com API externa

⚠️ IMPORTANTE:
Este código NÃO contém a API Key por segurança.
Para funcionar, adicione sua própria chave abaixo.
*/

// 🔘 Seleciona o botão no HTML
let botao = document.querySelector(".botao-gerar")

// 🔐 API Key (adicione a sua aqui para rodar localmente)
let chave = "SUA_API_KEY_AQUI"

// 🌐 Endpoint da API
let endereco = "https://api.groq.com/openai/v1/chat/completions"


// 🚀 Função executada ao clicar no botão
async function gerarCodigo(){

    // 📥 Pega o texto digitado pelo usuário
    let textoUsuario = document.querySelector(".caixa-texto").value

    // 📤 Onde o código será exibido
    let blocoCodigo = document.querySelector(".bloco-codigo")

    // 🖥️ Onde o preview será renderizado
    let resultadoCodigo = document.querySelector(".resultado-codigo")   

    try {
        // 🌐 Envia requisição para a API
        let resposta = await fetch(endereco, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

                // 🔐 Autenticação com API Key
                "Authorization": `Bearer ${chave}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: "Você é um gerador de código HTML e CSS. Responda somente com código puro. Nunca use markdown ou explicações. Primeiro <style> com CSS, depois HTML."
                    },
                    {
                        role: "user",
                        content: textoUsuario
                    }
                ]
            })
        })

        // 📦 Converte resposta para JSON
        let dados = await resposta.json()

        // 📄 Extrai o resultado gerado pela IA
        let resultado = dados.choices[0].message.content
        
        // 🧾 Exibe o código na tela
        blocoCodigo.textContent = resultado

        // 🖥️ Renderiza o preview
        resultadoCodigo.srcdoc = resultado

    } catch (erro) {
        console.error("Erro ao gerar código:", erro)
        blocoCodigo.textContent = "Erro ao gerar código. Verifique sua API Key."
    }
}


// 👀 Fica escutando o clique no botão
botao.addEventListener("click", gerarCodigo)