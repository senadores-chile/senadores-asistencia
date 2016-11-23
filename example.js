const asistencia = require('./')

asistencia('Allamand')
    .then(result => { console.log(result[0].sala, result[0].comisiones) })
