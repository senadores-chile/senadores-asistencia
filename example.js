const asistencia = require('./')

function paddingRight (s, c, n) {
  if (!s || !c || s.length >= n) {
    return s
  }
  var max = (n - s.length) / c.length
  for (var i = 0; i < max; i++) {
    s += c
  }
  return s
}

/*
    Asistencia del senador Allamand para el periodo legislativo 486.
 */
asistencia('Allamand', { periodo: 486 })
    .then(result => { console.log(result) })

/*
    Asistencia a comisiones de los senadores del partido socialista
    durante el año 2011
 */
asistencia({ partido: 'P.S.' }, { tipo: 'comision' })
    .then(result => { console.log(result) })

/*
    Promedio de inasistencias de los senadores de Renovación Nacional
    para el periodo actual
 */
asistencia({ partido: 'R.N.' }, { tipo: 'sala', incluyeSenador: true, cantidadSenadores: -1 })
    .then(result => {
      const totalSenadores = result.length
      const periodo = {
        desde: `${result[0].periodo.desde.getDate()}/${result[0].periodo.desde.getMonth() + 1}/${result[0].periodo.desde.getFullYear()}`,
        hasta: `${result[0].periodo.hasta.getDate()}/${result[0].periodo.hasta.getMonth() + 1}/${result[0].periodo.hasta.getFullYear()}`
      }
      let total = 0
      let totalPromedio = 0
      console.log(`Total senadores: ${totalSenadores}\tPeriodo: ${periodo.desde} - ${periodo.hasta}\n`)
      console.log(`${paddingRight('Senador', ' ', 35)}\tAsistencia(total)\tAsistencia(promedio)\t\t`)
      console.log(`${paddingRight('=======', ' ', 35)}\t=================\t====================\t\t\n\n`)
      result.forEach(_result => {
        let totalAttendance = _result.asistencia + _result.inasistencias.total
        console.log(`${paddingRight(_result.senador.nombre, ' ', 35)}\t${_result.asistencia}\t\t\t${(_result.asistencia / totalAttendance).toFixed(2)}`)
        total += _result.asistencia
        totalPromedio += (_result.asistencia / totalAttendance)
      })
      console.log(`\n${paddingRight('TOTAL:', ' ', 35)}\t${(total / totalSenadores).toFixed(2)}\t\t\t${(totalPromedio / totalSenadores).toFixed(2)}`)
    })

/*
    Detalle de todas las sesiones de sala a las que falto el senador
    Orpis en el periodo actual
 */
asistencia('Orpis', { tipo: 'sala' })
    .then(result => {
      const sesionesFaltadas = result[0].detalle.filter(sesion => !sesion.asiste)
      console.log(`${paddingRight('Sesión', ' ', 10)}\t${paddingRight('Tipo', ' ', 20)}\t${paddingRight('Fecha', ' ', 10)}\n`)
      sesionesFaltadas.forEach(sesion => {
        const fecha = `${sesion.fecha.getDate()}/${sesion.fecha.getMonth() + 1}/${sesion.fecha.getFullYear()}`
        console.log(`${paddingRight(sesion.sesion, ' ', 10)}\t${paddingRight(sesion.tipo, ' ', 20)}\t${paddingRight(fecha, ' ', 10)}`)
      })
    })
