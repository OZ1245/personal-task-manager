import templatesApi, { ITemplate } from '@/api/templates'
import { IProjectSettings } from '@/api/projects'

export interface ITemplateParams {
  settings: IProjectSettings,
  user_id: string,
  name: string
}

export function useTemplate() { 
  // FIXME: Описать params
  const createTemplate = async (params: any): Promise<ITemplate> => {
    return await templatesApi
      .insertRow(params)
      .then(result => result)
  }

  const fetchTemplates = async (): Promise<ITemplate[]> => {
    return await templatesApi
      .selectRows()
      .then(result => result)
  }

  return {
    createTemplate,
    fetchTemplates,
  }
}