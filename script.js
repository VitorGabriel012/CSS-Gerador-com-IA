/* 
    Variável - Pedacinho de memória que eu posso guardar o que eu quiser

    let nome = "Vitor"
    alert (nome)       - vai aparecer um alerta assim que abrir a pagina.


    let nome = "Vitor"
    console.log (nome)  -   esse já vai aparecer no console do inspecionar


    //
    Função - Pedacinho de código que só EXECUTA quando é chamado
    Algoritmo - Receita do bolo
    Lógica de programação - Fazer o bolo

    //RECEITA
    [x] saber quem é o botão
    [x] saber quando o botão foi clicado
    [x] saber quem é o textarea
    [x] pegar o que tem dentro dele
    [x] enviar para IA
    [x] pegar a resposta da IA e colocar na tela  
    [x] Estilizar  f
     
    // Ir no HTML e pegar o botão
    // HTML = document (documento)
    // Selecionar (querySelector)
    // Quem ? Botao
    // Apelido para o botão - classes(class)
    // Frtch - ferramenta de JS para se comunicar com o servidor 

*/ 

//Descobri o que é o botão
let  botao = document.querySelector(".botao-gerar")
let chave = "SUA_API_KEY_AQUI"
let endereco = "https://api.groq.com/openai/v1/chat/completions"

//Criei a funcao que será chamada quando clicar no botao
// async/await(espere)
async function gerarCodigo(){
    //value = valor
    let textoUsuario = document.querySelector(".caixa-texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let resultadoCodigo = document.querySelector(".resultado-codigo")

    
    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer SUA_API_KEY_AQUI"
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages:[{
                role: "system",
                content: "Você é um gerador de código HTML e CSS, Responda somente com código puro. Nunca use crases, markdown ou explicações. Formato: primeio <style> com o CSS, depois o HTML. Siga EXATAMENTE o que o usuário pedir. Se pedir algo quicando, use translatey no @keyframes. Se pedir algo girando, use rotate. " 
            },
            {
                role: "user",
                content: textoUsuario
            }
        ]
        })

    })

    let dados = await resposta.json()
    let resultado = dados.choices[0].message.content
        
    blocoCodigo.textContent = resultado
    resultadoCodigo.srcdoc = resultado

}


 
//Ficar de olho no botao, quando clicardo chamar gerarcodigo
botao.addEventListener("click", gerarCodigo)




// Vizinho curioso (addEventListener)
// adicionar ouvinte de evento - tradução
// Evento = clique, digitei...