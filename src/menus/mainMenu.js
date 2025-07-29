const prompt = require("prompt-sync")();
let { searchDoctorMenuOptions } = require("./doctorMenu");
let { searchPatientMenuOptions } = require("./patientMenu");
let { searchAppointmentMenuOptions } = require("./appointmentMenu");

function getMainMenu() {
  console.log(
    "-----------------MAIN MENU----------------------\n" +
      "Type [1] to MANAGE DOCTORS\n" +
      "Type [2] to MANAGE PATIENTS\n" +
      "Type [3] to MANAGE APPOINTMENTS\n" +
      "Type [0] to EXIT!\n"
  );
}

function searchMainMenuOptions() {
  let inputOption;
  do {
    getMainMenu();

    inputOption = prompt("Type option here: ");

    switch (inputOption) {
      case "1":
        searchDoctorMenuOptions();
        break;
      case "2":
        searchPatientMenuOptions();
        break;
      case "3":
        searchAppointmentMenuOptions();
        break;
      case "0":
        console.log("LEAVING...");
        break;
      default:
        console.log("Invalid option! Please try again.");
    }
  } while (inputOption !== "0");
}

module.exports = {
  searchMainMenuOptions,
};
