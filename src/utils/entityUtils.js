function printEntityList(entityList, formatterFn) {
  if (entityList.length === 0) {
    console.log("The list is empty!");
    return;
  }

  console.log("LISTING: ");

  entityList.forEach((entity) => {
    console.log(formatterFn(entity));
  });
}

module.exports = {
  printEntityList,
};
