/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('specialties', [
      {
        id: uuidv4(),
        skill: 'ACUPUNTURISTA',
        lack: true,
      },
      {
        id: uuidv4(),
        skill: 'ALERGISTA / BIOLOGISTA',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'CARDIOLOGISTA',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'CIRURGIÃO PLÁSTICO',
        lack: true,
      },
      {
        id: uuidv4(),
        skill: 'CLINICA MEDICA EM GERAL',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'DEPENDÊNCIA QUÍMICA - SOCIO',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'DEPENDÊNCIA QUÍMICA - DEP',
        lack: true,
      },
      {
        id: uuidv4(),
        skill: 'DERMATOLOGISTA',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'DERMATOLOGISTA - TRAT. ESTÉTICO',
        lack: true,
      },
      {
        id: uuidv4(),
        skill: 'DIAGNOSTICO POR IMAGEM',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'DOC ORTODÔNTICA',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'ENDOCRINOLOGISTA',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'EXAME LABORATORIAL',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'EXAME MEDICO',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'FISIOTERAPEUTA',
        lack: true,
      },
      {
        id: uuidv4(),
        skill: 'GASTRO',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'GINECOLOGISTA',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'HIDROTERAPIA',
        lack: true,
      },
      {
        id: uuidv4(),
        skill: 'HOMEOPATIA',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'INSTRUM./ANESTESISTA',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'NEUROLOGISTA',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'NUTRIÇÃO E AFINS',
        lack: true,
      },
      {
        id: uuidv4(),
        skill: 'ONCOLOGISTA',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'ODONTOLÓGICO',
        lack: true,
      },
      {
        id: uuidv4(),
        skill: 'OFTALMOLOGISTA',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'ORTOPEDISTA',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'OTORRINO',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'PATOLOGISTA',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'PEDIATRA',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'PNEUMOLOGISTA',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'PODÓLOGO',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'PSICOLOGO',
        lack: true,
      },
      {
        id: uuidv4(),
        skill: 'PSIQUIATRA',
        lack: true,
      },
      {
        id: uuidv4(),
        skill: 'QUIROPRAXISTA',
        lack: true,
      },
      {
        id: uuidv4(),
        skill: 'REFLEXOLOGISTA',
        lack: true,
      },
      {
        id: uuidv4(),
        skill: 'REUMATOLOGISTA',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'TRAT. ESTÉTICO DIVERSOS - POS OP.',
        lack: true,
      },
      {
        id: uuidv4(),
        skill: 'UROLOGISTA',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'VASCULAR',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'HOSPITALAR',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'GERIATRIA',
        lack: false,
      },
      {
        id: uuidv4(),
        skill: 'FONOAUDIOLOGIA',
        lack: true,
      },
      {
        id: uuidv4(),
        skill: 'CONSULTA MEDICA',
        lack: false,
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('specialties', null, {});
  },
};
