const deleteFromArray = (array, prop, value) => {
  array.forEach((element, i) => {
    if (element[prop] === value) {
      array.splice(i, 1)
    }
  })

  return array
}

export {
  deleteFromArray
}