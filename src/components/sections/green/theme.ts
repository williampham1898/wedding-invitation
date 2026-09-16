import { withBase } from '../../../lib/withBase'

export const GREEN = {
  paper: '#f6f3ec',
  paperBg:
    'radial-gradient(ellipse at 50% 28%, #fbf8f2 0%, #f4f0e6 55%, #ebe6db 100%)',
  ink: '#5c6848',
  inkDeep: '#3f4a32',
  sage: '#6a754c',
  sageDeep: '#5a6640',
}

export const greenAsset = (file: string) =>
  withBase(`/images/themes/green-themes/${file}`)

export const GREEN_ASSETS = {
  flowerLeft: greenAsset('thiep-thanh-dat-element_0017_17-20251010160529-gulgj.png'),
  flowerRight: greenAsset('thiep-thanh-dat-element_0019_15-20251010160529-kgwqz.png'),
  orchids: greenAsset('thiep-thanh-dat-element_0026_8-20251010160529-58dj0.png'),
  petal: greenAsset('thiep-thanh-dat-element_0018_16-20251010160531-qmshd.png'),
  seal: greenAsset('thiep-thanh-dat-element_0030_4-20251010171938-qfleq.png'),
  greenery: greenAsset('anh-chup-man-hinh-2026-01-30-luc-141213-20260130071226-l8d26.png'),
  bouquet: greenAsset('thiep-thanh-dat-element_0006_28-20251010165559-ejurh.png'),
  champagne: greenAsset('thiep-thanh-dat-element_0005_29-20251010165559-b9jp9.png'),
}

export function galleryImg(n: number) {
  return withBase(`/gallery/${n}.jpg`)
}

export function pad2(n: number) {
  return String(n).padStart(2, '0')
}
