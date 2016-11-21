'use strict'

const assert = require('assert')
const senadores = require('senadores-base')

// legiid -> periodo
const URL_ASISTENCIA_SALA = 'http://www.senado.cl/appsenado/index.php?mo=sesionessala&ac=asistenciaSenadores&camara=S&legiini=361&legiid=:periodo:'
// parlid -> senador id
// legiid -> periodo
const URL_ASISTENCIA_SALA_DETALLE = 'http://www.senado.cl/appsenado/index.php?mo=sesionessala&ac=asistenciaPorSenador&parlid=:senador-id:&legiid=:periodo:'
// idsenador -> senador id
// ano -> periodo
const URL_ASISTENCIA_COMISIONES = 'http://www.senado.cl/appsenado/index.php?mo=comisiones&ac=asist_x_senador&idsenador=:senador-id:&ano=:periodo:'

// Get attendance for a single senator to regular room sessions
// (obj, any) -> obj
function getAsistenciaSala (senador, periodo) {
  
}

// Get attendance for a single senator to all of his commissions
// (obj, any) -> arr
function getAsistenciaComisiones (senador, periodo) {
  
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

  const senadoresBase = senadores(query)
  senadoresBase.map(senador => {
    let comisiones = []
    let sala = {}
    
    switch (options.tipo) {
      case 'todas':
        sala = getAsistenciaSala(senador, options.periodo)
        comisiones = getAsistenciaComisiones(senador, options.periodo)
        break;
      case 'sala':
        sala = getAsistenciaSala(senador, options.periodo)
        break;
      case 'comision':
        comisiones = getAsistenciaComisiones(senador, options.periodo)
        break;
    }
    return Object.assign({}, { sala }, { comisiones })
  })
  return options.cantidadSenadores && options.cantidadSenadores > -1
          ? senadoresBase.splice(options.cantidadSenadores - 1)
          : senadoresBase
}
