import { useMutation, useQuery } from '@tanstack/react-query'
import { useDataSource } from './useDataSource'

/** One key per resource, so invalidation after an action stays precise. */
export const keys = {
  briefing: ['briefing'] as const,
  attendance: ['attendance'] as const,
  classFile: (id: string) => ['class-file', id] as const,
  catalogue: ['scenario-catalogue'] as const,
  teachers: ['teachers'] as const,
  lessons: (teacherId: string, from: string, to: string) => ['lessons', teacherId, from, to] as const,
  substitutes: (ids: string[]) => ['substitutes', ...ids] as const,
}

export function useBriefing() {
  const source = useDataSource()
  return useQuery({ queryKey: keys.briefing, queryFn: () => source.getBriefing() })
}

export function useAttendanceTheme() {
  const source = useDataSource()
  return useQuery({ queryKey: keys.attendance, queryFn: () => source.getAttendanceTheme() })
}

export function useClassFile(classId: string | undefined) {
  const source = useDataSource()
  return useQuery({
    queryKey: keys.classFile(classId ?? ''),
    queryFn: () => source.getClassFile(classId!),
    enabled: Boolean(classId),
  })
}

export function useScenarioCatalogue() {
  const source = useDataSource()
  return useQuery({ queryKey: keys.catalogue, queryFn: () => source.getScenarioCatalogue() })
}

export function useTeachers() {
  const source = useDataSource()
  return useQuery({ queryKey: keys.teachers, queryFn: () => source.getTeachers() })
}

export function useTeacherLessons(teacherId: string | undefined, from: string, to: string) {
  const source = useDataSource()
  return useQuery({
    queryKey: keys.lessons(teacherId ?? '', from, to),
    queryFn: () => source.getTeacherLessons(teacherId!, from, to),
    enabled: Boolean(teacherId && from && to),
  })
}

export function useSubstitutes(lessonIds: string[]) {
  const source = useDataSource()
  return useQuery({
    queryKey: keys.substitutes(lessonIds),
    queryFn: () => source.getSubstitutes(lessonIds),
    enabled: lessonIds.length > 0,
  })
}

export function useAskEddy() {
  const source = useDataSource()
  return useMutation({ mutationFn: (question: string) => source.askEddy(question) })
}
