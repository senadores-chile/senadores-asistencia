import test from 'ava'
import senadoresAsistencia from './'

test('senadores-asistencia does something awesome', async t => {
  t.plan(1)
  const result = await senadoresAsistencia()
  t.truthy(result)
})
