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

test('custom options', async t => {
  t.plan(14)

  // tests periodo option
  const resultByLegislatura = await senadoresAsistencia('Allamand', { periodo: 486 })
  t.is(resultByLegislatura[0].sala.asistencia, 102)
  t.is(resultByLegislatura[0].sala.inasistencias.injustificadas, 5)

  const resultByYear = await senadoresAsistencia('Allamand', { periodo: 2015 })
  t.is(resultByYear[0].comisiones.oficiales.length, 5)
  t.is(resultByYear[0].comisiones.oficiales[2].nombre, 'de Educación y Cultura')
  t.is(resultByYear[0].comisiones.oficiales[2].total, 29)
  t.is(resultByYear[0].comisiones.oficiales[2].asiste, 24)
  t.is(resultByYear[0].comisiones.otras[2].nombre, 'de Transportes y Telecomunicaciones')
  t.is(resultByYear[0].comisiones.otras[2].reemplazante, 6)
  t.is(resultByYear[0].comisiones.otras[2].asistente, 0)

  const resultByDate = await senadoresAsistencia('Allamand', { periodo: new Date(2014, 3, 12) })
  t.deepEqual(resultByDate[0].sala.periodo, {
    legislatura: 485,
    desde: new Date(2014, 3, 11),
    hasta: new Date(2015, 3, 10)
  })
  t.is(resultByDate[0].comisiones.periodo, 2014)

  // test cantidadSenadores option
  const negativeSenators = await senadoresAsistencia({ partido: 'P.S.' }, { cantidadSenadores: -1 })
  t.is(negativeSenators.length, 6)
  const positiveSenators = await senadoresAsistencia({ partido: 'P.S.' }, { cantidadSenadores: 4 })
  t.is(positiveSenators.length, 4)

  // test tipo option
  // const allResults = await senadoresAsistencia('Allamand', { tipo: 'todas' })
  // const roomResults = await senadoresAsistencia('Allamand', { tipo: 'sala' })
  // const comisionResults = await senadoresAsistencia('Allamand', { tipo: 'comision' })

  t.pass()
})

test('validations', t => {
  t.plan(1)

  t.pass()
})
