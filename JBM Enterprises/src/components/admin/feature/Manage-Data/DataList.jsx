import React from 'react'
import Header from '../../shared/Header/Header'
import DataListContent from '../../shared/DataListContent/DataListContent'

const DataList = () => {
  return (
    <>
      <Header />
      <DataListContent props={'dataList'} />
    </>
  )
}

export default DataList