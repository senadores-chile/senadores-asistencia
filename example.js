const asistencia = require('./')

asistencia({ partido: 'R.N.' }, { tipo: 'sala', cantidadSenadores: 2 })
    .then(result => { console.log(result[0], result[1]) })
