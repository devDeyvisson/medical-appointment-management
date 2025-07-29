const prompt = require("prompt-sync")();
let db = require("../database/memoryDataBase");
let {
  createAppointment,
  listAllAppointments,
  updateAppointment,
  deleteAppointment,
  searchAppointmentByDate,
  searchAppointmentByDoctorId,
  searchAppointmentByPatientId,
} = require("../services/appointment/appointmentService");

function getAppointmentMenu() {
  console.log(
    "----------------------APPOINTMENT MENU-------------------------\n" +
      "Type [1] to ADD a new appointment\n" +
      "Type [2] to LIST all appointments\n" +
      "Type [3] to UPDATE an appointment\n" +
      "Type [4] to DELETE an appointment\n" +
      "Type [5] to SEARCH for an appointment\n" +
      "Type [0] to RETURN to the MAIN MENU!\n"
  );
}

function getSecondaryMenu() {
  console.log("Choose a criterion to SEARCH for an appointment:");
  console.log(
    "----------------------APPOINTMENT MENU-------------------------\n" +
      "Type [1] to search for an appointment by date\n" +
      "Type [2] to search for an appointment by doctor's ID\n" +
      "Type [3] to search for an appointment by patient's ID\n"
  );
}

function printAppointmentCreation() {
  if (db.doctors.length === 0 || db.patients.length === 0) {
    console.log(
      "There are no registered doctors or patients to schedule an appointment!"
    );
    return;
  }

  let inputDoctorId = prompt("Enter the doctor's ID: ");
  let inputPatientId = prompt("Enter the patient's ID: ");
  let inputDate = prompt("Enter the appointment date: ");
  let inputDescription = prompt("Enter a description for the appointment: ");

  let success = createAppointment(
    inputDoctorId,
    inputPatientId,
    inputDate,
    inputDescription
  );

  if (success) {
    console.log("APPOINTMENT SUCCESSFULLY REGISTERED!");
  }
}

function printAppointmentUpdate() {
  console.log(
    "Press enter to keep the current value if you don't want to change it."
  );

  let updateId = prompt("Enter the ID of the appointment to update: ");

  let inputDoctorId = prompt("Enter the doctor's ID: ");
  let inputPatientId = prompt("Enter the patient's ID: ");
  let inputDate = prompt("Enter the appointment date: ");
  let inputDescription = prompt("Enter a description for the appointment: ");

  let success = updateAppointment(
    updateId,
    inputDoctorId,
    inputPatientId,
    inputDate,
    inputDescription
  );

  if (success) {
    console.log(`Appointment with ID ${updateId} was updated successfully!`);
  } else {
    console.log(
      "Update failed. The provided ID does not match any appointment!"
    );
  }
}

function printAppointmentDeletion() {
  let deleteId = prompt("Enter the ID of the appointment to delete: ");

  let success = deleteAppointment(deleteId);

  if (success) {
    console.log(`Appointment with ID ${deleteId} was deleted successfully!`);
  } else {
    console.log(
      "Deletion failed. The provided ID does not match any appointment!"
    );
  }
}

function printSearchAppointmentByDate() {
  let searchDate = prompt("Enter the appointment date: ").toLowerCase();

  console.log("SEARCH RESULTS BY DATE:");

  searchAppointmentByDate(searchDate);
}

function printSearchAppointmentByDoctorId() {
  let searchDoctorId = prompt("Enter the doctor's ID: ").toLowerCase();

  console.log("SEARCH RESULTS BY DOCTOR ID:");

  searchAppointmentByDoctorId(searchDoctorId);
}

function printSearchAppointmentByPatientId() {
  let searchPatientId = prompt("Enter the patient's ID: ").toLowerCase();

  console.log("SEARCH RESULTS BY PATIENT ID:");

  searchAppointmentByPatientId(searchPatientId);
}

function searchAppointmentMenuOptions() {
  let inputOption;
  do {
    getAppointmentMenu();

    inputOption = prompt("Type your option here: ");

    switch (inputOption) {
      case "1":
        printAppointmentCreation();
        break;
      case "2":
        listAllAppointments();
        break;
      case "3":
        printAppointmentUpdate();
        break;
      case "4":
        printAppointmentDeletion();
        break;
      case "5":
        searchSecondaryMenuOption();
        break;
      case "0":
        console.log("RETURNING TO MAIN MENU...");
        break;
      default:
        console.log("Invalid option! Please try again.");
    }
  } while (inputOption !== "0");
}

function searchSecondaryMenuOption() {
  getSecondaryMenu();

  let inputOption = prompt("Type your option here: ");

  switch (inputOption) {
    case "1":
      printSearchAppointmentByDate();
      break;
    case "2":
      printSearchAppointmentByDoctorId();
      break;
    case "3":
      printSearchAppointmentByPatientId();
      break;
    default:
      console.log(
        `(${inputOption}) -> Invalid option! Only values 1, 2, and 3 are allowed.`
      );
  }
}

module.exports = {
  searchAppointmentMenuOptions,
};
