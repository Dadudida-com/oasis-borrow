import BigNumber from 'bignumber.js'
import { ContentCardProps, DetailsSectionContentCard } from 'components/DetailsSectionContentCard'
import { formatDecimalAsPercent } from 'helpers/formatters/format'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { theme } from 'theme'

const { colors } = theme

const getLTVRatioColor = (ratio: BigNumber) => {
  const critical = new BigNumber(5)
  const warning = new BigNumber(20)

  switch (true) {
    case ratio.isLessThanOrEqualTo(critical):
      return colors.critical10
    case ratio.isLessThanOrEqualTo(warning):
      return colors.warning10
    default:
      return colors.success10
  }
}

interface ContentCardLtvProps {
  loanToValue: BigNumber
  liquidationThreshold: BigNumber
  afterLoanToValue?: BigNumber
}

export function ContentCardLtv({
  loanToValue,
  liquidationThreshold,
  afterLoanToValue,
}: ContentCardLtvProps) {
  const { t } = useTranslation()

  const formatted = {
    loanToValue: formatDecimalAsPercent(loanToValue),
    afterLoanToValue: afterLoanToValue && formatDecimalAsPercent(afterLoanToValue),
    liquidationThreshold: liquidationThreshold,
  }

  const contentCardSettings: ContentCardProps = {
    title: t('system.loan-to-value'),
    value: formatted.loanToValue,
    footnote: `${t('manage-earn-vault.liquidation-threshold', {
      percentage: formatted.liquidationThreshold,
    })}`,
    customBackground: !afterLoanToValue
      ? getLTVRatioColor(liquidationThreshold.minus(loanToValue).times(100))
      : 'transparent',
  }

  if (afterLoanToValue) {
    contentCardSettings.change = {
      variant: afterLoanToValue.lt(loanToValue) ? 'negative' : 'positive',
      value: `${formatted.afterLoanToValue} ${t('after')}`,
    }
  }

  return <DetailsSectionContentCard {...contentCardSettings} />
}