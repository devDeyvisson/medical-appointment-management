const prompt = require("prompt-sync")();
let db = require("./memoryDataBase");

function createPatient() {
  let inputName = prompt("Informe o nome do paciente: ");
  let inputDate = prompt("Informe a data de nascimento do paciente: ");

  let newPatient = {
    id: Date.now().toString(),
    name: inputName,
    date: inputDate,
  };

  db.patients.push(newPatient);

  console.log("PACIENTE CADASTRADO COM SUCESSO!");
}

function listPatient() {
  if (db.patients.length === 0) {
    console.log("A lista de pacientes está vazia!");
    return;
  }

  console.log("LISTA DE PACIENTES: ");

  db.patients.forEach((patient) => {
    console.log(
      `Id: ${patient.id}, Nome: ${patient.name}, Data de nascimento: ${patient.date}`
    );
  });
}

function updatePatient() {
  let updateId = prompt("Informe o id do(a) paciente que deseja atualizar: ");

  let index = db.patients.findIndex((patient) => patient.id === updateId);

  if (index !== -1) {
    console.log(
      "Digite enter para continuar, ou seja, se não quiser alterar algum valor."
    );

    let inputName = prompt("Informe o nome do paciente: ");
    let inputDate = prompt("Informe a data de nascimento do paciente: ");

    db.patients[index].name = inputName || db.patients[index].name;
    db.patients[index].date = inputDate || db.patients[index].date;

    console.log(
      `Os dados do(a) paciente com o Id: ${updateId} foram atualizados com sucesso!`
    );

    return;
  }
  console.log(
    "Não foi possível atualizar, pois o id informado não pertence a nenhum paciente!"
  );
}

function deletePatient() {
  let deleteId = prompt("Informe o id do(a) paciente que eseja remover: ");

  let index = db.patients.findIndex((patient) => patient.id === deleteId);

  if (index !== -1) {
    let deletedPatient = db.patients[index].name;
    db.patients.splice(index, 1);
    console.log(`O/A paciente ${deletedPatient} foi removido(a) com sucesso!`);
    return;
  }
  console.log(
    "Não foi possível remover, pois o id informado não pertence a nenhum paciente!"
  );
}

function searchPatientByName() {
  let searchName = prompt("Informe o nome do(a) paciente: ").toLowerCase();

  let resultList = db.patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchName)
  );

  console.log("RESULTADO DA BUSCA POR NOME: ");

  displaySearchResult(resultList, searchName);
}

function searchPatientByDate() {
  let searchDate = prompt(
    "Informe a date de nacimento do(a) paciente: "
  ).toLowerCase();

  let resultList = db.patients.filter((patient) =>
    patient.date.toLowerCase().includes(searchDate)
  );

  console.log("RESULTADO DA BUSCA POR DATA DE NASCIMENTO: ");

  displaySearchResult(resultList, searchName);
}

function displaySearchResult(resultList, search) {
  if (resultList.length > 0) {
    resultList.forEach((patient) => {
      console.log(
        `Id: ${patient.id}, Nome: ${patient.name}, Data de nascimento: ${patient.speciality}`
      );
    });
    return;
  }
  console.log(
    `Nenhum paciente foi encontrado com base na busca informada (${search.toUpperCase()}).`
  );
}

module.exports = {
  createPatient,
  listPatient,
  updatePatient,
  deletePatient,
  searchPatientByName,
  searchPatientByDate,
};
