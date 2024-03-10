
const updateExistingObject = (async (model, objectId, newData) =>{
    const existingObject = await model.findById(objectId);
  if (existingObject) {
    existingObject.set(newData);
    await existingObject.save();
    return existingObject;
  } else {
    return null;
  }
})

export {updateExistingObject}