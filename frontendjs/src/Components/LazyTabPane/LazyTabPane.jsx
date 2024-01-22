import { TabPane } from 'reactstrap'

/**
 * @typedef {object} Props
 * @property {boolean} activeTabPane
 */

/**
 * agar tab pane tidak merender jika activeTab belum aktif
 * @type {import('react').FC<import('reactstrap').TabPaneProps & Props >}
 */
const LazyTabPane = ({ activeTab, children, ...rest }) => {
  if (activeTab === undefined || activeTab === null)
    throw new Error('activeTab harus diisi')
  return <TabPane {...rest}>{rest.tabId === activeTab && children}</TabPane>
}

export default LazyTabPane
