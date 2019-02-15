import { NbMenuItem } from '@nebular/theme';

export const PROFESSEUR_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Mon Profile',
    icon: 'nb-person',
    link: '/pages/profile',
    home: true,
  },
  {
    title: 'ELEMENTS',
    group: true,
  },
  {
    title: 'Mes Encadrements',
    icon: 'nb-list',
    link: '/pages/professeur/stages',
  },
  {
    title: 'Mes Enseignements',
    icon: 'nb-layout-two-column',
    link: '/pages/professeur/enseignements',
  },
];

export const ETUDIANT_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Mon Profile',
    icon: 'nb-person',
    link: '/pages/profile',
    home: true,
  },
  {
    title: 'ELEMENTS',
    group: true,
  },
  {
    title: 'Mes Stages',
    icon: 'nb-list',
    link: '/pages/etudiant/stages',
  },
  {
    title: 'Mes Modules',
    icon: 'nb-layout-two-column',
    link: '/pages/etudiant/modules',
  },
];

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'ELEMENTS',
    group: true,
  },
  {
    title: 'Departements',
    icon: 'nb-list',
    link: '/pages/departements/departement',
  },
  {
    title: 'Filieres',
    icon: 'nb-shuffle',
    link: '/pages/filieres/filiere',
  },
  {
    title: 'Professeurs',
    icon: 'nb-person',
    children: [
      {
        title: 'Liste des professeurs',
        link: '/pages/professeurs/professeur',
      },
      {
        title: 'Importer des professeurs',
        link: '/pages/professeurs/import',
      }
    ]
  },
  {
    title: 'Etudiants',
    icon: 'nb-person',
    children: [
      {
        title: 'Liste des étudiants',
        link: '/pages/etudiants/etudiant',
      },
      {
        title: 'Importer des étudiants',
        link: '/pages/etudiants/import',
      }
    ]
  },
  {
    title: 'Modules',
    icon: 'nb-layout-two-column',
    link: '/pages/modules/module',
  },
  {
    title: 'Enseignements',
    icon: 'nb-gear',
    link: '/pages/enseignements/enseignement',
  },
  {
    title: 'Sociétés',
    icon: 'nb-grid-b-outline',
    link: '/pages/societes/societe',
  },
  {
    title: 'Stages',
    icon: 'nb-compose',
    link: '/pages/stages/stage',
  }
];
