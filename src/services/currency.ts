export function formatMoney(cents: number) {
  const centsString = cents.toString()
  const indexEnd = centsString.length
  switch (indexEnd) {
    case 1:
      return `R$ 0,0${cents}`
    case 2:
      return `R$ 0,${cents}`
    default:
      const indexStart = indexEnd - 2
      const integerPart = centsString.substring(0, indexStart)
      const floatingPart = centsString.substring(indexStart, indexEnd)
      return `R$ ${integerPart},${floatingPart}`
  }
}
