import type BigNumber from 'bignumber.js'
import { Skeleton } from 'components/Skeleton'
import { useAjnaRewards } from 'features/ajna/rewards/hooks'
import type { OmniContentCardExtra } from 'features/omni-kit/components/details-section'
import { AjnaCardDataBorrowRateModal } from 'features/omni-kit/protocols/ajna/components/details-section'
import { isPoolWithRewards } from 'features/omni-kit/protocols/ajna/helpers'
import { formatAddress, formatCryptoBalance } from 'helpers/formatters/format'
import { Trans, useTranslation } from 'next-i18next'
import React from 'react'
import { sparks } from 'theme/icons'
import { Text } from 'theme-ui'

interface AjnaCardDataBorrowRateParams {
  borrowRate: BigNumber
  collateralToken: string
  debtAmount: BigNumber
  isOwner: boolean
  owner: string
  quotePrice?: BigNumber
  quoteToken: string
}

export function useAjnaCardDataBorrowRate({
  borrowRate,
  collateralToken,
  debtAmount,
  isOwner,
  owner,
  quotePrice,
  quoteToken,
}: AjnaCardDataBorrowRateParams): OmniContentCardExtra {
  const { t } = useTranslation()

  const {
    isLoading,
    rewards: { claimable, total },
  } = useAjnaRewards(owner)

  return {
    modal: (
      <AjnaCardDataBorrowRateModal
        borrowRate={borrowRate}
        debtAmount={debtAmount}
        quoteToken={quoteToken}
        quotePrice={quotePrice}
      />
    ),
    ...(isPoolWithRewards({ collateralToken, quoteToken }) && {
      icon: sparks,
      tooltips: {
        icon: (
          <>
            <Text as="p">
              <Trans
                i18nKey={
                  isOwner
                    ? 'ajna.content-card.borrow-rate.tooltip-description'
                    : 'ajna.content-card.borrow-rate.tooltip-description-non-owner'
                }
                values={{ address: formatAddress(owner) }}
                components={{ strong: <Text sx={{ fontWeight: 'semiBold' }} /> }}
              />
            </Text>
            <Text as="p" sx={{ mt: 2 }}>
              {isLoading ? (
                <Skeleton width="64px" count={2} gap={1} />
              ) : (
                <>
                  <Text sx={{ fontWeight: 'semiBold' }}>{formatCryptoBalance(total)} $AJNA</Text>{' '}
                  {t('ajna.content-card.borrow-rate.tooltip-value-1')}
                  <br />
                  <Text sx={{ fontWeight: 'semiBold' }}>
                    {formatCryptoBalance(claimable)} $AJNA
                  </Text>{' '}
                  {t('ajna.content-card.borrow-rate.tooltip-value-2')}
                </>
              )}
            </Text>
          </>
        ),
      },
    }),
  }
}