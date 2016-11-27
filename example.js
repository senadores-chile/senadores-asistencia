const asistencia = require('./')

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
asistencia({ partido: 'R.N.' }, { tipo: 'sala' })
    .then(result => {

    })

/*
    Detalle de todas las sesiones de sala a las que falto el senador
    Orpis en el periodo actual
 */
