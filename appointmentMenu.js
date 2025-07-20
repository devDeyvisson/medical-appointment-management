const prompt = require("prompt-sync")();
let {
  cerateAppointment,
  listAppointment,
  updateAppointment,
  deleteAppointment,
  searchAppointmentByDate,
  searchAppointmentByDoctorId,
  searchAppointmentByPatientId,
  searchAppointmentByDescription,
} = require("./appointmentRegistration");

function getAppointmentMenu() {
  console.log(
    "----------------------MENU CONSULTA-------------------------\n" +
      "Digite [1] para ADICIONAR uma consulta\n" +
      "Digite [2] para LISTAR todas as consultas\n" +
      "Digite [3] para ATUALIZAR dados de uma consulta\n" +
      "Digite [4] para REMOVER uma consulta\n" +
      "Digite [5] para BUSCAR uma consulta\n" +
      "Digite [0] para SAIR!\n"
  );
}

function getSecondaryMenu() {
  console.log("Deseja BUSCAR uma consulta com base em qual critério? ");
  console.log(
    "----------------------MENU CONSULTA-------------------------\n" +
      "Digite [1] para buscar uma consulta por data de agendamento\n" +
      "Digite [2] para buscar uma consulta pelo ID do médico\n" +
      "Digite [3] para buscar uma consulta pelo ID do paciente\n" +
      "Digite [4] para buscar uma consulta por descrição\n"
  );
}

function searchAppointmentMenuOptions() {
  getAppointmentMenu();

  let inputOption = prompt("Digite a opção aqui: ");

  switch (inputOption) {
    case "1":
      cerateAppointment();
      searchAppointmentMenuOptions();
      break;
    case "2":
      listAppointment();
      searchAppointmentMenuOptions();
      break;
    case "3":
      updateAppointment();
      searchAppointmentMenuOptions();
      break;
    case "4":
      deleteAppointment();
      searchAppointmentMenuOptions();
      break;
    case "5":
      searchSecondaryMenuOption();
      searchAppointmentMenuOptions();
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
      searchAppointmentByDate();
      break;
    case "2":
      searchAppointmentByDoctorId();
      break;
    case "3":
      searchAppointmentByPatientId();
      break;
    case "4":
      searchAppointmentByDescription();
      break;
    default:
      console.log(
        "(" +
          inputOption +
          ") ->" +
          "Opção inválida! Só são aceitos os valores: 1, 2, 3 e 4."
      );
  }
}

module.exports = {
  searchAppointmentMenuOptions,
};
