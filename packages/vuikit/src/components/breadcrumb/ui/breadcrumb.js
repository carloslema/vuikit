import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  render: (h, { props, data, children }) => {
    return h('ul', mergeData(data, {
      class: 'uk-breadcrumb'
    }), children)
  }
}
