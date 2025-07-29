const db = require("../../database/memoryDataBase");
const { printEntityList } = require("../../utils/entityUtils");
let formatter = require("../../utils/formatterEntity");

function createDoctor(inputName, inputSpeciality) {
  let newDoctor = {
    id: Date.now().toString(),
    name: inputName,
    speciality: inputSpeciality,
  };

  db.doctors.push(newDoctor);
}

function listAllDoctors() {
  printEntityList(db.doctors, formatter.doctorFormatter);
}

function updateDoctor(updateId, inputName, inputSpeciality) {
  let index = db.doctors.findIndex((doctor) => doctor.id === updateId);

  if (index === -1) return false;

  db.doctors[index].name = inputName || db.doctors[index].name;
  db.doctors[index].speciality =
    inputSpeciality || db.doctors[index].speciality;

  return true;
}

function deleteDoctor(deleteId) {
  let index = db.doctors.findIndex((doctor) => doctor.id === deleteId);

  if (index === -1) return false;

  db.doctors.splice(index, 1);

  return true;
}

function searchDoctorByName(searchName) {
  let resultList = db.doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchName)
  );

  displaySearchResult(resultList);
}

function searchDoctorBySpeciality(searchSpeciality) {
  let resultList = db.doctors.filter((doctor) =>
    doctor.speciality.toLowerCase().includes(searchSpeciality)
  );

  displaySearchResult(resultList);
}

function displaySearchResult(resultList) {
  if (resultList.length > 0) {
    resultList.forEach((doctor) => {
      console.log(
        `Id: ${doctor.id}, Name: ${doctor.name}, Speciality: ${doctor.speciality}`
      );
    });
    return;
  }

  console.log(
    `No appointment was found based on the provided search criteria.`
  );
}

module.exports = {
  createDoctor,
  listAllDoctors,
  updateDoctor,
  deleteDoctor,
  searchDoctorByName,
  searchDoctorBySpeciality,
};
