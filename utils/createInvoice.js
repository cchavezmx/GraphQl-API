import { dateIntlRef, numerosaLetras, monyFormat } from './index.js'

export const createInvoice = async (dataPago, owner) => {
  const {
    consecutivo,
    monto,
    cliente,
    fechaPago,
    lote,
    ctaBancaria,
    banco,
    refBanco,
    proyecto,
    folio,
    textoObservaciones,
    extraSlug,
    refPago,
    mensajeRecibo,
    createdAt
  } = dataPago

  const { direccion, ciudad, slug, rfc, razonSocial } = owner
  const letrasToTexto = numerosaLetras(Number(monto))
  // const lafecha = dateIntlRef({ date: fechaPago })
  /**
   * TODO
   * el folio y el numero de mensualidad debe salir del length de pedidos
   */
  const htmlextraSlug = extraSlug || `Mensualidad ${folio || '1'} de ${lote.plazo}`
  const hmtltextoObservaciones = textoObservaciones || refPago
  const htmlManzana = lote.manzana !== '' && lote.manzana !== null ? `Manzana ${lote.manzana}` : ''

  const textoDescription = `
    ${htmlextraSlug} correspondiente al mes
    de ${dateIntlRef({ date: fechaPago, type: 'month' }).toUpperCase()}       
    <br>
      Proyecto: ${proyecto.title}
    <br>
      Lote o Fraccion: ${lote.lote} ${htmlManzana} 
    <br>      
    Pago recibido en la cuenta bancaria 
    ${ctaBancaria} del Banco
    ${banco} con número de
    referencia ${refBanco} en
    ${dateIntlRef({ date: fechaPago })}
  `

  const firmaXavier = `
  <img 
    class="sello"
    src="https://firebasestorage.googleapis.com/v0/b/gpo-maya.appspot.com/o/pagado.jpg?alt=media&token=07847cf9-51ff-4726-8394-df95102e6649" 
    alt="sello de pagado"
  />
  <span class="firmas__line">
    <p>Xavier Juliano Nieto Vargas</p>
  </span>
  <span class="firmaXavier"></span>        
  <span>Nombre y firma de quien Recibe</span>
  `

  const firmaMartin = `
  <img 
    class="sello"
    src="https://firebasestorage.googleapis.com/v0/b/gpo-maya.appspot.com/o/pagado.jpg?alt=media&token=07847cf9-51ff-4726-8394-df95102e6649" 
    alt="sello de pagado"
  />
  <span class="firmas__line">
    <p>MARTIN ERNESTO SANCHEZ MANJARREZ</p>
  </span>
  <span class="firmaXavier"></span>        
  <span>Nombre y firma de quien Recibe</span>
  `

  const firmaIkai = `
  <img 
    class="sello"
    src="https://firebasestorage.googleapis.com/v0/b/gpo-maya.appspot.com/o/pagado.jpg?alt=media&token=07847cf9-51ff-4726-8394-df95102e6649" 
    alt="sello de pagado"
  />
  <span class="firmas__line">
    <p>Nazario Tun May </p>
  </span>
  <span class="firmaXavier"></span>        
  <span>Nombre y firma de quien Recibe</span>
  `

  const htmlOwnersFirma = {
    xavier: firmaXavier,
    martin: firmaMartin,
    ikai: firmaIkai
  }

  const webTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style>
      
      body{
        display: flex;
        justify-content: center;
        font-family: Arial, Helvetica, sans-serif;
      }
  
      .logo{
        width: 200px;
        height: auto;
      }
  
      .container{
        width: 800px;
      }
  
      .header{
        padding: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
  
      .header *{
        margin: 0;
        padding: 0;
        line-height: normal;
      }
  
      .under__line{
        text-decoration: underline;
      }
  
      .header > h2{
        font-weight: normal;
        font-size: 21px;
      }
      
      .datos__cliente{
        display: flex;
        border: 2px solid black;
        width: 800px;
        height: fit-content;
        padding: 4px;
        box-sizing: border-box;
        font-size: 13px;
        line-height: 16px;
  
      }
  
      .datos__cliente span{
        display: flex;
        padding: 12px;
      }
  
      .datos__cliente span:first-child{
        margin: 21px 20% 0 0;
        text-transform: uppercase;
      }
  
      .datos__cliente > div span:first-child{
        margin: 1px;
  
      }
  
      .datos__cliente span p:first-child{
        font-weight: bold;
        margin-right: 10px;
        align-items: flex-start;
      }
  
      .datos__invoice{
        height: fit-content;
        width: 100%;
        margin: 21px 0;
        
      }
  
      .tabla__pagos{
        width: 100%;
        padding: 0;
        border-collapse: collapse;
      }

      .tabla__pagos td:first-child {
          width: 30px;
          overflow: hidden;
          display: inline-block;
          white-space: nowrap;
      }

      .tabla__pagos td:last-child {
          width: 120px;
          overflow: hidden;
          display: inline-block;
          white-space: nowrap;
      }

      .tabla_pagos td{
        width: 10px;
        background-color: #e6e6e6;
      }
  
      .tabla__pagos thead{
        background-color: #5c5c5c;
        font-size: 12px;  
      }
  
      .tabla__pagos thead th{          
        padding: 2px;
        text-align: left;
        border: 2px solid black;
        color: white;          
      }
 

      .tabla__pagos tbody td{
        text-align: center;
      }
  
      .tabla__pagos tbody td:nth-child(2){
        text-align: left;
      }
  
      .observaciones{
        font-size: 13px;
        border: 2px solid black;
        border-bottom: transparent;
        display: flex;
        justify-content: space-between;
      }
  
      .observaciones p:first-child{
        font-weight: bold;
        margin: 10px;
      }
  
      .top_border{
        border-top: transparent;
        border-bottom: 2px solid black;
        display: flex;
        flex-direction: column;
      }
  
      .linea__total{
        margin-top: 80px;
        margin-right: 2px;
        border-top: 2px solid black;
        width: 240px;
      } 
  
      .total__numeros{
        display: flex;
        justify-content: space-between;
        font-weight: bold;
      }
      
      .observaciones img{
        width: 400px;
        height: auto;
        object-fit: contain;
        margin-left: 40px;
      }
  
      .comentarios{
        display: flex;
        flex-direction: column;
      }
  
      .comentarios li{
        margin: 15px;
      }
  
      .font_blue{
        color: blue;
        font-weight: bold;
      }
  
      .font_red{
        color: red;
        font-weight: bold;
      }
  
      .firma_cliente{
        display: flex;
        flex-direction: column;
      }
  
      .firmas__line{
        height: 1px;
        margin-top: 50px;      
        border-top: 2px solid black;
      }
  
      .firmas__line p{
        position: absolute;
        width: 100%;
        bottom: -15px;
        left: 200px;
        padding: 20px;
        text-decoration: underline;      
      }
  
      .secction__firmas{
        position: relative;
        display: flex;
        justify-content: space-evenly;
        width: 55%;
        font-size: 12px;
      }
  
      .sello{
        width: 100px !important;
        height: auto;
        position: absolute;
        bottom: 70px;
        left: 250px;
        z-index: 2;
      }
  
      .firmaXavier{
        background-image: url('https://firebasestorage.googleapis.com/v0/b/gpo-maya.appspot.com/o/firmaXAVIER.jpg?alt=media&token=eff2fa13-0833-4809-bdb0-6fd0687d26fb');      
        background-repeat: no-repeat;
        background-position: center;
        position: absolute;
        bottom: 10px;
        left: 250px;
        width: 80px;
        height: 80px;
        z-index: 1;
      }
  
  
  
    </style>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RECIBO DE PAGO</title>
  </head>
  <body>
  <div class="container">
  
    <section class="header">
      <img src="https://firebasestorage.googleapis.com/v0/b/gpo-maya.appspot.com/o/logo.png?alt=media&token=31e8e01e-09ff-4d9d-a73b-688b5506743f" alt="logo de la empresa grupo maya es una piramide y el mar" class="logo">    
        <h2>${razonSocial}</h2>
          <p>RFC:${rfc}</p>
          <p>${direccion}</p>
          <p>${ciudad}</p>
          <h1 class="under__line">RECIBO DE PAGO</h1>
    </section>
  
    <section class="datos__cliente">
    <span>
      <p>RECIBI DE:</p>
      <p>${cliente.name}</p>
    </span>
    <div>
      <span>
        <p>Fecha:</p>
        <p>${dateIntlRef({ date: createdAt })}</p>
      </span>
      <div>
        <span style="padding: 0">
          <p>Factura:</p>
          <p>${consecutivo}</p>
        </span>
        <span style="padding: 0">
          <p>Folio:</p>
          <p>${folio}</p>
        </span>
      </div>      
    </div>
  </section>
  <section class="datos__invoice">
    <table class="tabla__pagos">
      <thead>
        <th>Cantidad</th>
        <th>Descripción</th>          
        <th>Importe</th>
      </thead>
      <tbody>
        <td>
          <p>1.0</p>
        </td>
        <td>
          <p>
            ${mensajeRecibo || textoDescription}
          </p>
        </td>          
        <td class="precio_total">
          <p>${monyFormat(monto)}</p> 
        </td>
      </tbody>
    </table>
  
  </section>
  <div>
    <p style="font-weight: bold">
      Observaciones:
    </p>
    <p>
      ${hmtltextoObservaciones}
    </p>  
  </div>
  <section class="observaciones">
    <p>IMPORTE CON LETRA <br/>${letrasToTexto}</p>
    <span>
      <div class="linea__total"/>
      <span class="total__numeros">
        <p>TOTAL</p>
        <p>${monyFormat(monto)}</p>
      </span> 
    </span>
  </section>
    <section class="observaciones top_border">
      <div class="secction__firmas">
        <div class="firma_cliente">
          <span class="firmas__line"></span>
          <span>Nombre y Firma de quien aporta</span>
        </div>
  
        <div class="firma_cliente">        
          ${htmlOwnersFirma[slug]}
        </div>
      </div>  
      <div class="comentarios">
        <ul>
          <li>
            Recuerde que si paga dentro de los 5 días naturales siguientes a la fecha estipulada en su contrato, sigue siendo acreedor al crédito sin intereses, después del día 5 el interés es del 10%
          </li>
          <li>
            Es obligatorio realizar su pago con su referencia, que son las iniciales de su nombre y el número de lote. Ejemplo: correcto: <span class="font_blue">jjgs46.</span> <span class="font_red">Incorrecto: pago terreno, nombre de la persona, lote tulum</span>  
          </li>
        </ul>
      </div>
    </section>
    </div>
  </body>
  </html>
  `
  return webTemplate
}
