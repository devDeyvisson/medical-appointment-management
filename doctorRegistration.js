const prompt = require("prompt-sync")();
const db = require("./memoryDataBase");

function createDoctor() {
  let inputName = prompt("Informe o nome do(a) Médico: ");
  let inputSpeciality = prompt("Informe a especialidade do(a) médico: ");

  let newDoctor = {
    id: Date.now().toString(),
    name: inputName,
    speciality: inputSpeciality,
  };

  db.doctors.push(newDoctor);
  console.log("MÉDICO(A) CADASTRADO COM SUCESSO!");
}

function listDoctors() {
  if (db.doctors.length === 0) {
    console.log("A lista de médicos está vazia!");
    return;
  }

  console.log("LISTA DE MÉDICOS: ");

  db.doctors.forEach((doctor) => {
    console.log(
      `Id: ${doctor.id}, Nome: ${doctor.name}, Especialidade: ${doctor.speciality}`
    );
  });
}

function updateDoctor() {
  let updateId = prompt("Informe o id do(a) médico(a) que deseja atualizar: ");

  let index = db.doctors.findIndex((doctor) => doctor.id === updateId);

  if (index !== -1) {
    console.log(
      "Digite enter para continuar, ou seja, se não quiser alterar algum valor."
    );

    let inputName = prompt("Informe o nome do(a) médico(a): ");
    let inputSpeciality = prompt("Informe a especialidade do(a) médico(a): ");

    db.doctors[index].name = inputName || db.doctors[index].name;
    db.doctors[index].speciality =
      inputSpeciality || db.doctors[index].speciality;

    console.log(
      `Os dados do(a) médico(a) com o Id: ${updateId} foram atualizados com sucesso!`
    );

    return;
  }
  console.log(
    "Não foi possível atualizar, pois o id informado não pertence a nenhum médico!"
  );
}

function deleteDoctor() {
  let deleteId = prompt("Informe o id do(a) médico(a) que eseja remover: ");

  let index = db.doctors.findIndex((doctor) => doctor.id === deleteId);

  if (index !== -1) {
    let deletedDoctor = db.doctors[index].name;
    db.doctors.splice(index, 1);
    console.log(`O/A médico(a) ${deletedDoctor} foi removido(a) com sucesso!`);
    return;
  }
  console.log(
    "Não foi possível remover, pois o id informado não pertence a nenhum médico!"
  );
}

function searchDoctorByName() {
  let searchName = prompt("Informe o nome do(a) médico(a): ").toLowerCase();

  let resultList = db.doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchName)
  );

  console.log("RESULTADO DA BUSCA POR NOME: ");

  displaySearchResult(resultList, searchName);
}

function searchDoctorBySpeciality() {
  let searchSpeciality = prompt(
    "Informe a especialidade do(a) médico(a): "
  ).toLowerCase();

  let resultList = db.doctors.filter((doctor) =>
    doctor.speciality.toLowerCase().includes(searchSpeciality)
  );

  console.log("RESULTADO DA BUSCA POR ESPECIALIDADE: ");

  displaySearchResult(resultList, searchSpeciality);
}

function displaySearchResult(resultList, search) {
  if (resultList.length > 0) {
    resultList.forEach((doctor) => {
      console.log(
        `Id: ${doctor.id}, Nome: ${doctor.name}, Especialidade: ${doctor.speciality}`
      );
    });
    return;
  }
  console.log(
    `Nenhum medico foi encontrado com base na busca informada (${search.toUpperCase()}).`
  );
}

module.exports = {
  createDoctor,
  listDoctors,
  updateDoctor,
  deleteDoctor,
  searchDoctorByName,
  searchDoctorBySpeciality,
};
