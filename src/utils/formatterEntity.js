function doctorFormatter(doctor) {
  return `Id: ${doctor.id}, Name: ${doctor.name}, Speciality: ${doctor.speciality}`;
}
function patientFormatter(patient) {
  return `Id: ${patient.id}, Name: ${patient.name}, Date of birth: ${patient.date}`;
}
function appointmentFormatter(appointment) {
  return `Id: ${appointment.id}, Doctor: ${appointment.doctorId}, Patient: ${appointment.patientId}, Appointment date: ${appointment.date}, Description: ${appointment.description}`;
}

module.exports = {
  doctorFormatter,
  patientFormatter,
  appointmentFormatter,
};
