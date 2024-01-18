// ** Navigation imports
import apps from './apps'
// import pages from './pages'
// import forms from './forms'
// import tables from './tables'
// import others from './others'
// import charts from './charts'
import dashboards from './dashboards'
// import uiElements from './ui-elements'
import qlhethong from './qlhethong'
import qldanhmuc from './qldanhmuc'
import qltochucthi from './qltochucthi'
import qlchamthi from './qlchamthi'
import qlxuliketquathi from './qlxuliketquathi'

// ** Merge & Export
// export default [...dashboards, ...apps, ...pages, ...uiElements, ...forms, ...tables, ...charts, ...others, ...qlhethong]
export default [...apps, ...qldanhmuc, ...qltochucthi, ...qlchamthi, ...qlxuliketquathi,  ...qlhethong]
