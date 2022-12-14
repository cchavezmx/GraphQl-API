import { chromium } from 'playwright'
import { setTimeout } from 'timers/promises'

const createPDF = async (html, options) => {
  await setTimeout(1000)
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  await page.setContent('<h1>Hello World</h1>')

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
}

export default createPDF
