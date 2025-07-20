const prompt = require("prompt-sync")();
let db = require("./memoryDataBase");

function cerateAppointment() {
  if (db.doctors.length === 0 || db.patients.length === 0) {
    console.log(
      "Não há médicos ou pacientes cadastrados para marcar a consulta!"
    );
    return;
  }

  let inputDoctorId = prompt("Informe o ID do(a) médico(a): ");
  let inputPatientId = prompt("Informe o ID do(a) paciente: ");
  let inputDate = prompt("Informe a data de agendamento: ");
  let inputDescription = prompt("Informe uma descrição para a consulta: ");

  let doctorExists = db.doctors.some((doctor) => doctor.id === inputDoctorId);
  let patientExists = db.patients.some(
    (patient) => patient.id === inputPatientId
  );

  if (!doctorExists || !patientExists) {
    console.log(
      "O ID do médico ou paciente não corresponde a ninguém que está cadastrado na base!"
    );
    return;
  }

  let newAppointment = {
    id: Date.now().toString(),
    doctorId: inputDoctorId,
    patientId: inputPatientId,
    date: inputDate,
    description: inputDescription,
  };

  db.appointments.push(newAppointment);

  console.log("CONSULTA CADASTRADA COM SUCESSO!");
}

function listAppointment() {
  if (db.appointments.length === 0) {
    console.log("A lista de consultas está vazia!");
    return;
  }

  console.log("LISTA DE CONSULTAS: ");

  db.appointments.forEach((appointment) => {
    console.log(
      `Id: ${appointment.id}, Médico: ${appointment.doctorId}, Paciente: ${appointment.patientId}, Data de agendamento: ${appointment.date}, Descrição: ${appointment.description}`
    );
  });
}

function updateAppointment() {
  let updateId = prompt("Informe o id da consulta que deseja atualizar: ");

  let index = db.appointments.findIndex(
    (appointment) => appointment.id === updateId
  );

  if (index !== -1) {
    console.log(
      "Digite enter para continuar, ou seja, se não quiser alterar algum valor."
    );

    let inputDoctorId = prompt("Informe o ID do(a) médico(a): ");
    let inputPatientId = prompt("Informe o ID do(a) paciente: ");
    let inputDate = prompt("Informe a data de agendamento: ");
    let inputDescription = prompt("Informe uma descrição para a consulta: ");

    db.appointments[index].doctorId =
      inputDoctorId || db.appointments[index].doctorId;

    db.appointments[index].patientId =
      inputPatientId || db.appointments[index].patientId;

    db.appointments[index].date = inputDate || db.appointments[index].inputDate;

    db.appointments[index].description =
      inputDescription || db.appointments[index].description;

    console.log(
      `Os dados da consulta com o Id: ${updateId} foram atualizados com sucesso!`
    );

    return;
  }
  console.log(
    "Não foi possível atualizar, pois o id informado não pertence a nenhuma consulta!"
  );
}

function deleteAppointment() {
  let deleteId = prompt("Informe o id da consulta que eseja remover: ");

  let index = db.appointments.findIndex(
    (appointment) => appointment.id === deleteId
  );

  if (index !== -1) {
    db.appointments.splice(index, 1);
    console.log(`A consulta com o Id: ${deleteId} foi removida com sucesso!`);
    return;
  }
  console.log(
    "Não foi possível remover, pois o id informado não pertence a nenhuma consulta!"
  );
}

function searchAppointmentByDate() {
  let searchDate = prompt(
    "Informe a data de agendamento da consulta: "
  ).toLowerCase();

  let resultList = db.appointments.filter((appointment) =>
    appointment.date.toLowerCase().includes(searchDate)
  );

  console.log("RESULTADO DA BUSCA POR DATA DE AGENDAMENTO: ");

  displaySearchResult(resultList, searchDate);
}

function searchAppointmentByDoctorId() {
  let searchDoctorId = prompt(
    "Informe o id do médico responsável pela consulta: "
  ).toLowerCase();

  let resultList = db.appointments.filter((appointment) =>
    appointment.doctorId.toLowerCase().includes(searchDoctorId)
  );

  console.log("RESULTADO DA BUSCA POR ID DO MÉDICO: ");

  displaySearchResult(resultList, searchDoctorId);
}

function searchAppointmentByPatientId() {
  let searchPatientId = prompt("Informe o id do paciente: ").toLowerCase();

  let resultList = db.appointments.filter((appointment) =>
    appointment.patientId.toLowerCase().includes(searchPatientId)
  );

  console.log("RESULTADO DA BUSCA POR ID DO PACIENTE: ");

  displaySearchResult(resultList, searchPatientId);
}

function displaySearchResult(resultList, search) {
  if (resultList.length > 0) {
    resultList.forEach((appointment) => {
      console.log(
        `Id: ${appointment.id}, Médico: ${appointment.doctorId}, Paciente: ${appointment.patientId}, Data de agendamento: ${appointment.date}, Descrição: ${appointment.description}`
      );
    });
    return;
  }
  console.log(
    `Nenhuma consulta foi encontrada com base na busca informada (${search.toUpperCase()}).`
  );
}

module.exports = {
  cerateAppointment,
  listAppointment,
  updateAppointment,
  deleteAppointment,
  searchAppointmentByDate,
  searchAppointmentByDoctorId,
  searchAppointmentByPatientId,
};
