const deleteFromArray = (array: any[], value: string, prop: string) => {
  array.forEach((element, i) => {
    if (typeof prop !== 'undefined') {
      if (element[prop] === value) {
        array.splice(i, 1)
      }
    } else {
      if (element === value) {
        array.splice(i, 1)
      }
    }
  })

  return array
}

export {
  deleteFromArray
}