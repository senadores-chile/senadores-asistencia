'use strict'

const { periods, URL_ASISTENCIA_SALA } = require('./consts')
const scraperjs = require('scraperjs')

// Convert a period into a period id for web scrapping
// (date|num) -> obj
function getPeriodoSala (periodo) {
  let _period = {}
  if (typeof periodo === 'number') {
    _period = periods.filter(period => period.id === periodo)
    // search directly by period id
    if (_period.length > 0) return _period
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

// Get attendance for a single senator to regular room sessions
// (obj, any) -> obj
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
    })
}

// Get attendance for a single senator to all of his commissions
// (obj, any) -> arr
function getAsistenciaComisiones (senador, periodo) {

}

// Convert a period into a period id for web scrapping
// (obj|num) -> num
function getPeriodoComisiones (periodo) {

}

exports.getPeriodoSala = getPeriodoSala
exports.getAsistenciaSala = getAsistenciaSala
exports.getAsistenciaComisiones = getAsistenciaComisiones
exports.getPeriodoComisiones = getPeriodoComisiones
