const prompt = require('prompt-sync')()
const _ = require('lodash')

const livro = {
  id: null,
  nome: null,
  autor: null,
  ano: null,
  doacao: null
}

let livros = [
  {
    id: 1,
    nome: 'Como fazer sentido e bater o martelo',
    autor: 'Alexandro Aolchique',
    ano: 2017,
    status: 'Disponivel',
    doacao: false
  },
  {
    id: 2,
    nome: 'Sejamos todos feministas',
    autor: 'Chimamanda Ngozi Adichie',
    ano: 2015,
    status: 'Disponivel',
    doacao: false
  },
  {
    id: 3,
    nome: 'Basquete 101',
    autor: 'Hortência Marcari',
    ano: 2010,
    status: 'Disponivel',
    doacao: false
  }
]

const cliente = {
  id: null,
  numero_de_acesso: null,
  nome: null
}

let clientes = []

const usuario = {
  id: null,
  matricula: null,
  nome: null
}

let usuarios = [
  {
    id: 1,
    matricula: 0001,
    nome: 'Joel'
  }
]

const emprestimo = {
  id: null,
  id_livro: null,
  nome_cliente: null
}

let emprestimos = []

// pesquisar livros por filtros | status: em desenvolvimento
function filtrarLivros() {
  const normalize = norm =>
    norm
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

  emprestimos = []
  const imprimir = (id, nome, autor, ano) => {
    console.log(`
    ${id}. ${nome} -- ${autor}, ${ano}`)
    emprestimos.push({ id, nome })
  }

  const filtrarNome = pesquisa =>
    _.map(livros, nomeLivro => {
      let { id, nome, autor, ano } = nomeLivro

      let verificarNome = _.includes(normalize(nome), normalize(pesquisa))

      if (verificarNome) {
        imprimir(id, nome, autor, ano)
      }
    })

  const filtrarAutor = pesquisa =>
    _.map(livros, autorLivro => {
      let { id, nome, autor, ano } = autorLivro

      let verificarAutor = _.includes(normalize(autor), normalize(pesquisa))

      if (verificarAutor) {
        imprimir(id, nome, autor, ano)
      }
    })

  const filtrarAno = pesquisa =>
    _.map(livros, anoLivro => {
      let { id, nome, autor, ano } = anoLivro

      let verificarAno = _.includes(
        normalize(ano.toString()),
        normalize(pesquisa)
      )

      if (verificarAno) {
        setTimeout(() => {
          console.log('\n')
        }, 100)
        imprimir(id, nome, autor, ano)
      }
    })

  const menuFiltros = [
    {
      id: 1,
      label: 'Pesquisar livro por nome',
      callback: () =>
        filtrarNome(prompt('Digite o nome do livro que deseja buscar: '))
    },
    {
      id: 2,
      label: 'Pesquisar livro por autor',
      callback: () =>
        filtrarAutor(prompt('Digite o nome do autor que deseja buscar: '))
    },
    {
      id: 3,
      label: 'Pesquisar livro por ano',
      callback: () => filtrarAno(prompt('Digite o ano que deseja buscar: '))
    }
  ]

  const menuAuxiliar = [
    {
      id: 1,
      label: 'Fazer outa pesquisa',
      callback: filtrarLivros
    },
    {
      id: 2,
      label: 'Solicitar emprestimo',
      callback: () => emprestarLivro(emprestimos)
    },
    {
      id: 3,
      label: 'Voltar ao menu principal',
      callback: menuPrincipal
    }
  ]

  console.log(`
Bem vindo a área de pesquisa!! Aqui você pode fazer uma busca rapida dos livros em nossa estante.
Escolha o filtro que deseja aplicar e retornaremos todos o livros que atenderem à pesquisa.\n`)

  setTimeout(() => {
    console.log('\n')
    menus(menuAuxiliar, 'Escolha sua opção')
  }, 1000)
  return menus(menuFiltros, 'Escolha sua opção')
}

// listar livros | status: finalizado
function listarLivros() {
  const menuLivros = [
    {
      id: 1,
      label: 'Solicitar emprestimo',
      callback: emprestarLivro
    },
    {
      id: 2,
      label: 'Filtrar livros',
      callback: filtrarLivros
    },
    {
      id: 3,
      label: 'Voltar ao menu principal',
      callback: menuPrincipal
    }
  ]

  console.log('LIVROS DISPONIVEIS NA ESTANTE\n')
  console.log('---------------------------------------------')
  livros.map(item => {
    console.log(` ${item.id}. ${item.nome}`)
  })
  console.log('---------------------------------------------\n')

  menus(menuLivros, 'Escolha uma opção')
}

// verificar cadrastro cliente | status: para desenvolver
function verificarCadastro() {}

//cadrastar cliente caso !exista | status: finalizado, mas !implementado
function cadastrarCliente() {
  console.log(
    'Olá, bem vindo a área de cadastros!!\nInsira todos os dados necessarios para se cadastrar:\n'
  )
  let novoCliente = cliente
  novoCliente.id = clientes.length + 1
  novoCliente.nome = prompt('Digite seu nome e sobrenome: ')
  novoCliente.cpf = prompt('Digite seu CPF: ')
  clientes.push(novoCliente)

  console.log('\nEfetuando cadastro...')
  setTimeout(() => {
    console.log('\nParabens, seu cadastro foi efetuado com sucesso!!')
  }, 1500)
  setTimeout(() => {
    console.clear()
    menuPrincipal()
  }, 3000)
}

// devover livro | status: em desenvolvimento
function devolverLivro() {
  const menuDevolucoes = [
    {
      id: 1,
      label: 'Devolver livro emprestado',
      callback: devolverLivro
    },
    {
      id: 2,
      label: 'Voltar ao menu principal',
      callback: menuPrincipal
    }
  ]
  console.log('LIVROS EMPRESTADOS DA ESTANTE\n')
  console.log('---------------------------------------------')
  emprestimos.map(item => {
    livros.map(livro => {
      if (item.id_livro == livro.id) {
        console.log(` ${item.id}. ${livro.nome}`)
      }
    })
  })
  console.log('---------------------------------------------\n')

  let escolherLivro = prompt('Digite o numero do livro que deseja devolver: ')

  let existeLivro = emprestimos.filter(item => item.id_livro == escolherLivro)

  if (existeLivro.length > 0) {
    _.remove(emprestimos, { id_livro: escolherLivro })
  } else {
    console.log('\nLivro não encontado\n')
  }
  menus(menuDevolucoes, 'Escolha uma opção')
}

// retirada | status: em desenvolvimento
function emprestarLivro(livro) {
  const menuEmprestimos = [
    {
      id: 1,
      label: 'Solicitar outro emprestimo da estante',
      callback: emprestarLivro
    },
    {
      id: 2,
      label: 'Ir para pesquisa',
      callback: filtrarLivros
    },
    {
      id: 3,
      label: 'Voltar ao menu principal',
      callback: menuPrincipal
    }
  ]

  if (livro) {
    console.log('LIVROS DA SUA PESQUISA')
    console.log('---------------------------------------------')
    livro.map(item => {
      console.log(` ${item.id}. ${item.nome}`)
    })
    console.log('---------------------------------------------\n')
  } else {
    console.log('LIVROS DISPONIVEIS NA ESTANTE')
    console.log('---------------------------------------------')
    livros.map(item => {
      console.log(` ${item.id}. ${item.nome}`)
    })
    console.log('---------------------------------------------\n')
  }

  let escolherLivro = prompt('Digite o numero do livro que deseja: ')
  let nomeCliente = prompt('Digite seu primeiro nome: ')
  let livroEscolhido = livros.find(item => item.id == escolherLivro)
  let novoEmprestimo = _.clone(emprestimo)
  novoEmprestimo.id = emprestimos.length + 1
  novoEmprestimo.id_livro = livroEscolhido.id
  novoEmprestimo.nome_cliente = nomeCliente
  console.clear()

  let disponibilidadeLivro = emprestimos.filter(
    item => item.id_livro == escolherLivro
  )

  if (disponibilidadeLivro.length == 0) {
    emprestimos.push(novoEmprestimo)

    console.log(`
Parabéns, aqui esta seu livro!
------------------------------\n
Número: ${livroEscolhido.id}
Titulo: ${livroEscolhido.nome}
Autor: ${livroEscolhido.autor}
Ano: ${livroEscolhido.ano}
Status: ${livroEscolhido.status}
Emprestado para:${nomeCliente}\n`)
    livroEscolhido.status = ''

    menus(menuEmprestimos, 'Escolha uma opção')
  } else {
    console.log(
      '\nOps... Esse livro não esta disponivel no momento. Vamos leva-lo para o menu.\n'
    )
    setTimeout(() => {
      menus(menuEmprestimos, 'Escolha uma opção')
    }, 2000)
  }
}

// doação/cadrastro livro | status: finalizado
function cadrastarLivro() {
  console.log(
    'Olá, bem vindo a área de cadastros!!\nInsira todos os dados necessarios para cadastrar um livro:\n'
  )
  let novoLivro = _.clone(livro)
  novoLivro.id = livros.length + 1
  novoLivro.nome = prompt('Nome do livro: ')
  novoLivro.autor = prompt('Seu autor: ')
  novoLivro.ano = prompt('Ano de lançamento: ')
  novoLivro.doacao = prompt('Esse livro é uma doação? 0-não 1-sim ')
  novoLivro.doacao = novoLivro.doacao !== 0 ? true : false
  livros.push(novoLivro)

  console.log('\nEfetuando cadastro do livro...')
  setTimeout(() => {
    console.log('\nLivro cadastrado com sucesso ;)')
  }, 1500)
  setTimeout(() => {
    console.clear()
    menuPrincipal()
  }, 3000)
}

// menu de entrada | status: finalizado
function menus(dados, pergunta) {
  dados.map(item => {
    console.log(`${item.id}. ${item.label}`)
  })
  console.log('\n')
  const itemSelecionado = prompt(`${pergunta}: `)
  console.clear()

  dados.map(item => {
    if (item.id == itemSelecionado) {
      item.callback()
    }
  })
}

// status: finalizado
function menuPrincipal() {
  console.clear()
  console.log(`
BEM VINDO A BIBLIOTECA ÁGIL
---------------------------
      MENU PRINCIPAL\n`)
  const menuPrincipal = [
    {
      id: 0,
      label: 'Sair',
      callback: () => console.log(`Agradecemos sua visita!!`)
    },
    {
      id: 1,
      label: 'Listar livros disponiveis',
      callback: listarLivros
    },
    {
      id: 2,
      label: 'Pesquisar livro por filtros',
      callback: filtrarLivros
    },
    {
      id: 3,
      label: 'Cadastrar livro',
      callback: cadrastarLivro
    },
    {
      id: 4,
      label: 'Devolver livro',
      callback: devolverLivro
    }
    // {
    //   id: 4,
    //   label: 'Criar seu cadastro na biblioteca',
    //   callback: cadastrarCliente
    // }
  ]
  menus(menuPrincipal, 'Digite sua opção')
}

menuPrincipal()
