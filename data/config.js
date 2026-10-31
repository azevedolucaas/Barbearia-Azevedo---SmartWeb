/**
 * BARBEARIA AZEVEDO - Central Business Configuration
 * Centralize all editable business data, contacts, social media, and catalog info.
 */

export const businessConfig = {
  // Metadados de Validação Comercial (UniFECAF - Auditoria de Dados)
  statusValidacao: {
    ambiente: "Academico / Demonstrativo",
    dadosAConfirmarComProprietario: [
      "Numero real de WhatsApp para producao [CONFIRMADO: 5521972428922]",
      "Telefone fixo da unidade",
      "Endereco final de instalacao e CEP",
      "CNPJ e razao social oficial",
      "Precos finais dos combos e servicos",
      "Fotos e biografias reais dos colaboradores"
    ]
  },

  // Identidade da Marca
  brandName: "Barbearia Azevedo",
  shortName: "AZEVEDO",
  tagline: "Tradição • Precisão • Estilo",
  slogan: "Seu estilo. Nosso ofício.",
  description: "Mais do que um corte. Uma experiência pensada nos detalhes, da primeira navalhada ao acabamento final.",

  // Informações de Contato [UNIDADE CONFIRMADA: MÉIER - RIO DE JANEIRO]
  whatsappNumber: "5521972428922",
  whatsappDisplay: "(21) 97242-8922",
  whatsappUrl: "https://wa.me/5521972428922",
  phone: "(21) 3333-3333",
  email: "contato@barbeariaazevedo.com.br",
  address: "Rua Dias da Cruz, 142 - Méier, Rio de Janeiro - RJ, CEP 20720-012",
  addressShort: "Méier, Rio de Janeiro - RJ",
  instagramHandle: "barbeariaazevedo",
  instagramUrl: "https://instagram.com/barbeariaazevedo",

  // Horários de Atendimento [A CONFIRMAR COM A GERÊNCIA]
  hours: [
    { days: "Segunda a Sexta", time: "09:00 - 20:00" },
    { days: "Sábado", time: "09:00 - 18:00" },
    { days: "Domingo e Feriados", time: "Fechado" }
  ],

  // Services Catalog
  services: [
    {
      id: "corte-masculino",
      number: "01",
      name: "Corte Masculino",
      category: "Cabelo",
      description: "Corte personalizado de acordo com o formato do rosto, textura dos fios e preferência individual do cliente.",
      duration: "45 min",
      price: "R$ 70",
      icon: "solar:scissors-linear",
      badge: "Popular"
    },
    {
      id: "degrade",
      number: "02",
      name: "Degradê de Precisão",
      category: "Cabelo",
      description: "Acabamento impecável com transições milimétricas e sombreamento limpo, da máquina zero à navalha.",
      duration: "50 min",
      price: "R$ 80",
      icon: "solar:magic-stick-linear",
      badge: "Destaque"
    },
    {
      id: "barba",
      number: "03",
      name: "Barba & Modelagem",
      category: "Barba",
      description: "Alinhamento com navalha, desenho anatômico, aparo de volume e hidratação profunda com óleos essenciais.",
      duration: "35 min",
      price: "R$ 55",
      icon: "solar:crown-linear",
      badge: null
    },
    {
      id: "corte-barba",
      number: "04",
      name: "Corte + Barba",
      category: "Combo",
      description: "A experiência completa de alinhamento visual para cabelo e barba em uma única sessão personalizada.",
      duration: "1h 15min",
      price: "R$ 115",
      icon: "solar:fire-linear",
      badge: "Mais Pedido"
    },
    {
      id: "barba-toalha-quente",
      number: "05",
      name: "Barba com Toalha Quente",
      category: "Ritual",
      description: "Ritual tradicional com vaporizador, toalha quente aromática, massagem facial, lâmina descartável e pós-barba refrescante.",
      duration: "45 min",
      price: "R$ 75",
      icon: "solar:waterdrop-linear",
      badge: "Experiência"
    },
    {
      id: "sobrancelha",
      number: "06",
      name: "Design de Sobrancelha",
      category: "Detalhe",
      description: "Limpeza e acabamento masculino sutil com navalhete ou pinça, preservando a naturalidade do olhar.",
      duration: "15 min",
      price: "R$ 30",
      icon: "solar:eye-linear",
      badge: null
    },
    {
      id: "camuflagem",
      number: "07",
      name: "Camuflagem de Fios",
      category: "Tratamento",
      description: "Tonalização suave desenvolvida para atenuar o contraste dos fios brancos com efeito totalmente discreto e natural.",
      duration: "30 min",
      price: "R$ 65",
      icon: "solar:palette-linear",
      badge: "Discreto"
    },
    {
      id: "combo-azevedo",
      number: "08",
      name: "Combo Azevedo",
      category: "Assinatura",
      description: "O ritual definitivo: corte completo + barba com toalha quente + sobrancelha + lavagem especial e café expresso ou cerveja artesanal.",
      duration: "1h 30min",
      price: "R$ 150",
      icon: "solar:star-fall-minimalistic-linear",
      badge: "Premium"
    }
  ],

  // Team / Barbers
  barbers: [
    {
      id: "lucas-azevedo",
      name: "Lucas Azevedo",
      role: "Mestre Barbeiro & Visagista",
      experience: "12 anos de ofício",
      description: "Especialista em visagismo masculino, cortes clássicos na tesoura e design de barba com navalha tradicional.",
      image: "images/team/06-barbeiro-lucas-azevedo.webp",
      instagram: "lucas.azevedo"
    },
    {
      id: "mateus-silva",
      name: "Mateus Silva",
      role: "Especialista em Fade & Freestyle",
      experience: "8 anos de ofício",
      description: "Domínio absoluto em transições skin fade, taper e tendências contemporâneas de finalização.",
      image: "images/team/07-barbeiro-mateus-silva.webp",
      instagram: "mateus.barber"
    },
    {
      id: "rafael-costa",
      name: "Rafael Costa",
      role: "Mestre em Barboterapia & Cuidados",
      experience: "10 anos de ofício",
      description: "Referência no ritual da toalha quente, tratamento capilar e revitalização para a pele masculina.",
      image: "images/team/08-barbeiro-rafael-costa.webp",
      instagram: "rafael.azevedobarber"
    }
  ],

  // Gallery Items
  gallery: [
    {
      id: 1,
      title: "Atendimento Exclusivo no Lounge",
      category: "Ambiente • Experiência",
      image: "images/gallery/13-experiencia-cliente-satisfacao.webp",
      description: "Atendimento personalizado com poltronas vintage de couro em ambiente climatizado."
    },
    {
      id: 2,
      title: "Degradê de Precisão & Fade",
      category: "Cabelo • Precisão",
      image: "images/services/02-corte-degrade-precisao.webp",
      description: "Transição suave milimétrica, da máquina zero ao alinhamento de nuca."
    },
    {
      id: 3,
      title: "Barba com Navalha Tradicional",
      category: "Barba • Tradição",
      image: "images/services/03-barba-navalha-tradicional.webp",
      description: "Lâmina descartável afiada com técnica cirúrgica e espuma aquecida."
    },
    {
      id: 4,
      title: "Alinhamento & Modelagem de Barba",
      category: "Barba • Geometria",
      image: "images/services/04-barba-modelagem-alinhamento.webp",
      description: "Desenho anatômico respeitando os contornos naturais do rosto masculino."
    },
    {
      id: 5,
      title: "Ritual da Toalha Quente",
      category: "Ritual • Bem-estar",
      image: "images/services/05-barboterapia-toalha-quente.webp",
      description: "Abertura dos poros com toalha aromática aquecida e massagem relaxante."
    },
    {
      id: 6,
      title: "O Espaço Barbearia Azevedo",
      category: "Espaço • Arquitetura",
      image: "images/interior/09-ambiente-barbearia-lounge.webp",
      description: "Madeira nobre, espelhos iluminados e atmosfera de clube exclusivo."
    },
    {
      id: 7,
      title: "Instrumentos do Ofício",
      category: "Ferramentas • Precisão",
      image: "images/interior/10-ferramentas-barbeiro-oficio.webp",
      description: "Tesouras japonesas, navalhetes e cosméticos de alta performance."
    },
    {
      id: 8,
      title: "Corte na Tesoura & Textura",
      category: "Cabelo • Técnica",
      image: "images/gallery/11-corte-tesoura-acabamento.webp",
      description: "Técnica clássica de tesoura sobre pente para caimento natural dos fios."
    },
    {
      id: 9,
      title: "Contorno Perfeito com Navalha",
      category: "Barba • Acabamento",
      image: "images/gallery/12-navalhado-contorno-perfeito.webp",
      description: "Finalização impecável no maxilar com óleo de hidratação pós-barba."
    },
    {
      id: 10,
      title: "Satisfação & Estilo do Cliente",
      category: "Experiência • Resultado",
      image: "images/gallery/13-experiencia-cliente-satisfacao.webp",
      description: "A confiança de quem sai com o visual renovado e alinhado."
    },
    {
      id: 11,
      title: "Penteado & Styling Masculino",
      category: "Finalização • Estilo",
      image: "images/gallery/14-penteado-finalizacao-estilo.webp",
      description: "Modelagem com pomadas de efeito opaco e fixação duradoura."
    },
    {
      id: 12,
      title: "A Cadeira Clássica Azevedo",
      category: "Ambiente • Tradição",
      image: "images/gallery/15-cadeira-vintage-panorama.webp",
      description: "O símbolo do conforto e da tradição da barbearia artesanal."
    }
  ],

  // Booking API & Local Ledger Configuration
  booking: {
    endpoint: "https://formsubmit.co/ajax/contato@barbeariaazevedo.com.br",
    storageKey: "azevedo_agendamentos",
    businessEmail: "contato@barbeariaazevedo.com.br"
  },


  // Testimonials
  testimonials: [
    {
      id: 1,
      name: "Rodrigo Mendonça",
      role: "Cliente assíduo há 2 anos",
      rating: 5,
      comment: "A atenção aos detalhes na Barbearia Azevedo é de outro nível. O ambiente é silencioso, sofisticado e o degradê fica impecável em qualquer ocasião.",
      service: "Corte + Barba"
    },
    {
      id: 2,
      name: "Carlos Eduardo Nogueira",
      role: "Empresário",
      rating: 5,
      comment: "O ritual da toalha quente é uma pausa necessária na semana. Pontualidade britânica no atendimento e profissionais que realmente entendem de visagismo.",
      service: "Ritual Barba com Toalha Quente"
    },
    {
      id: 3,
      name: "Guilherme Sampaio",
      role: "Advogado",
      rating: 5,
      comment: "Lugar sério, atendimento de primeira linha sem conversas forçadas. O acabamento da barba dura muito mais tempo do que em qualquer outro lugar que já fui.",
      service: "Combo Azevedo"
    },
    {
      id: 4,
      name: "Felipe Andrade",
      role: "Arquiteto",
      rating: 5,
      comment: "Espaço com design impecável e serviço consistente. Corto com o Lucas e cada visita reforça a confiança na técnica da equipe.",
      service: "Corte Masculino"
    }
  ]
};
