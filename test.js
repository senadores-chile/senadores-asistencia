import test from 'ava'
import senadoresAsistencia from './'

test('default options', async t => {
  t.plan(5)

  const result = await senadoresAsistencia()
  t.is(result.length, 1)
  t.true(result[0].hasOwnProperty('sala'))
  t.true(result[0].hasOwnProperty('comisiones'))
  t.is(result[0].sala.periodo.legislatura, 487)
  t.is(result[0].comisiones.periodo, 2017)
})

test('custom options', async t => {
  t.plan(37)

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
  const allResults = await senadoresAsistencia('Allamand', { tipo: 'todas' })
  t.true(allResults[0].hasOwnProperty('sala'))
  t.true(allResults[0].hasOwnProperty('comisiones'))

  const _results = await senadoresAsistencia('Allamand')
  const roomResults = await senadoresAsistencia('Allamand', { tipo: 'sala' })
  t.deepEqual(roomResults[0], _results[0].sala)

  const comisionResults = await senadoresAsistencia('Allamand', { tipo: 'comision' })
  t.deepEqual(comisionResults[0], _results[0].comisiones)

  // test incluyeSenador option
  const includeResult = await senadoresAsistencia('Allamand', { incluyeSenador: true })
  t.true(includeResult[0].hasOwnProperty('senador'))

  // test combined options
  const combined = await senadoresAsistencia({ partido: 'R.N.' }, { tipo: 'sala', periodo: 486, cantidadSenadores: -1, incluyeSenador: true })
  t.is(combined.length, 6)
  t.is(combined[0].asistencia, 102)
  t.is(combined[0].inasistencias.total, 5)
  t.is(combined[1].asistencia, 99)
  t.is(combined[1].inasistencias.total, 8)
  t.is(combined[2].asistencia, 98)
  t.is(combined[2].inasistencias.total, 9)
  t.is(combined[3].asistencia, 106)
  t.is(combined[3].inasistencias.total, 1)
  t.is(combined[4].asistencia, 98)
  t.is(combined[4].inasistencias.total, 9)
  t.is(combined[5].asistencia, 107)
  t.is(combined[5].inasistencias.total, 0)
  t.true(combined[0].hasOwnProperty('senador'))
  t.true(combined[1].hasOwnProperty('senador'))
  t.true(combined[2].hasOwnProperty('senador'))
  t.true(combined[3].hasOwnProperty('senador'))
  t.true(combined[4].hasOwnProperty('senador'))
  t.true(combined[5].hasOwnProperty('senador'))
})
