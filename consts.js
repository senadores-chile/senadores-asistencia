
// legiid -> periodo
const URL_ASISTENCIA_SALA = 'http://www.senado.cl/appsenado/index.php?mo=sesionessala&ac=asistenciaSenadores&camara=S&legiini=361&legiid=:periodo:'
// parlid -> senador id
// legiid -> periodo
const URL_ASISTENCIA_SALA_DETALLE = 'http://www.senado.cl/appsenado/index.php?mo=sesionessala&ac=asistenciaPorSenador&parlid=:senador-id:&legiid=:periodo:'
// idsenador -> senador id
// ano -> periodo
const URL_ASISTENCIA_COMISIONES = 'http://www.senado.cl/appsenado/index.php?mo=comisiones&ac=asist_x_senador&idsenador=:senador-id:&ano=:periodo:'

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

exports.URL_ASISTENCIA_SALA = URL_ASISTENCIA_SALA
exports.URL_ASISTENCIA_SALA_DETALLE = URL_ASISTENCIA_SALA_DETALLE
exports.URL_ASISTENCIA_COMISIONES = URL_ASISTENCIA_COMISIONES
exports.periods = periods
