const prompt = require("prompt-sync")();
let {
  createPatient,
  listPatient,
  updatePatient,
  deletePatient,
  searchPatientByDate,
  searchPatientByName,
} = require("./patientRegistration");

function getPatientMenu() {
  console.log(
    "-----------------MENU PACIENTE----------------------\n" +
      "Digite [1] para ADICIONAR um paciente\n" +
      "Digite [2] para LISTAR todos os pacientes\n" +
      "Digite [3] para ATUALIZAR dados de um paciente\n" +
      "Digite [4] para REMOVER um paciente\n" +
      "Digite [5] para BUSCAR um paciente\n" +
      "Digite [0] para VOLTAR para o MENU PRNCIPAL!\n"
  );
}

function getSecondaryMenu() {
  console.log("Deseja BUSCAR um paciente com base em qual critério? ");
  console.log(
    "----------------------MENU PACIENTE-------------------------\n" +
      "Digite [1] para buscar um médico pelo nome\n" +
      "Digite [2] para buscar um médico pela data de nascimento\n"
  );
}

function searchPatientMenuOptions() {
  getPatientMenu();

  let inputOption = prompt("Digite a opção aqui: ");

  switch (inputOption) {
    case "1":
      createPatient();
      searchPatientMenuOptions();
      break;
    case "2":
      listPatient();
      searchPatientMenuOptions();
      break;
    case "3":
      updatePatient();
      searchPatientMenuOptions();
      break;
    case "4":
      deletePatient();
      searchPatientMenuOptions();
      break;
    case "5":
      searchSecondaryMenuOption();
      searchPatientMenuOptions();
      break;
    case "0":
      console.log("VOLTANDO AO MENU PRINCIPAL...");
      break;
    default:
      throw new Error(
        "Opção inválida! Só são aceitos os valores 1, 2, 3, 4, 5 e 0 (SAIR)."
      );
  }
}

function searchSecondaryMenuOption() {
  getSecondaryMenu();

  const inputOption = prompt("Digite a opção aqui: ");

  switch (inputOption) {
    case "1":
      searchPatientByName();
      break;
    case "2":
      searchPatientByDate();
      break;
    default:
      console.log(
        "(" +
          inputOption +
          ") ->" +
          "Opção inválida! Só são aceitos os valores: 1 e 2."
      );
  }
}

module.exports = { searchPatientMenuOptions };
