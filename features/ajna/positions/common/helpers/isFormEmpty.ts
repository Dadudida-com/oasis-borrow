import { AjnaFormState, AjnaProduct } from 'features/ajna/common/types'
import { AjnaBorrowFormState } from 'features/ajna/positions/borrow/state/ajnaBorrowFormReducto'
import { AjnaEarnFormState } from 'features/ajna/positions/earn/state/ajnaEarnFormReducto'

interface IsFormEmptyParams {
  product: AjnaProduct
  state: AjnaFormState
}

export function isFormEmpty({ product, state }: IsFormEmptyParams): boolean {
  switch (product) {
    case 'borrow': {
      const {
        depositAmount,
        generateAmount,
        paybackAmount,
        withdrawAmount,
      } = state as AjnaBorrowFormState

      return !depositAmount && !generateAmount && !paybackAmount && !withdrawAmount
    }
    case 'earn': {
      const { depositAmount, withdrawAmount } = state as AjnaEarnFormState

      // TODO: add check if price is at its default or initial state
      return !depositAmount && !withdrawAmount
    }
    case 'multiply':
      return true
  }
}