const asistencia = require('./')

asistencia('Orpis', { tipo: 'sala' })
    .then(result => { console.log(result[0]) })
