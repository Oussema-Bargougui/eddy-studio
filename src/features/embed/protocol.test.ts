import { allowedOrigins, readSession, reportablePath, studioLanguage } from './protocol'

describe('embed protocol', () => {
  it('reads the allowed EduCap origins, without duplicates or trailing slashes', () => {
    expect(allowedOrigins('https://app.educap.io/, http://localhost:3002,https://app.educap.io')).toEqual([
      'https://app.educap.io',
      'http://localhost:3002',
    ])
  })

  it('accepts space-separated origins, as given to the Docker container', () => {
    expect(allowedOrigins('https://dev.educap.io  https://staging.educap.io')).toEqual([
      'https://dev.educap.io',
      'https://staging.educap.io',
    ])
  })

  it('prefers the runtime config written at container start', () => {
    window.__EDDY_CONFIG__ = { educapOrigins: 'https://www.educap.io' }
    expect(allowedOrigins()).toEqual(['https://www.educap.io'])
    window.__EDDY_CONFIG__ = {}
    expect(allowedOrigins()).toEqual(['http://localhost:3002', 'http://localhost:3001'])
  })

  it('accepts only a well-formed session message', () => {
    expect(readSession({ type: 'eddy-studio:session', token: 'abc', locale: 'en' })?.locale).toBe('en')
    expect(readSession({ type: 'eddy-studio:session', token: '' })).toBeNull()
    expect(readSession({ type: 'other', token: 'abc' })).toBeNull()
    expect(readSession('eddy-studio:session')).toBeNull()
  })

  it('maps EduCap languages onto the ones Eddy Studio has', () => {
    expect(studioLanguage('en')).toBe('en')
    expect(studioLanguage('fr')).toBe('fr')
    expect(studioLanguage('ar')).toBe('fr')
  })

  it('never reports the technical embedded flag', () => {
    expect(reportablePath('/explorer/presence', '?classe=7B&embedded=1')).toBe('/explorer/presence?classe=7B')
    expect(reportablePath('/', '?embedded=1')).toBe('/')
  })
})
