import { capitalizeString, slugToTitle } from '../plugins/helpers.js'

export default ({ app }, inject) => {
  inject('utils', { capitalizeString, slugToTitle })
}
