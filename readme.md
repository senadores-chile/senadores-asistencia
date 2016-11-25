# senadores-asistencia [![npm version](https://img.shields.io/npm/v/senadores-asistencia.svg?style=flat-square)](https://www.npmjs.com/package/senadores-asistencia) [![Build Status](https://img.shields.io/travis/YerkoPalma/senadores-asistencia/master.svg?style=flat-square)](https://travis-ci.org/YerkoPalma/senadores-asistencia) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

Observador de la asistencia de senadores tanto a sesiones de sala como a comisiones del senado de Chile

## Instalación

```bash
npm install --save senadores-asistencia
```

## Uso

```javascript
var asistencia = require('senadores-asistencia')

asistencia('Allamand')
/*
  [{
    sala: {
      periodo: {
        legislatura: 364,
        desde: Date(11/03/2016),
        hasta: Date(10/03/2017)
      },
      asistencia: 56,
      inasistencias: {
        justificadas: 0,
        injustificadas: 9,
        total: 9
      },
      detalle: [
        {
          sesion: 65,
          tipo: 'Extraordinaria',
          fecha: Date(16/11/2016),
          asiste: false
        },{
          ...
        }
      ]
    },
    comisiones: {
      periodo: 2016,
      oficiales: [
        {
          nombre: 'Comisión Mixta para Boletín Nº 10744-04',
          total: 2,
          asiste: 1
        },{
          ...
        }
      ],
      otras: [
        {
          nombre: 'Comisión Especial de Seguridad Ciudadana',
          reemplazante: 0,
          asistente: 1
        },{
          ...
        }
      ]
    }
  }]
*/
```

## API

### `asistencia([query] [, options])`

El modulo expone una función que recibe dos parametros opcionales, un objeto `query` y un objeto `options`, y retorna un arreglo de estructura variable dependiendo de las opciones ingresadas.

- `query`: El query corresponde al primer filtro que es aplicado para obtener el grupo de senadores. Las especificaciones de este objeto de busqueda son las mismas que las del modulo [`senadores-base`](https://github.com/YerkoPalma/senadores-base).
- `options`: Las opciones de busqueda relativas a la asistencia, pueden ser las siguientes:
  - `tipo`: Indica si se obtiene la asistencia a sesiones ordinarias de sala, a las comisiones de los senadores encontrados o ambas. Posibles valores: `'todas' 'sala' 'comision'`.  
  - `periodo`: Indica el periodo de consulta, puede ser un entero (`number`) o una fecha (`date`). Es necesario señalar que el periodo no es tratado de la misma forma para la asistencia de sala que para la asistencia de comisiones. Para las comisiones el periodo corresponde a un año, es decir, un entero entre 2002 y 2016, si se ingresa una fecha, se obtiene el año de esta para la consulta por comisiones. 
   Por otro lado, para las sesiones de sala, el periodo corresponde a un periodo de legislatura (revisa el arreglo [periods](/consts.js) para más detalle). Lo anterior implica que, si se ingresa en la opción periodo, un id de legislatura, la busqueda será la esperada en la asistencia a sala, pero en comisiones, se obtendra el año de la fecha limite de esa legislatura. A su vez, 
  - `cantidadSenadores`

## Licensia

[MIT](/license)

Crafted by Yerko ([@yerko_palma](https://twitter.com/yerko_palma)).
