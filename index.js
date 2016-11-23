'use strict'

const senadores = require('senadores-base')
const pMap = require('p-map')
const { getAsistenciaSala, getPeriodoSala } = require('./utils')

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
    /* let comisiones = []
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
    } */
    // return Object.assign({}, { sala }, { comisiones })
    return getAsistenciaSala(senador, getPeriodoSala(options.periodo))
  }
  senadoresBase = options.cantidadSenadores && options.cantidadSenadores > -1
          ? senadoresBase.splice(options.cantidadSenadores - 1)
          : senadoresBase
  return pMap(senadoresBase, mapper).then(result => console.log(result))
}
