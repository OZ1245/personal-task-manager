import fieldTypes from "@/api/fieldTypes";

export function useFieldType() {
  const fetchFieldTypes = async () => {
    return await fieldTypes
      .readAll()
      .then(result => {
        return result
      })
  }

  return {
    fetchFieldTypes,
  }
}