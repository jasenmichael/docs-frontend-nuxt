const capitalizeString = (str) => {
  const words = str.split(' ')
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)
  }
  return words
    .join(' ')
    .replace(/ And /g, ' and ')
    .replace(/ But /g, ' but ')
    .replace(/ The /g, ' the ')
    .replace(/ Is /g, ' is ')
    .replace(/ The /g, ' the ')
    .replace(/ Of /g, ' of ')
    .replace(/ A /g, ' a ')
}
const slugToTitle = (slug) => {
  return capitalizeString(slug.replace(/-/g, ' '))
}

export { capitalizeString, slugToTitle }
