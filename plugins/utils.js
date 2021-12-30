const { capitalizeString, slugToTitle } = require('../plugins/helpers.js')

export default ({ app }, inject) => {
  inject('utils', { capitalizeString, slugToTitle })
}
