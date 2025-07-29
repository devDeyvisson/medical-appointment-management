const prompt = require("prompt-sync")();
let {
  createPatient,
  listAllPatients,
  updatePatient,
  deletePatient,
  searchPatientByDate,
  searchPatientByName,
} = require("../services/patient/patientService");

function getPatientMenu() {
  console.log(
    "-----------------PATIENT MENU----------------------\n" +
      "Type [1] to ADD a patient\n" +
      "Type [2] to LIST all patients\n" +
      "Type [3] to UPDATE a patient's information\n" +
      "Type [4] to REMOVE a patient\n" +
      "Type [5] to SEARCH for a patient\n" +
      "Type [0] to RETURN to the MAIN MENU!\n"
  );
}

function getSecondaryMenu() {
  console.log("Choose a search criterion for the patient:");
  console.log(
    "----------------------PATIENT MENU-------------------------\n" +
      "Type [1] to search for a patient by name\n" +
      "Type [2] to search for a patient by date of birth\n"
  );
}

function printPatientCreation() {
  let inputName = prompt("Enter the patient's name: ");
  let inputDate = prompt("Enter the patient's date of birth: ");

  createPatient(inputName, inputDate);

  console.log("PATIENT REGISTERED SUCCESSFULLY!");
}

function printPatientUpdate() {
  console.log(
    "Press enter to keep the current value if you don't want to change it."
  );

  let updateId = prompt("Enter the ID of the patient to update: ");
  let inputName = prompt("Enter the patient's name: ");
  let inputDate = prompt("Enter the patient's date of birth: ");

  let success = updatePatient(updateId, inputName, inputDate);

  if (success) {
    console.log(`Patient with ID ${updateId} was updated successfully!`);
  } else {
    console.log("Update failed. The provided ID does not match any patient!");
  }
}

function printPatientDeletion() {
  let deleteId = prompt("Enter the ID of the patient to remove: ");

  let success = deletePatient(deleteId);

  if (success) {
    console.log(`Patient with ID ${deleteId} was removed successfully!`);
  } else {
    console.log("Deletion failed. The provided ID does not match any patient!");
  }
}

function printSearchPatientByName() {
  let searchName = prompt("Enter the patient's name: ").toLowerCase();

  console.log("SEARCH RESULTS BY NAME:");

  searchPatientByName(searchName);
}

function printSearchPatientByDate() {
  let searchDate = prompt("Enter the patient's date of birth: ").toLowerCase();

  console.log("SEARCH RESULTS BY DATE OF BIRTH:");

  searchPatientByDate(searchDate);
}

function searchPatientMenuOptions() {
  let inputOption;
  do {
    getPatientMenu();

    inputOption = prompt("Type your option here: ");

    switch (inputOption) {
      case "1":
        printPatientCreation();
        break;
      case "2":
        listAllPatients();
        break;
      case "3":
        printPatientUpdate();
        break;
      case "4":
        printPatientDeletion();
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

  const inputOption = prompt("Type your option here: ");

  switch (inputOption) {
    case "1":
      printSearchPatientByName();
      break;
    case "2":
      printSearchPatientByDate();
      break;
    default:
      console.log(
        `(${inputOption}) -> Invalid option! Only values 1 and 2 are allowed.`
      );
  }
}

module.exports = { searchPatientMenuOptions };
