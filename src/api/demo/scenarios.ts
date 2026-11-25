import type { Lesson, ScenarioSummary, SubstituteChoice, Teacher } from '../types'

export const demoScenarios: ScenarioSummary[] = [
  {
    id: 'absent-teacher', group: 'daily', icon: 'A', featured: true, available: true,
    title: 'Un enseignant est absent', desc: 'Ses cours, les remplaçants libres, et les familles prévenues.',
    steps: 5, saves: '20 min', badge: { label: '4 cours à couvrir', tone: 'bad' },
  },
  {
    id: 'unexcused-absences', group: 'daily', icon: 'J', available: false,
    title: 'Suivre les absences non justifiées', desc: 'Repérer les élèves, écrire aux parents, relancer si besoin.',
    steps: 4, saves: '30 min', badge: { label: '23 élèves', tone: 'bad' },
  },
  {
    id: 'behaviour-incident', group: 'daily', icon: 'I', available: false,
    title: 'Gérer un incident de comportement', desc: 'Sanction juste, rendez-vous parents et message, en une fois.',
    steps: 4, saves: '15 min',
  },
  {
    id: 'pending-requests', group: 'daily', icon: 'D', available: false,
    title: 'Traiter les demandes en attente', desc: "Rendez-vous et réservations, acceptés ou refusés d'un coup.",
    steps: 3, saves: '10 min', badge: { label: '5 en attente', tone: 'warn' },
  },
  {
    id: 'complete-timetable', group: 'regular', icon: 'E', available: false,
    title: "Compléter l'emploi du temps", desc: 'Les heures manquantes, placées sans conflit de salle ni de prof.',
    steps: 4, saves: '45 min', badge: { label: '5 h à placer', tone: 'warn' },
  },
  {
    id: 'inform-parents', group: 'regular', icon: 'P', available: false,
    title: "Informer les parents d'une classe", desc: 'Un message clair, une famille par fil, accusé de lecture.',
    steps: 3, saves: '10 min',
  },
  {
    id: 'payment-reminders', group: 'regular', icon: '€', available: false,
    title: 'Relancer les paiements en retard', desc: 'Les familles en retard, par service, SMS ou e-mail à la date choisie.',
    steps: 4, saves: '25 min', badge: { label: '62 familles', tone: 'bad' },
  },
  {
    id: 'publish-reports', group: 'period', icon: 'B', available: false,
    title: 'Publier les bulletins', desc: 'Vérifier, valider puis publier, classe par classe.',
    steps: 4, saves: '1 h', badge: { label: '62 % prêts', tone: 'neutral' },
  },
  {
    id: 'plan-exams', group: 'period', icon: 'X', available: false,
    title: 'Planifier des examens', desc: 'Créneaux, salles et surveillant, sans chevauchement.',
    steps: 4, saves: '1 h',
  },
  {
    id: 'back-to-school', group: 'period', icon: 'R', available: false,
    title: 'Préparer la rentrée', desc: 'Inscriptions acceptées, élèves répartis dans les classes.',
    steps: 5, saves: '2 h',
  },
]

export const demoSimpleOperations = [
  'Ajouter un élève', 'Créer une classe', 'Déplacer un cours', 'Réserver une salle',
  'Changer de prof principal', 'Archiver un élève', 'Ajouter une sanction', 'Envoyer un message',
]

export const demoTeachers: Teacher[] = [
  { id: 't-bernard', name: 'Nicolas Bernard', initials: 'NB', subject: 'Mathématiques', weeklyHours: 18 },
  { id: 't-trabelsi', name: 'Nadia Trabelsi', initials: 'NT', subject: 'Mathématiques', weeklyHours: 16 },
  { id: 't-haddad', name: 'Karim Haddad', initials: 'KH', subject: 'Mathématiques', weeklyHours: 14 },
  { id: 't-dubois', name: 'Claire Dubois', initials: 'CD', subject: 'Français', weeklyHours: 18 },
  { id: 't-moreau', name: 'Julien Moreau', initials: 'JM', subject: 'Anglais', weeklyHours: 17 },
]

export const demoLessons: Lesson[] = [
  { id: 'l-1', date: '2026-11-26', time: '08:00', className: '6ème A', subject: 'Mathématiques', room: 'Salle 12' },
  { id: 'l-2', date: '2026-11-26', time: '10:00', className: '7ème B', subject: 'Mathématiques', room: 'Salle 12' },
  { id: 'l-3', date: '2026-11-26', time: '11:00', className: '8ème C', subject: 'Mathématiques', room: 'Salle 9' },
  { id: 'l-4', date: '2026-11-26', time: '14:00', className: '9ème A', subject: 'Mathématiques', room: 'Salle 12' },
]

const trabelsi = { id: 't-trabelsi', label: 'Mme Trabelsi — maths, libre' }
const haddad = { id: 't-haddad', label: 'M. Haddad — maths, libre' }

export const demoSubstitutes: SubstituteChoice[] = [
  { lessonId: 'l-1', options: [trabelsi, haddad], suggestedId: 't-trabelsi' },
  { lessonId: 'l-2', options: [haddad], suggestedId: 't-haddad' },
  { lessonId: 'l-3', options: [trabelsi], suggestedId: 't-trabelsi' },
  { lessonId: 'l-4', options: [] },
]
