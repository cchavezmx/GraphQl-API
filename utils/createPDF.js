import { chromium } from 'playwright'
import { Pagos } from '../models/index.js'
import { createInvoice } from './createInvoice.js'
// import { setTimeout } from 'timers/promises'

export const createPDF = async (idpago, owner) => {
  const pago = await Pagos
    .findById(idpago)
    .populate('owner')
    .populate('lote')
    .populate('proyecto')
    .populate('cliente')

  try {
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()
    const html = await createInvoice(pago, owner)
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

    await browser.close()
    // convert pdf to base64
    const base64 = pdf.toString('base64')
    return base64
  } catch (error) {
    console.log(error)
  }
}
