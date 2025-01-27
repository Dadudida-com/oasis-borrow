import type BigNumber from 'bignumber.js'
import { VaultActionInput } from 'components/vault/VaultActionInput'
import { useOmniGeneralContext, useOmniProductContext } from 'features/omni-kit/contexts'
import type {
  FormActionsUpdateDeposit,
  FormActionsUpdateGenerate,
  FormActionsUpdateGenerateMax,
  FormActionsUpdatePayback,
  FormActionsUpdatePaybackMax,
  FormActionsUpdateWithdraw,
  FormActionsUpdateWithdrawMax,
} from 'features/omni-kit/state'
import { handleNumericInput } from 'helpers/input'
import { zero } from 'helpers/zero'
import { useTranslation } from 'next-i18next'
import type { Dispatch } from 'react'
import React from 'react'

interface OmniFormField<D> {
  dispatchAmount: Dispatch<D>
  isDisabled?: boolean
  resetOnClear?: boolean
}

interface OmniFormFieldWithDefinedToken {
  token: string
  tokenDigits?: number
  tokenPrecision: number
  tokenPrice: BigNumber
}

interface OmniFormFieldWithMinAmount {
  minAmount?: BigNumber
  minAmountLabel?: string
}

interface OmniFormFieldWithMaxAmount {
  maxAmount?: BigNumber
  maxAmountLabel?: string
}

export function OmniFormFieldDeposit({
  dispatchAmount,
  isDisabled,
  maxAmount,
  maxAmountLabel = 'balance',
  resetOnClear,
  token,
  tokenDigits,
  tokenPrecision,
  tokenPrice,
}: OmniFormField<FormActionsUpdateDeposit> &
  OmniFormFieldWithDefinedToken &
  OmniFormFieldWithMaxAmount) {
  const { t } = useTranslation()
  const {
    environment: { isOracless, productType },
  } = useOmniGeneralContext()
  const {
    form: { dispatch, state },
    dynamicMetadata: {
      validations: { isFormFrozen },
    },
  } = useOmniProductContext(productType)

  return 'depositAmount' in state && 'depositAmountUSD' in state ? (
    <VaultActionInput
      action="Deposit"
      currencyCode={token}
      currencyDigits={tokenDigits}
      tokenUsdPrice={tokenPrice}
      amount={state.depositAmount}
      auxiliaryAmount={state.depositAmountUSD}
      hasAuxiliary={!isOracless}
      hasError={false}
      disabled={isDisabled || isFormFrozen}
      showMax={true}
      maxAmount={maxAmount}
      maxAuxiliaryAmount={maxAmount?.times(tokenPrice)}
      maxAmountLabel={t(maxAmountLabel)}
      onChange={handleNumericInput((n) => {
        dispatchAmount({
          type: 'update-deposit',
          depositAmount: n,
          depositAmountUSD: n?.times(tokenPrice),
        })
        if (!n && resetOnClear) dispatch({ type: 'reset' })
      })}
      onAuxiliaryChange={handleNumericInput((n) => {
        dispatchAmount({
          type: 'update-deposit',
          depositAmount: n?.dividedBy(tokenPrice).dp(tokenPrecision),
          depositAmountUSD: n,
        })
        if (!n && resetOnClear) dispatch({ type: 'reset' })
      })}
      onSetMax={() => {
        dispatchAmount({
          type: 'update-deposit',
          depositAmount: maxAmount,
          depositAmountUSD: maxAmount?.times(tokenPrice),
        })
      }}
    />
  ) : null
}

export function OmniFormFieldGenerate({
  dispatchAmount,
  isDisabled,
  maxAmount,
  maxAmountLabel = 'max',
  minAmount,
  minAmountLabel = 'field-from',
  resetOnClear,
}: OmniFormField<FormActionsUpdateGenerate | FormActionsUpdateGenerateMax> &
  OmniFormFieldWithMinAmount &
  OmniFormFieldWithMaxAmount) {
  const { t } = useTranslation()
  const {
    environment: { isOracless, productType, quoteDigits, quotePrice, quoteToken, quotePrecision },
  } = useOmniGeneralContext()
  const {
    form: { dispatch, state },
    dynamicMetadata: {
      validations: { isFormFrozen },
    },
  } = useOmniProductContext(productType)

  return 'generateAmount' in state && 'generateAmountUSD' in state ? (
    <VaultActionInput
      action="Borrow"
      currencyCode={quoteToken}
      currencyDigits={quoteDigits}
      tokenUsdPrice={quotePrice}
      amount={state.generateAmount}
      auxiliaryAmount={state.generateAmountUSD}
      hasAuxiliary={!isOracless}
      hasError={false}
      disabled={isDisabled || isFormFrozen}
      showMin={minAmount?.gt(zero)}
      minAmount={minAmount}
      minAmountLabel={t(minAmountLabel)}
      minAuxiliaryAmount={minAmount?.times(quotePrice)}
      showMax={maxAmount?.gt(zero)}
      maxAmount={maxAmount}
      maxAmountLabel={t(maxAmountLabel)}
      maxAuxiliaryAmount={maxAmount?.times(quotePrice)}
      onChange={handleNumericInput((n) => {
        dispatchAmount({
          type: 'update-generate',
          generateAmount: n,
          generateAmountUSD: n?.times(quotePrice),
        })
        dispatchAmount({
          type: 'update-generate-max',
          generateAmountMax: false,
        })
        if (!n && resetOnClear) dispatch({ type: 'reset' })
      })}
      onAuxiliaryChange={handleNumericInput((n) => {
        dispatchAmount({
          type: 'update-generate',
          generateAmount: n?.dividedBy(quotePrice).dp(quotePrecision),
          generateAmountUSD: n,
        })
        if (!n && resetOnClear) dispatch({ type: 'reset' })
      })}
      onSetMin={() => {
        dispatchAmount({
          type: 'update-generate',
          generateAmount: minAmount,
          generateAmountUSD: minAmount?.times(quotePrice),
        })
      }}
      onSetMax={() => {
        dispatchAmount({
          type: 'update-generate',
          generateAmount: maxAmount,
          generateAmountUSD: maxAmount?.times(quotePrice),
        })
        dispatchAmount({
          type: 'update-generate-max',
          generateAmountMax: true,
        })
      }}
    />
  ) : null
}

export function OmniFormFieldPayback({
  dispatchAmount,
  isDisabled,
  maxAmount,
  maxAmountLabel = 'max',
  resetOnClear,
}: OmniFormField<FormActionsUpdatePayback | FormActionsUpdatePaybackMax> &
  OmniFormFieldWithMaxAmount) {
  const { t } = useTranslation()
  const {
    environment: { isOracless, quoteDigits, quotePrice, quoteToken, productType, quotePrecision },
  } = useOmniGeneralContext()
  const {
    form: { dispatch, state },
    dynamicMetadata: {
      validations: { isFormFrozen },
    },
  } = useOmniProductContext(productType)

  return 'paybackAmount' in state && 'paybackAmountUSD' in state ? (
    <VaultActionInput
      action="Pay back"
      currencyCode={quoteToken}
      currencyDigits={quoteDigits}
      tokenUsdPrice={quotePrice}
      amount={state.paybackAmount}
      auxiliaryAmount={state.paybackAmountUSD}
      hasAuxiliary={!isOracless}
      hasError={false}
      disabled={isDisabled || isFormFrozen}
      showMax={true}
      maxAmount={maxAmount}
      maxAuxiliaryAmount={maxAmount?.times(quotePrice)}
      maxAmountLabel={t(maxAmountLabel)}
      onChange={handleNumericInput((n) => {
        dispatchAmount({
          type: 'update-payback',
          paybackAmount: n,
          paybackAmountUSD: n?.times(quotePrice),
        })
        dispatchAmount({
          type: 'update-payback-max',
          paybackAmountMax: false,
        })
        if (!n && resetOnClear) dispatch({ type: 'reset' })
      })}
      onAuxiliaryChange={handleNumericInput((n) => {
        dispatchAmount({
          type: 'update-payback',
          paybackAmount: n?.dividedBy(quotePrice).dp(quotePrecision),
          paybackAmountUSD: n,
        })
        if (!n && resetOnClear) dispatch({ type: 'reset' })
      })}
      onSetMax={() => {
        dispatchAmount({
          type: 'update-payback',
          paybackAmount: maxAmount,
          paybackAmountUSD: maxAmount?.times(quotePrice),
        })
        dispatchAmount({
          type: 'update-payback-max',
          paybackAmountMax: true,
        })
      }}
    />
  ) : null
}

export function OmniFormFieldWithdraw({
  dispatchAmount,
  isDisabled,
  maxAmount,
  maxAmountLabel = 'max',
  resetOnClear,
  token,
  tokenDigits,
  tokenPrice,
  tokenPrecision,
}: OmniFormField<FormActionsUpdateWithdraw | FormActionsUpdateWithdrawMax> &
  OmniFormFieldWithDefinedToken &
  OmniFormFieldWithMaxAmount) {
  const { t } = useTranslation()

  const {
    environment: { isOracless, productType },
  } = useOmniGeneralContext()
  const {
    form: { dispatch, state },
    dynamicMetadata: {
      validations: { isFormFrozen },
    },
  } = useOmniProductContext(productType)

  return 'withdrawAmount' in state && 'withdrawAmountUSD' in state ? (
    <VaultActionInput
      action="Withdraw"
      currencyCode={token}
      currencyDigits={tokenDigits}
      tokenUsdPrice={tokenPrice}
      amount={state.withdrawAmount}
      auxiliaryAmount={state.withdrawAmountUSD}
      hasAuxiliary={!isOracless}
      hasError={false}
      disabled={isDisabled || isFormFrozen}
      showMax={maxAmount?.gt(zero)}
      maxAmount={maxAmount}
      maxAmountLabel={t(maxAmountLabel)}
      maxAuxiliaryAmount={maxAmount?.times(tokenPrice)}
      onChange={handleNumericInput((n) => {
        dispatchAmount({
          type: 'update-withdraw',
          withdrawAmount: n,
          withdrawAmountUSD: n?.times(tokenPrice),
        })
        dispatchAmount({
          type: 'update-withdraw-max',
          withdrawAmountMax: false,
        })
        if (!n && resetOnClear) dispatch({ type: 'reset' })
      })}
      onAuxiliaryChange={handleNumericInput((n) => {
        dispatchAmount({
          type: 'update-withdraw',
          withdrawAmount: n?.dividedBy(tokenPrice).dp(tokenPrecision),
          withdrawAmountUSD: n,
        })
        dispatchAmount({
          type: 'update-withdraw-max',
          withdrawAmountMax: false,
        })
        if (!n && resetOnClear) dispatch({ type: 'reset' })
      })}
      onSetMax={() => {
        dispatchAmount({
          type: 'update-withdraw',
          withdrawAmount: maxAmount,
          withdrawAmountUSD: maxAmount?.times(tokenPrice),
        })
        dispatchAmount({
          type: 'update-withdraw-max',
          withdrawAmountMax: true,
        })
      }}
    />
  ) : null
}
