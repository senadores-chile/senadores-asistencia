'use strict'

const senadores = require('senadores-base')
const pMap = require('p-map')
const pAll = require('p-all')
const utils = require('./utils')
const getAsistenciaSala = utils.getAsistenciaSala
const getPeriodoSala = utils.getPeriodoSala
const getAsistenciaComisiones = utils.getAsistenciaComisiones
const getPeriodoComisiones = utils.getPeriodoComisiones

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
    switch (options.tipo) {
      case 'todas':
        const actions = [
          () => getAsistenciaSala(senador, getPeriodoSala(options.periodo)),
          () => getAsistenciaComisiones(senador, getPeriodoComisiones(options.periodo))
        ]
        return pAll(actions).then(result => {
          return { sala: result[0], comisiones: result[1] }
        })
      case 'sala':
        return getAsistenciaSala(senador, getPeriodoSala(options.periodo))
      case 'comision':
        return getAsistenciaComisiones(senador, getPeriodoComisiones(options.periodo))
      default:
        throw new Error(`[senadores-asistencia]: Error - tipo de retorno '${options.tipo}' no conocido.`)
    }
  }
  senadoresBase = options.cantidadSenadores && options.cantidadSenadores > -1
          ? senadoresBase.slice(0, options.cantidadSenadores)
          : senadoresBase
  return pMap(senadoresBase, mapper)
}
