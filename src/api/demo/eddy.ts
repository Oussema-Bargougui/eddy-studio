import type { EddyAnswer } from '../types'

const drop7B: Omit<EddyAnswer, 'question'> = {
  steps: ["Registre d'appel, 5 semaines", "Comparé à l'école", "Croisé avec l'emploi du temps"],
  headline: 'La 7ème B perd 5,7 points en 5 semaines, et presque tout se joue le vendredi après-midi.',
  body:
    "**72 %** de ses absences tombent entre 14h et 16h le vendredi (SVT puis EPS). Trois élèves en concentrent la moitié, et **21 h sur 38** ne sont pas justifiées. Le reste de la semaine, la classe est dans la moyenne de l'école.",
  chart: {
    title: "Heures d'absence de la 7ème B, par créneau",
    bars: [
      { label: 'Lun', value: 3 },
      { label: 'Mar', value: 2 },
      { label: 'Mer', value: 2.5 },
      { label: 'Jeu', value: 3.5 },
      { label: 'Ven 14–16h', value: 27, highlight: true },
    ],
  },
  sources: ["registre d'appel", 'emploi du temps 7ème B', 'analyse faite à la demande'],
  scenario: { id: 'unexcused-absences', title: 'Suivre les absences non justifiées' },
  suggestions: ['Qui sont les 3 élèves ?', 'Et la 9ème A ?', "Comparer avec l'an dernier"],
}

const schoolDrop: Omit<EddyAnswer, 'question'> = {
  steps: ["Registre d'appel, 11 semaines", "Comparé à l'an dernier"],
  headline: "La présence baisse de 0,8 point cette semaine, tirée par deux classes.",
  body:
    "Sans la **7ème B** et la **9ème A**, l'école serait à 94,9 %, dans sa zone habituelle. Le creux se concentre le **vendredi après-midi** (7,9 % d'absences contre 4,3 % en moyenne).",
  chart: {
    title: "Taux d'absence par jour (%)",
    bars: [
      { label: 'Lun', value: 4.8 },
      { label: 'Mar', value: 4.1 },
      { label: 'Mer', value: 3.6 },
      { label: 'Jeu', value: 4.3 },
      { label: 'Ven', value: 7.9, highlight: true },
      { label: 'Sam', value: 5.2 },
    ],
  },
  sources: ["registre d'appel", 'analyse faite à la demande'],
  scenario: { id: 'unexcused-absences', title: 'Suivre les absences non justifiées' },
  suggestions: ['Pourquoi la 7ème B décroche ?', 'Quelles classes vont bien ?', "Comparer avec l'an dernier"],
}

const fallback: Omit<EddyAnswer, 'question'> = {
  steps: ['Question lue'],
  headline: "Je n'ai pas encore cette analyse dans la démo.",
  body:
    'Dans la version reliée à EduCap, je lirai les données nécessaires pour répondre. Essayez une des questions proposées.',
  sources: [],
  suggestions: ['Pourquoi la 7ème B décroche ?', 'Pourquoi la présence a-t-elle baissé ?'],
}

/** Picks the recorded demo answer that fits the question. */
export function demoAnswer(question: string): EddyAnswer {
  const q = question.toLowerCase()
  if (q.includes('7') && (q.includes('b') || q.includes('décroch'))) return { question, ...drop7B }
  if (q.includes('présence') || q.includes('baiss') || q.includes('pourquoi')) return { question, ...schoolDrop }
  return { question, ...fallback }
}
