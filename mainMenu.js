const prompt = require("prompt-sync")();
let { searchDoctorMenuOptions } = require("./doctorMenu");
let { searchPatientMenuOptions } = require("./patientMenu");
let { searchAppointmentMenuOptions } = require("./appointmentMenu");

function getMainMenu() {
  console.log(
    "-----------------MENU PRINCIPAL----------------------\n" +
      "Digite [1] para GERENCIAR MÉDICOS\n" +
      "Digite [2] para GERENCIAR PACIENTES\n" +
      "Digite [3] para GERENCIAR CONSULTAS\n" +
      "Digite [0] para SAIR!\n"
  );
}

function searchMainMenuOptions() {
  getMainMenu();

  let inputOption = prompt("Digite a opção aqui: ");

  switch (inputOption) {
    case "1":
      searchDoctorMenuOptions();
      searchMainMenuOptions();
      break;
    case "2":
      searchPatientMenuOptions();
      searchMainMenuOptions();
      break;
    case "3":
      searchAppointmentMenuOptions();
      searchMainMenuOptions();
      break;
    case "0":
      console.log("SAINDO...");
      break;
    default:
      throw new Error(
        "Opção inválida! Só são aceitos os valores 1, 2, 3 e 0 (SAIR)."
      );
  }
}

module.exports = {
  searchMainMenuOptions,
};
