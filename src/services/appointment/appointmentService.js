let db = require("../../database/memoryDataBase");
const { printEntityList } = require("../../utils/entityUtils");
let formatter = require("../../utils/formatterEntity");

function createAppointment(
  inputDoctorId,
  inputPatientId,
  inputDate,
  inputDescription
) {
  const doctorExists = db.doctors.some((doctor) => doctor.id === inputDoctorId);
  const patientExists = db.patients.some(
    (patient) => patient.id === inputPatientId
  );

  if (!doctorExists || !patientExists) {
    console.log(
      "The doctor's or patient's ID does not match any registered record in the database!"
    );
    return false;
  }

  let newAppointment = {
    id: Date.now().toString(),
    doctorId: inputDoctorId,
    patientId: inputPatientId,
    date: inputDate,
    description: inputDescription,
  };

  db.appointments.push(newAppointment);
  return true;
}

function listAllAppointments() {
  printEntityList(db.appointments, formatter.appointmentFormatter);
}

function updateAppointment(
  updateId,
  inputDoctorId,
  inputPatientId,
  inputDate,
  inputDescription
) {
  let index = db.appointments.findIndex(
    (appointment) => appointment.id === updateId
  );

  if (index === -1) return false;

  db.appointments[index].doctorId =
    inputDoctorId || db.appointments[index].doctorId;

  db.appointments[index].patientId =
    inputPatientId || db.appointments[index].patientId;

  db.appointments[index].date = inputDate || db.appointments[index].inputDate;

  db.appointments[index].description =
    inputDescription || db.appointments[index].description;

  return true;
}

function deleteAppointment(deleteId) {
  let index = db.appointments.findIndex(
    (appointment) => appointment.id === deleteId
  );

  if (index === -1) return false;

  db.appointments.splice(index, 1);

  return true;
}

function searchAppointmentByDate(searchDate) {
  let resultList = db.appointments.filter((appointment) =>
    appointment.date.toLowerCase().includes(searchDate)
  );

  displaySearchResult(resultList);
}

function searchAppointmentByDoctorId(searchDoctorId) {
  let resultList = db.appointments.filter((appointment) =>
    appointment.doctorId.toLowerCase().includes(searchDoctorId)
  );

  displaySearchResult(resultList);
}

function searchAppointmentByPatientId(searchPatientId) {
  let resultList = db.appointments.filter((appointment) =>
    appointment.patientId.toLowerCase().includes(searchPatientId)
  );

  displaySearchResult(resultList);
}

function displaySearchResult(resultList) {
  if (resultList.length > 0) {
    resultList.forEach((appointment) => {
      console.log(
        `Id: ${appointment.id}, Doctor: ${appointment.doctorId}, Patient: ${appointment.patientId}, Appointment date: ${appointment.date}, Description: ${appointment.description}`
      );
    });
    return;
  }
  console.log(
    `No appointment was found based on the provided search criteria.`
  );
}

module.exports = {
  createAppointment,
  listAllAppointments,
  updateAppointment,
  deleteAppointment,
  searchAppointmentByDate,
  searchAppointmentByDoctorId,
  searchAppointmentByPatientId,
};
