'use strict'

const { periods, URL_ASISTENCIA_SALA, URL_ASISTENCIA_SALA_DETALLE } = require('./consts')
const scraperjs = require('scraperjs')

// Convert a period into a period id for web scrapping
// (date|num) -> obj
function getPeriodoSala (periodo) {
  let _period = {}
  if (typeof periodo === 'number') {
    _period = periods.filter(period => period.id === periodo)
    // search directly by period id
    if (_period.length > 0) return _period[0]
    // search only by year
    _period = periods.filter(period => {
      return period.desde.year <= periodo && periodo <= period.hasta.year
    })[0]
    console.warn('[senadores-asistencia]: Solo se puede consultar por periodo legislativo. Si para un mismo año existe más de un periodo legislativo, solo se obtendran los resultados del primer periodo encontrado, por lo que jamas se obtendran los periodos posteriores en caso de existir. Prefiera busquedas por fecha o id de legislatura.')
    return _period
  }
  if (periodo instanceof Date) {
    // search by date
    _period = periods.filter(period => {
      return period.desde.getTime() <= periodo.getTime() && periodo.getTime() <= period.hasta.getTime()
    })[0]
    return _period
  }
}

// Convert a chilean month string into a month number to be used in Date constructor
// (str) -> num
function clMonthToMonth (clMonth) {
  const months = {
    Enero: 0,
    Febrero: 1,
    Marzo: 2,
    Abril: 3,
    Mayo: 4,
    Junio: 5,
    Julio: 6,
    Agosto: 7,
    Septiembre: 8,
    Octubre: 9,
    Noviembre: 10,
    Diciembre: 11
  }
  return months[clMonth]
}

// Get detailed attendance info
// (obj, obj, str) => obj
function getDetalleAsistenciaSala (asistenciaGeneral, senador, periodo) {
  let url = URL_ASISTENCIA_SALA_DETALLE.replace(/:periodo:/, periodo.id)
  url = url.replace(/:senador-id:/, senador.id)

  return scraperjs.StaticScraper.create()
    .get(url)
    .scrape($ => {
      const detalle = $('table:last-child tr:not(:first-child)').map(function () {
        const str = $(this).find('td:last-child a').text()

        const data = str.match(/(\d*) (\w*), [\s\S]* (\d*) de (\w*) de (\d*)/)
        const session = data[1]
        const tipo = data[2]
                      // año, mes, día
        const fecha = new Date(parseInt(data[5]), clMonthToMonth(data[4]), parseInt(data[3]))
        const asiste = $(this).find('td:first-child').has('img').length > 0
        // console.log(session, tipo, fecha, asiste)
        return {
          session,
          tipo,
          fecha,
          asiste
        }
      }).get()
      // console.log(detalle)
      return Object.assign(asistenciaGeneral, { detalle })
    })
}

// Get attendance for a single senator to regular room sessions
// (obj, str) -> obj
function getAsistenciaSala (senador, periodo) {
  const url = URL_ASISTENCIA_SALA.replace(/:periodo:/, periodo.id)
  // Get general data of attendance
  return scraperjs.StaticScraper.create()
    .get(url)
    .scrape($ => {
      let total = $('#main h2').text().match(/(\d*)/g)
      total = parseInt(total[total.length - 2])
      const trSenador = $('#main table tr[align="left"]:not(:first-child) td:first-child')
                          .filter(function () {
                            return $(this).text() === senador.nombre
                          }).parent()
      const asistencia = parseInt(trSenador.find('td a:not([id])').text().trim())
      const inasistenciasJustificadas = isNaN(parseInt(trSenador.find('td a[id]').text().trim()))
                                        ? 0
                                        : parseInt(trSenador.find('td a[id]').text().trim())
      return {
        periodo,
        asistencia,
        inasistencias: {
          total: total - asistencia,
          justificadas: inasistenciasJustificadas,
          injustificadas: ((total - asistencia) - inasistenciasJustificadas) > 0
                          ? (total - asistencia) - inasistenciasJustificadas
                          : 0
        }
      }
    }).then(result => {
      return getDetalleAsistenciaSala(result, senador, periodo)
    })
}

// Get attendance for a single senator to all of his commissions
// (obj, any) -> arr
function getAsistenciaComisiones (senador, periodo) {

}

// Convert a period into a period id for web scrapping
// (obj|num) -> num
function getPeriodoComisiones (periodo) {
  if (typeof periodo === 'number') {
    // add assert here
    return periodo
  }
  if (periodo instanceof Date) {
    // add assert here
    return periodo.getYear()
  }
}

exports.getPeriodoSala = getPeriodoSala
exports.getAsistenciaSala = getAsistenciaSala
exports.getAsistenciaComisiones = getAsistenciaComisiones
exports.getPeriodoComisiones = getPeriodoComisiones
