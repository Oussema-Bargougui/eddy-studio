import { Outlet } from '@tanstack/react-router'
import { CommandBar } from '../command/CommandBar'
import { EddyLayer } from '../eddy/EddyLayer'
import { EmbedBridge } from '../embed/EmbedBridge'
import { useShortcuts } from './useShortcuts'

/** Every page, plus the two global layers that can open over any of them. */
export function RootLayout() {
  useShortcuts()
  return (
    <>
      <EmbedBridge />
      <Outlet />
      <EddyLayer />
      <CommandBar />
    </>
  )
}
