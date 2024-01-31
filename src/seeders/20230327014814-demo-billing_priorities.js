/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('billing_priorities', [
      {
        id: uuidv4(),
        name: 'ESTORNOS DE CONVENIOS',
        value: 7,
      },
      {
        id: uuidv4(),
        name: 'ALUGUEL SALAO SOCIAL',
        value: 3,
      },
      {
        id: uuidv4(),
        name: 'REEMBOLSO ANTECIPADO',
        value: 9,
      },
      {
        id: uuidv4(),
        name: 'VOLUS/ELO',
        value: 34,
      },
      {
        id: uuidv4(),
        name: 'UNIMED NOVO',
        value: 5,
      },
      {
        id: uuidv4(),
        name: 'UNIMED TAXAS',
        value: 27,
      },
      {
        id: uuidv4(),
        name: 'UNIMED ANTIGO',
        value: 32,
      },
      {
        id: uuidv4(),
        name: 'DENTSYSTEM PLANO',
        value: 8,
      },
      {
        id: uuidv4(),
        name: 'DENTSYSTEM TAXA',
        value: 10,
      },
      {
        id: uuidv4(),
        name: 'MAIS SAUDE / SANTA CASA',
        value: 35,
      },
      {
        id: uuidv4(),
        name: 'ACERTOS COM SINDICATO',
        value: 13,
      },
      {
        id: uuidv4(),
        name: 'AUTOGAS',
        value: 21,
      },
      {
        id: uuidv4(),
        name: 'VALE DO SINDICATO - CORSO',
        value: 23,
      },
      {
        id: uuidv4(),
        name: 'VALE DO SINDICATO - POSTO NOVA SAO JOAO',
        value: 22,
      },
      {
        id: uuidv4(),
        name: 'VALE DO SINDICATO - FARMACIA DO POVO',
        value: 24,
      },
      {
        id: uuidv4(),
        name: 'VALE DO SINDICATO - FORT MIX',
        value: 25,
      },
      {
        id: uuidv4(),
        name: 'JOSE ANTONIO GREGORIO JUNIOR',
        value: 12,
      },
      {
        id: uuidv4(),
        name: 'JOSE CARLOS VERNE',
        value: 2,
      },
      {
        id: uuidv4(),
        name: 'DOCES PATRIC',
        value: 26,
      },
      {
        id: uuidv4(),
        name: 'GISELE FELIX',
        value: 28,
      },
      {
        id: uuidv4(),
        name: 'DONA MARIA MARMITA',
        value: 30,
      },
      {
        id: uuidv4(),
        name: 'PRIMOR MARMITA',
        value: 31,
      },
      {
        id: uuidv4(),
        name: 'LOURDES FERREIRA',
        value: 33,
      },
      {
        id: uuidv4(),
        name: 'ROBERTO C C LANCHES',
        value: 36,
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('billing_priorities', null, {});
  },
};
