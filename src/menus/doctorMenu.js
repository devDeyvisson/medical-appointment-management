const prompt = require("prompt-sync")();
let {
  createDoctor,
  listAllDoctors,
  updateDoctor,
  deleteDoctor,
  searchDoctorByName,
  searchDoctorBySpeciality,
} = require("../services/doctor/doctorService");

function getDoctorMenu() {
  console.log(
    "---------------------DOCTOR MENU--------------------------\n" +
      "Type [1] to ADD a doctor\n" +
      "Type [2] to LIST all doctors\n" +
      "Type [3] to UPDATE a doctor's information\n" +
      "Type [4] to REMOVE a doctor\n" +
      "Type [5] to SEARCH for a doctor\n" +
      "Type [0] to RETURN to the MAIN MENU!\n"
  );
}

function getSecondaryMenu() {
  console.log("Choose a search criterion for the doctor:");
  console.log(
    "---------------------DOCTOR MENU--------------------------\n" +
      "Type [1] to search for a doctor by name\n" +
      "Type [2] to search for a doctor by specialty\n"
  );
}

function printDoctorCreation() {
  let inputName = prompt("Enter the doctor's name: ");
  let inputSpeciality = prompt("Enter the doctor's specialty: ");

  createDoctor(inputName, inputSpeciality);

  console.log("DOCTOR REGISTERED SUCCESSFULLY!");
}

function printDoctorUpdate() {
  console.log(
    "Press enter to keep the current value if you don't want to change it."
  );

  let updateId = prompt("Enter the ID of the doctor to update: ");
  let inputName = prompt("Enter the doctor's name: ");
  let inputSpeciality = prompt("Enter the doctor's specialty: ");

  let success = updateDoctor(updateId, inputName, inputSpeciality);

  if (success) {
    console.log(`Doctor with ID ${updateId} was updated successfully!`);
  } else {
    console.log("Update failed. The provided ID does not match any doctor!");
  }
}

function printDoctorDeletion() {
  let deleteId = prompt("Enter the ID of the doctor to remove: ");

  let success = deleteDoctor(deleteId);

  if (success) {
    console.log(`Doctor with ID ${deleteId} was removed successfully!`);
  } else {
    console.log("Deletion failed. The provided ID does not match any doctor!");
  }
}

function printSearchDoctorByName() {
  let searchName = prompt("Enter the doctor's name: ").toLowerCase();

  console.log("SEARCH RESULTS BY NAME:");

  searchDoctorByName(searchName);
}

function printSearchDoctorBySpeciality() {
  let searchSpeciality = prompt("Enter the doctor's specialty: ").toLowerCase();

  console.log("SEARCH RESULTS BY SPECIALTY:");

  searchDoctorBySpeciality(searchSpeciality);
}

function searchDoctorMenuOptions() {
  let inputOption;
  do {
    getDoctorMenu();

    inputOption = prompt("Type your option here: ");

    switch (inputOption) {
      case "1":
        printDoctorCreation();
        break;
      case "2":
        listAllDoctors();
        break;
      case "3":
        printDoctorUpdate();
        break;
      case "4":
        printDoctorDeletion();
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
      printSearchDoctorByName();
      break;
    case "2":
      printSearchDoctorBySpeciality();
      break;
    default:
      console.log(
        `(${inputOption}) -> Invalid option! Only values 1 and 2 are allowed.`
      );
  }
}

module.exports = { searchDoctorMenuOptions };
