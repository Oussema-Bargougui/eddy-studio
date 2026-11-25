import { getRouteApi } from '@tanstack/react-router'
import { ExplorePage } from './ExplorePage'
import { isThemeId } from './themes'

const route = getRouteApi('/_app/explorer/$theme')

/** Reads the theme from the URL and the open class from `?classe=`. */
export function ExploreRoute() {
  const { theme } = route.useParams()
  const { classe } = route.useSearch()
  return isThemeId(theme) ? <ExplorePage theme={theme} classId={classe} /> : null
}
