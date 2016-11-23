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
      asistencias: 56,
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

## License

[MIT](/license)

Crafted by Yerko ([@yerko_palma](https://twitter.com/yerko_palma)).
