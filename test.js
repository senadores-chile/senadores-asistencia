import test from 'ava'
import senadoresAsistencia from './'

test('default options', async t => {
  t.plan(5)

  const result = await senadoresAsistencia()
  t.is(result.length, 1)
  t.true(result[0].hasOwnProperty('sala'))
  t.true(result[0].hasOwnProperty('comisiones'))
  t.is(result[0].sala.periodo.legislatura, 487)
  t.is(result[0].comisiones.periodo, 2016)
})

test('validations', t => {
  t.plan(1)

  t.pass()
})

test('custom options', t => {
  t.plan(1)

  t.pass()
})
