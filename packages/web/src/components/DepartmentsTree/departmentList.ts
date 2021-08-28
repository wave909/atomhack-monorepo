import {Department} from "../DepartmentCard/department";

export const findByPath = (path: string[]) => {
  return departmentList.find(department =>
    department.path.length === path.length &&
    department.path.every((number, numberIdx) => number === path[numberIdx]))
  }


export const departmentList: Department[] = [
  {
    title: 'Аппарат главы администрации Сосновоборского городского округа',
    description: '',
    employees: [],
    path: ['1']

  },
  {
    title: 'Централизованная бухгалтерия',
    description: '',
    employees: [],
    path: ['1', '1']

  },
  {
    title: 'Юридический отдел',
    description: '',
    employees: [],
    path: ['1', '2']

  },
  {
    title: 'Отдел кадров и спецработы',
    description: '',
    employees: [],
    path: ['1', '3']

  },
  {
    title:
      'Комитет финансов администрации муниципального образования Сосновоборский городской округ Ленинградской области с правами юридического лица (Комитет финансов Сосновоборского городского округа)',
    description: '',
    employees: [],
    path: ['1', '4']

  },
  {
    title:
      'Отдел внутреннего муниципального финансового контроля и внутреннего финансового аудита.',
    description: '',
    employees: [],
    path: ['1', '4','1']

  },
  {
    title:
      'Комитет по управлению жилищно-коммунальным хозяйством, в состав которого входят следующие отраслевые (функциональные) органы:',
    description: '',
    employees: [],
    path: ['1', '5']

  },
  {
    title: 'Отдел жилищно-коммунального хозяйства',
    description: '',
    employees: [],
    path: ['1', '5','1']

  },
  {
    title: 'Отдел капитального строительства',
    description: '',
    employees: [],
    path: ['1', '5','2']

  },
  {
    title: 'Отдел внешнего благоустройства и дорожного хозяйства.',
    description: '',
    employees: [],
    path: ['1', '5','3']

  },
  {
    title:
      'Комитет по управлению муниципальным имуществом администрации муниципального образования Сосновоборский городской округ Ленинградской области с правами юридического лица (КУМИ Сосновоборского городского округа)',
    description: '',
    employees: [],
    path: ['1', '6']

  },
  {
    title: 'Жилищный отдел',
    description: '',
    employees: [],
    path: ['1', '6','1']

  },
  {
    title: 'Отдел муниципального заказа',
    description: '',
    employees: [],
    path: ['1', '6','2']

  },
  {
    title: 'Отдел экономического развития',
    description: '',
    employees: [],
    path: ['1', '6','3']

  },
  {
    title: 'Комитет архитектуры, градостроительства и землепользования',
    description: '',
    employees: [],
    path: ['1', '6','4']

  },
  {
    title:
      'Отдел внутреннего муниципального финансового контроля и внутреннего финансового аудита',
    description: '',
    employees: [],
    path: ['1', '6','5']

  },
  {
    title:
      'Комитет по общественной безопасности и информации, в состав которого входят следующие отраслевые (функциональные) органы:',
    description: '',
    employees: [],
    path: ['1', '7']

  },
  {
    title: 'Отдел общественной безопасности',
    description: '',
    employees: [],
    path: ['1', '7', '1']

  },
  {
    title: 'Отдел гражданской защиты',
    description: '',
    employees: [],
    path: ['1', '7','2']

  },
  {
    title: 'Отдел по связям с общественностью (пресс-центр)',
    description: '',
    employees: [],
    path: ['1', '7','3']

  },
  {
    title: 'Отдел информационных технологий и защиты информации.',
    description: '',
    employees: [],
    path: ['1', '7','4']

  },
  {
    title: 'Отдел муниципального контроля',
    description: '',
    employees: [],
    path: ['1', '8']

  },
  {
    title: 'Отдел природопользования и экологической безопасности',
    description: '',
    employees: [],
    path: ['1', '9']

  },
  {
    title: 'Общий отдел',
    description: '',
    employees: [],
    path: ['1', '10']

  },
  {
    title: 'Архивный отдел',
    description: '',
    employees: [],
    path: ['1', '11']

  },
  {
    title: 'Административная комиссия',
    description: '',
    employees: [],
    path: ['1', '12']

  },
  {
    title:
      'Комитет образования администрации муниципального образования Сосновоборский городской округ Ленинградской области с правами юридического лица (Комитет образования Сосновоборского городского округа)',
    description: '',
    employees: [],
    path: ['1', '13']

  },
  {
    title: 'Отдел социальных программ',
    description: '',
    employees: [],
    path: ['1', '13','1']

  },
  {
    title: 'Отдел по развитию культуры и туризма',
    description: '',
    employees: [],
    path: ['1', '13','2']

  },
  {
    title: 'Отдел по молодежной политике',
    description: '',
    employees: [],
    path: ['1', '13','3']

  },
  {
    title: 'Отдел по физической культуре и спорту',
    description: '',
    employees: [],
    path: ['1', '13','4']

  },
  {
    title: 'Отдел записи актов гражданского состояния (отдел ЗАГС)',
    description: '',
    employees: [],
    path: ['1', '13','5']

  },
  {
    title: 'Отдел опеки и попечительства',
    description: '',
    employees: [],
    path: ['1', '13','6']

  },
  {
    title:
      'Отдел по обеспечению деятельности комиссии по делам несовершеннолетних и защите их прав.',
    description: '',
    employees: [],
    path: ['1', '13','7']

  },
]