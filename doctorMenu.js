const prompt = require("prompt-sync")();
let {
  createDoctor,
  deleteDoctor,
  listDoctors,
  updateDoctor,
  searchDoctorByName,
  searchDoctorBySpeciality,
} = require("./doctorRegistration");

function getDoctorMenu() {
  console.log(
    "---------------------MENU MÉDICO--------------------------\n" +
      "Digite [1] para ADICIONAR um médico\n" +
      "Digite [2] para LISTAR todos os médicos\n" +
      "Digite [3] para ATUALIZAR dados de um médico\n" +
      "Digite [4] para REMOVER um médico\n" +
      "Digite [5] para BUSCAR um médico\n" +
      "Digite [0] para VOLTAR para o MENU PRNCIPAL!\n"
  );
}

function getSecondaryMenu() {
  console.log("Deseja BUSCAR um médico com base em qual critério? ");
  console.log(
    "---------------------MENU MÉDICO--------------------------\n" +
      "Digite [1] para buscar um médico pelo nome\n" +
      "Digite [2] para buscar um médico pela especialidade\n"
  );
}

function searchDoctorMenuOptions() {
  getDoctorMenu();

  let inputOption = prompt("Digite a opção aqui: ");

  switch (inputOption) {
    case "1":
      createDoctor();
      searchDoctorMenuOptions();
      break;
    case "2":
      listDoctors();
      searchDoctorMenuOptions();
      break;
    case "3":
      updateDoctor();
      searchDoctorMenuOptions();
      break;
    case "4":
      deleteDoctor();
      searchDoctorMenuOptions();
      break;
    case "5":
      searchSecondaryMenuOption();
      searchDoctorMenuOptions();
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
      searchDoctorByName();
      break;
    case "2":
      searchDoctorBySpeciality();
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

module.exports = { searchDoctorMenuOptions };
