let db = require("../../database/memoryDataBase");
const { printEntityList } = require("../../utils/entityUtils");
let formatter = require("../../utils/formatterEntity");

function createPatient(inputName, inputDate) {
  let newPatient = {
    id: Date.now().toString(),
    name: inputName,
    date: inputDate,
  };

  db.patients.push(newPatient);
}

function listAllPatients() {
  printEntityList(db.patients, formatter.patientFormatter);
}

function updatePatient(updateId, inputName, inputDate) {
  let index = db.patients.findIndex((patient) => patient.id === updateId);

  if (index === -1) return false;

  db.patients[index].name = inputName || db.patients[index].name;
  db.patients[index].date = inputDate || db.patients[index].date;

  return true;
}

function deletePatient(deleteId) {
  let index = db.patients.findIndex((patient) => patient.id === deleteId);

  if (index === -1) return false;

  db.patients.splice(index, 1);

  return true;
}

function searchPatientByName(searchName) {
  let resultList = db.patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchName)
  );

  displaySearchResult(resultList);
}

function searchPatientByDate(searchDate) {
  let resultList = db.patients.filter((patient) =>
    patient.date.toLowerCase().includes(searchDate)
  );

  displaySearchResult(resultList);
}

function displaySearchResult(resultList) {
  if (resultList.length > 0) {
    resultList.forEach((patient) => {
      console.log(
        `Id: ${patient.id}, Name: ${patient.name}, Date of birth: ${patient.date}`
      );
    });
    return;
  }
  console.log(
    `No appointment was found based on the provided search criteria.`
  );
}

module.exports = {
  createPatient,
  listAllPatients,
  updatePatient,
  deletePatient,
  searchPatientByName,
  searchPatientByDate,
};
