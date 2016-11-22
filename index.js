'use strict'

const senadores = require('senadores-base')
const scraperjs = require('scraperjs')
const pMap = require('p-map')

// legiid -> periodo
const URL_ASISTENCIA_SALA = 'http://www.senado.cl/appsenado/index.php?mo=sesionessala&ac=asistenciaSenadores&camara=S&legiini=361&legiid=:periodo:'
// parlid -> senador id
// legiid -> periodo
// const URL_ASISTENCIA_SALA_DETALLE = 'http://www.senado.cl/appsenado/index.php?mo=sesionessala&ac=asistenciaPorSenador&parlid=:senador-id:&legiid=:periodo:'
// idsenador -> senador id
// ano -> periodo
// const URL_ASISTENCIA_COMISIONES = 'http://www.senado.cl/appsenado/index.php?mo=comisiones&ac=asist_x_senador&idsenador=:senador-id:&ano=:periodo:'
const periods = [
  { // 11/03/2002 - 20/05/2002
    id: 364,
    desde: new Date(2002, 3, 11),
    hasta: new Date(2002, 5, 20)
  },
  { // 21/05/2002 - 17/09/2002
    id: 381,
    desde: new Date(2002, 5, 21),
    hasta: new Date(2002, 9, 17)
  },
  { // 18/09/2002 - 20/05/2003
    id: 401,
    desde: new Date(2002, 9, 18),
    hasta: new Date(2003, 5, 20)
  },
  { // 21/05/2003 - 17/09/2003
    id: 441,
    desde: new Date(2003, 5, 21),
    hasta: new Date(2003, 9, 17)
  },
  { // 18/09/2003 - 20/05/2004
    id: 461,
    desde: new Date(2003, 9, 18),
    hasta: new Date(2004, 5, 20)
  },
  { // 21/05/2004 - 17/09/2004
    id: 462,
    desde: new Date(2004, 5, 21),
    hasta: new Date(2004, 9, 17)
  },
  { // 18/09/2004 - 20/05/2005
    id: 475,
    desde: new Date(2004, 9, 18),
    hasta: new Date(2005, 5, 20)
  },
  { // 21/05/2005 - 10/03/2006
    id: 476,
    desde: new Date(2005, 5, 21),
    hasta: new Date(2006, 3, 10)
  },
  { // 11/03/2006 - 11/03/2007
    id: 477,
    desde: new Date(2006, 3, 11),
    hasta: new Date(2007, 3, 11)
  },
  { // 12/03/2007 - 10/03/2008
    id: 478,
    desde: new Date(2007, 3, 12),
    hasta: new Date(2008, 3, 10)
  },
  { // 11/03/2008 - 10/03/2009
    id: 479,
    desde: new Date(2008, 3, 11),
    hasta: new Date(2009, 3, 10)
  },
  { // 11/03/2009 - 10/03/2010
    id: 480,
    desde: new Date(2009, 3, 11),
    hasta: new Date(2010, 3, 10)
  },
  { // 11/03/2010 - 10/03/2011
    id: 481,
    desde: new Date(2010, 3, 11),
    hasta: new Date(2011, 3, 10)
  },
  { // 11/03/2011 - 10/03/2012
    id: 482,
    desde: new Date(2011, 3, 11),
    hasta: new Date(2012, 3, 10)
  },
  { // 11/03/2012 - 10/03/2013
    id: 483,
    desde: new Date(2012, 3, 11),
    hasta: new Date(2013, 3, 10)
  },
  { // 11/03/2013 - 10/03/2014
    id: 484,
    desde: new Date(2013, 3, 11),
    hasta: new Date(2014, 3, 10)
  },
  { // 11/03/2014 - 10/03/2015
    id: 485,
    desde: new Date(2014, 3, 11),
    hasta: new Date(2015, 3, 10)
  },
  { // 11/03/2015 - 10/03/2016
    id: 486,
    desde: new Date(2015, 3, 11),
    hasta: new Date(2016, 3, 10)
  },
  { // 11/03/2016 - 10/03/2017
    id: 487,
    desde: new Date(2016, 3, 11),
    hasta: new Date(2017, 3, 10)
  }
]

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

// Convert a period into a period id for web scrapping
// (obj|num) -> num
function getPeriodoComisiones (periodo) {

}

// Get attendance details for senators
// (any, obj) -> arr
module.exports = function asistencia (query, options) {
  const defaultOptions = {
    periodo: new Date(),
    tipo: 'todas',
    cantidadSenadores: 1
  }
  options = Object.assign(defaultOptions, options)

  let senadoresBase = senadores(query)
  const mapper = senador => {
    let comisiones = []
    let sala = {}

    switch (options.tipo) {
      case 'todas':
        sala = getAsistenciaSala(senador, getPeriodoSala(options.periodo))
        comisiones = getAsistenciaComisiones(senador, getPeriodoComisiones(options.periodo))
        break
      case 'sala':
        sala = getAsistenciaSala(senador, getPeriodoSala(options.periodo))
        break
      case 'comision':
        comisiones = getAsistenciaComisiones(senador, getPeriodoComisiones(options.periodo))
        break
    }
    // return Object.assign({}, { sala }, { comisiones })
    return getAsistenciaSala(senador, getPeriodoSala(options.periodo))
  }
  senadoresBase = options.cantidadSenadores && options.cantidadSenadores > -1
          ? senadoresBase.splice(options.cantidadSenadores - 1)
          : senadoresBase
  return pMap(senadoresBase, mapper).then(result => console.log(result))
}
