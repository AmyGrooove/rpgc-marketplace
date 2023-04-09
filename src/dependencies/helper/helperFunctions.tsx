export const shortAddress = (id?: string) => {
  if (id) {
    return `${id.slice(0, 4)}••••${id.slice(-4)}`
  } else {
    return ''
  }
}
