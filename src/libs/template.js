import templatesApi from '@/api/templates'

export function useTemplate() { 
  const createTemplate = async (params) => {
    return await templatesApi
      .insertRow(params)
      .then(result => {
        return result
      })
  }

  const fetchTemplates = async () => {
    return await templatesApi
      .selectRows()
      .then(result => result || [])
  }

  return {
    createTemplate,
    fetchTemplates,
  }
}