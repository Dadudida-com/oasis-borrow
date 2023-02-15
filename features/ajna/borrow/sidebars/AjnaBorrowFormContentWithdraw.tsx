import { SidebarResetButton } from 'components/vault/sidebar/SidebarResetButton'
import {
  AjnaBorrowFormFieldPayback,
  AjnaBorrowFormFieldWithdraw,
} from 'features/ajna/borrow/sidebars/AjnaBorrowFormFields'
import { AjnaBorrowFormOrder } from 'features/ajna/borrow/sidebars/AjnaBorrowFormOrder'
import { useAjnaBorrowContext } from 'features/ajna/contexts/AjnaProductContext'
import React from 'react'

export function AjnaBorrowFormContentWithdraw() {
  const {
    form: {
      dispatch,
      state: { withdrawAmount },
    },
  } = useAjnaBorrowContext()

  return (
    <>
      <AjnaBorrowFormFieldWithdraw resetOnClear />
      <AjnaBorrowFormFieldPayback isDisabled={!withdrawAmount || withdrawAmount?.lte(0)} />
      {withdrawAmount && (
        <>
          <SidebarResetButton clear={() => dispatch({ type: 'reset' })} />
          <AjnaBorrowFormOrder />
        </>
      )}
    </>
  )
}