import templatesApi from '@/api/templates'

export function useTemplate() { 
  const createTemplate = async (params) => {
    return await templatesApi
      .insertRow(params)
      .then(result => {
        return result
      })
  }

  return {
    createTemplate
  }
}