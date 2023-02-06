const bgSwitch = (collectionName) => {
  switch (collectionName) {
    case 'American Art':
      return 'bgAmerican.png'
    case 'Arts of Africa':
      return 'bgAfrik.png'
    case 'Arts of the Americas':
      return 'bgAmericas.png'
    case 'Arts of the Islamic World':
      return 'bgIslamicWorld2.png'
    case 'Arts of the Pacific Islands':
      return 'bgPacific.jpg'
    case 'Asian Art':
      return 'bgAsian.png'
    case 'Contemporary Art':
      return 'bgComtempory.jpg'
    case 'Decorative Arts':
      return 'bgArtdeco.jpg'
    case 'Egyptian, Classical, Ancient Near Eastern Art':
      return 'bgEgyptian.png'
    case 'Elizabeth A. Sackler Center for Feminist Art':
      return 'bgFeminist.png'
    case 'European Art':
      return 'bgEuropean.png'
    case 'Photography':
      return 'bgPhotography.png'
    default:
      break
  }
}

export default bgSwitch
