// Aguarda o carregamento completo da página
window.addEventListener("DOMContentLoaded", function () {
  // Faz uma requisição fetch para obter o JSON da URL fornecida
  fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    .then((response) => response.json()) // Converte a resposta para JSON
    .then((data) => {
      const results = data.results // Obtém o array de resultados do JSON

      // Obtém a referência para a div que irá conter os Pokémons
      const pokemonList = document.getElementById("gen1")

      // Itera sobre cada objeto no array de resultados
      results.forEach((result) => {
        // Cria elementos HTML para exibir o nome e a imagem do Pokémon
        const div = document.createElement("div")
        const name = document.createElement("p")
        const img = document.createElement("img")
        const typesDiv = document.createElement("div")

        div.classList.add("pokemon")
        typesDiv.classList.add("types")

        // Define o texto do elemento name com o nome do Pokémon, que será modificado de acordo com a função modifyName()
        name.textContent = modifyName(result.name)

        function modifyName(name) {
          const femaleSymbol = " ♀"
          const maleSymbol = " ♂"
          if (name.includes("nidoran-f")) {
            name = name.replace(/-f/g, femaleSymbol)
          } else if (name.includes("nidoran-m")) {
            name = name.replace(/-m/g, maleSymbol)
          }
          name = name.charAt(0).toUpperCase() + name.slice(1)
          return name
        }
        // Faz uma requisição fetch para obter o JSON da URL do Pokémon
        fetch(result.url)
          .then((response) => response.json()) // Converte a resposta para JSON
          .then((pokemonData) => {
            // Obtém a URL da imagem front_default
            let imageUrl = pokemonData.sprites.other.home.front_default
            if (!imageUrl) {
              imageUrl =
                pokemonData.sprites.other["official-artwork"].front_default
            }

            // Define o atributo src da imagem com a URL obtida
            img.src = imageUrl
            // Obtém o array de tipos de Pokémon
            const pokemonTypes = pokemonData.types
            // Itera sobre cada objeto de tipo de Pokémon
            pokemonTypes.forEach((type) => {
              // Cria uma div para o tipo
              const typeDiv = document.createElement("div")
              typeDiv.textContent =
                type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
              // Adiciona a div do tipo à div pai dos tipos
              typesDiv.appendChild(typeDiv)
            })
            // Adiciona a imagem e a div dos tipos à div do Pokémon
            div.appendChild(img)
            div.appendChild(typesDiv)
          })
          .catch((error) => {
            console.log("Error:", error) // Exibe uma mensagem de erro, caso ocorra algum problema na requisição
          })

        // Adiciona o nome e a div à lista de Pokémons
        div.appendChild(name)
        pokemonList.appendChild(div)
      })
    })
    .catch((error) => {
      console.log("Error:", error) // Exibe uma mensagem de erro, caso ocorra algum problema na requisição
    })
})
