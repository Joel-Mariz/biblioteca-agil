const prompt = require('prompt-sync')()

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
    doacao: false
  },
  {
    id: 2,
    nome: 'Sejamos todos feministas',
    autor: 'Chimamanda Ngozi Adichie',
    ano: 2015,
    doacao: false
  },
  {
    id: 3,
    nome: 'Basquete 101',
    autor: 'Hortência Marcari',
    ano: 2010,
    doacao: false
  }
]

const cliente = {
  id: null,
  cpf: null,
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
  id: 0,
  id_livro: 0,
  id_cliente: 0,
  data_retirada: '',
  data_devolucao: '',
  data_previsao_devolucao: ''
}

let emprestimos = []

// pesquisar livro
function pesquisarLivro() {}

// listar livros
function listarLivros() {
  const menuLivros = [
    {
      id: 1,
      label: 'Solicitar emprestimo',
      callback: emprestarLivro
    },
    {
      id: 2,
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

  menus(menuLivros, '\nEscolha uma opção')
}

// verificar cadrastro cliente

//cadrastar cliente caso !exista

// retirada/devolução
function emprestarLivro() {}

// doação/cadrastro livro
function cadrastarLivro() {
  console.log(
    'Olá, bem vindo a área de cadastros!!\nInsira todos os dados necessarios para cadastrar um livro:\n'
  )
  let novoLivro = livro
  novoLivro.id = livros.length + 1
  novoLivro.nome = prompt('Nome do livro: ')
  novoLivro.autor = prompt('Seu autor: ')
  novoLivro.ano = prompt('Ano de lançamento: ')
  novoLivro.doacao = prompt('Esse livro é uma doação? 0-não 1-sim ')
  novoLivro.doacao = novoLivro.doacao !== 0 ? true : false
  livros.push(novoLivro)

  console.log('\nLivro cadastrado com sucesso ;)')
  setTimeout(() => {
    console.clear()
    menuPrincipal()
  }, 2000)
}

// menu de entrada
function menus(dados, pergunta) {
  dados.map(item => {
    console.log(`${item.id}. ${item.label}`)
  })
  const itemSelecionado = prompt(`${pergunta}: `)
  console.clear()

  dados.map(item => {
    if (item.id == itemSelecionado) {
      item.callback()
    }
  })
}

function menuPrincipal() {
  console.clear()
  console.log(`BEM VINDO A BIBLIOTECA ÁGIL
---------------------------
      MENU PRINCIPAL\n`)
  const menuPrincipal = [
    {
      id: 0,
      label: 'Sair',
      callback: () =>
        console.log(
          `Agradecemos sua visita!!\nSe delicie com sua nova leitura - //livro retirado`
        )
    },
    {
      id: 1,
      label: 'Listar livros disponiveis',
      callback: listarLivros
    },
    {
      id: 2,
      label: 'Pesquisar livro por nome',
      callback: pesquisarLivro
    },
    {
      id: 3,
      label: 'Cadastrar livro',
      callback: cadrastarLivro
    }
  ]
  menus(menuPrincipal, '\nDigite sua opção')
}

menuPrincipal()
