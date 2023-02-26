import { chromium } from 'playwright'
import { Pagos, Owner } from '../models/index.js'
import { createInvoice } from './createInvoice.js'
// import { writeFile } from 'fs/promises'
// import { setTimeout } from 'timers/promises'

export const createPDF = async (idpago, owner) => {
  const ownerData = await Owner.findById(owner)
  console.log('🚀 ~ file: createPDF.js:9 ~ createPDF ~ ownerData:', ownerData)
  const pago = await Pagos
    .findById(idpago)
    .populate('lote')
    .populate('proyecto')
    .populate('cliente')
  console.log('🚀 ~ file: createPDF.js:15 ~ createPDF ~ pago:', pago)

  const html = await createInvoice(pago, ownerData)
  // writeFile('invoice.html', html)

  try {
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()
    // const html = await createInvoice(pago, owner)
    await page.setContent(html)

    const pdf = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
    })

    console.log('PDF created', pdf)

    await browser.close()
    // convert pdf to base64
    const base64 = pdf.toString('base64')
    return base64
  } catch (error) {
    console.log(error)
  }
}
