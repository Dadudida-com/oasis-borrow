import { normalizeValue } from '@oasisdex/dma-library'
import { BigNumber } from 'bignumber.js'
import { SliderValuePicker } from 'components/dumb/SliderValuePicker'
import { Icon } from 'components/Icon'
import { SkeletonLine } from 'components/Skeleton'
import { useOmniGeneralContext, useOmniProductContext } from 'features/omni-kit/contexts'
import { OmniProductType } from 'features/omni-kit/types'
import { formatCryptoBalance, formatDecimalAsPercent } from 'helpers/formatters/format'
import { one } from 'helpers/zero'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { arrow_right } from 'theme/icons'
import { Flex, Text } from 'theme-ui'

const min = new BigNumber(0.01)
const max = new BigNumber(0.99)
const openFlowInitialLtv = new BigNumber(0.1)

interface OmniAdjustSliderProps {
  disabled?: boolean
}

export function OmniAdjustSlider({ disabled = false }: OmniAdjustSliderProps) {
  const { t } = useTranslation()
  const {
    environment: { collateralToken, quoteToken, isShort, productType },
    steps: { currentStep },
  } = useOmniGeneralContext()

  if (productType === OmniProductType.Earn) {
    throw new Error('OmniAdjustSlider is not supported for earn')
  }

  const {
    form: {
      state: { loanToValue, depositAmount },
      dispatch,
    },
    position: {
      currentPosition: { position, simulation },
      isSimulationLoading,
    },
    dynamicMetadata: {
      values: { changeVariant, maxSliderAsMaxLtv },
    },
  } = useOmniProductContext(productType)

  const [depositChanged, setDepositChanged] = useState(false)

  useEffect(() => {
    if (depositChanged && !isSimulationLoading) {
      setDepositChanged(false)
    }
  }, [isSimulationLoading])

  useEffect(() => {
    setDepositChanged(true)

    if (!depositAmount) {
      setDepositChanged(false)
    }
  }, [depositAmount?.toString()])

  const resolvedValue = loanToValue || position.riskRatio.loanToValue
  const resolvedMax = maxSliderAsMaxLtv
    ? position.maxRiskRatio.loanToValue.decimalPlaces(2, BigNumber.ROUND_DOWN)
    : max

  const percentage = resolvedValue.minus(min).div(resolvedMax.minus(min)).times(100)
  const ltv = position.riskRatio.loanToValue
  const liquidationPrice = simulation?.liquidationPrice || position.liquidationPrice

  useEffect(() => {
    if (!loanToValue && currentStep === 'setup' && depositAmount) {
      dispatch({ type: 'update-loan-to-value', loanToValue: openFlowInitialLtv })
    }
  }, [loanToValue?.toString(), currentStep, depositAmount?.toString()])

  return (
    <SliderValuePicker
      sliderPercentageFill={percentage}
      leftBoundry={isShort ? normalizeValue(one.div(liquidationPrice)) : liquidationPrice}
      leftBoundryFormatter={(val) =>
        isSimulationLoading ? (
          <Flex sx={{ alignItems: 'center', height: '28px' }}>
            <SkeletonLine height="18px" />
          </Flex>
        ) : (
          `${formatCryptoBalance(val)} ${collateralToken}/${quoteToken}`
        )
      }
      rightBoundry={resolvedValue}
      rightBoundryFormatter={(val) => (
        <Flex sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          {depositChanged && isSimulationLoading ? (
            <SkeletonLine height="18px" sx={{ my: '5px' }} />
          ) : (
            <>
              {formatDecimalAsPercent(ltv)}
              {!ltv.eq(resolvedValue) && (
                <>
                  <Icon icon={arrow_right} size={14} sx={{ mx: 2 }} />
                  <Text
                    as="span"
                    sx={{ color: changeVariant === 'positive' ? 'success100' : 'critical100' }}
                  >
                    {formatDecimalAsPercent(val)}
                  </Text>
                </>
              )}
            </>
          )}
        </Flex>
      )}
      onChange={(value) => dispatch({ type: 'update-loan-to-value', loanToValue: value })}
      minBoundry={min}
      maxBoundry={resolvedMax}
      lastValue={resolvedValue}
      disabled={disabled}
      step={0.01}
      leftBottomLabel={t('slider.adjust-multiply.left-footer')}
      leftLabel={t('slider.adjust-multiply.left-label')}
      rightBottomLabel={t('slider.adjust-multiply.right-footer')}
      rightLabel={t('system.loan-to-value')}
    />
  )
}
