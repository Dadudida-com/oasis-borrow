import BigNumber from 'bignumber.js'
import { NetworkIds, NetworkNames } from 'blockchain/networks'
import { IStrategyConfig, ProxyType } from 'features/aave/common'
import { AaveManageHeader, AaveOpenHeader } from 'features/aave/common/components/AaveHeader'
import { adjustRiskView } from 'features/aave/common/components/SidebarAdjustRiskView'
import { AaveEarnFaqV3 } from 'features/content/faqs/aave/earn'
import { AaveMultiplyFaq } from 'features/content/faqs/aave/multiply'
import {
  AavePositionHeaderNoDetails,
  headerWithDetails,
} from 'features/earn/aave/components/AavePositionHeader'
import { ManageSectionComponent } from 'features/earn/aave/components/ManageSectionComponent'
import { SimulateSectionComponent } from 'features/earn/aave/components/SimulateSectionComponent'
import { ViewPositionSectionComponent } from 'features/earn/aave/components/ViewPositionSectionComponent'
import { adjustRiskSliders } from 'features/earn/aave/riskSliderConfig'
import { AaveMultiplyManageComponent } from 'features/multiply/aave/components/AaveMultiplyManageComponent'
import { adjustRiskSliderConfig as multiplyAdjustRiskSliderConfig } from 'features/multiply/aave/riskSliderConfig'
import { LendingProtocol } from 'lendingProtocols'

import { allActionsAvailable } from './all-actions-available'

export const ethereumAaveV3Strategies: Array<IStrategyConfig> = [
  {
    network: NetworkNames.ethereumMainnet,
    networkId: NetworkIds.MAINNET,
    name: 'wstETHethV3',
    urlSlug: 'wstetheth',
    proxyType: ProxyType.DpmProxy,
    viewComponents: {
      headerOpen: headerWithDetails(adjustRiskSliders.wstethEth.riskRatios.minimum),
      headerManage: AavePositionHeaderNoDetails,
      headerView: AavePositionHeaderNoDetails,
      simulateSection: SimulateSectionComponent,
      vaultDetailsManage: ManageSectionComponent,
      vaultDetailsView: ViewPositionSectionComponent,
      secondaryInput: adjustRiskView(adjustRiskSliders.wstethEth),
      positionInfo: AaveEarnFaqV3,
      sidebarTitle: 'open-earn.aave.vault-form.title',
      sidebarButton: 'open-earn.aave.vault-form.open-btn',
    },
    tokens: {
      collateral: 'WSTETH',
      debt: 'ETH',
      deposit: 'ETH',
    },
    riskRatios: adjustRiskSliders.wstethEth.riskRatios,
    type: 'Earn',
    protocol: LendingProtocol.AaveV3,
    featureToggle: 'AaveV3EarnWSTETH',
    availableActions: allActionsAvailable,
    defaultSlippage: new BigNumber(0.001),
    executeTransactionWith: 'ethers',
  },

  {
    network: NetworkNames.ethereumMainnet,
    networkId: NetworkIds.MAINNET,
    name: 'rethethV3',
    urlSlug: 'retheth',
    proxyType: ProxyType.DpmProxy,
    viewComponents: {
      headerOpen: AaveOpenHeader,
      headerManage: AaveManageHeader,
      headerView: AaveManageHeader,
      simulateSection: AaveMultiplyManageComponent,
      vaultDetailsManage: AaveMultiplyManageComponent,
      vaultDetailsView: AaveMultiplyManageComponent,
      secondaryInput: adjustRiskView(multiplyAdjustRiskSliderConfig),
      positionInfo: AaveMultiplyFaq,
      sidebarTitle: 'open-multiply.sidebar.title',
      sidebarButton: 'open-multiply.sidebar.open-btn',
    },
    tokens: {
      collateral: 'RETH',
      debt: 'ETH',
      deposit: 'RETH',
    },
    riskRatios: multiplyAdjustRiskSliderConfig.riskRatios,
    type: 'Multiply',
    protocol: LendingProtocol.AaveV3,
    featureToggle: 'AaveV3EarnrETHeth',
    availableActions: allActionsAvailable,
    defaultSlippage: new BigNumber(0.001),
    executeTransactionWith: 'ethers',
  },
  {
    network: NetworkNames.ethereumMainnet,
    networkId: NetworkIds.MAINNET,
    name: 'cbethethV3',
    urlSlug: 'cbetheth',
    proxyType: ProxyType.DpmProxy,
    viewComponents: {
      headerOpen: AaveOpenHeader,
      headerManage: AaveManageHeader,
      headerView: AaveManageHeader,
      simulateSection: AaveMultiplyManageComponent,
      vaultDetailsManage: AaveMultiplyManageComponent,
      vaultDetailsView: AaveMultiplyManageComponent,
      secondaryInput: adjustRiskView(multiplyAdjustRiskSliderConfig),
      positionInfo: AaveMultiplyFaq,
      sidebarTitle: 'open-multiply.sidebar.title',
      sidebarButton: 'open-multiply.sidebar.open-btn',
    },
    tokens: {
      collateral: 'CBETH',
      debt: 'ETH',
      deposit: 'CBETH',
    },
    riskRatios: multiplyAdjustRiskSliderConfig.riskRatios,
    type: 'Multiply',
    protocol: LendingProtocol.AaveV3,
    featureToggle: 'AaveV3EarncbETHeth',
    availableActions: allActionsAvailable,
    defaultSlippage: new BigNumber(0.001),
    executeTransactionWith: 'ethers',
  },

  {
    network: NetworkNames.ethereumMainnet,
    networkId: NetworkIds.MAINNET,
    name: 'ethusdcV3',
    urlSlug: 'ethusdc',
    proxyType: ProxyType.DpmProxy,
    viewComponents: {
      headerOpen: AaveOpenHeader,
      headerManage: AaveManageHeader,
      headerView: AaveManageHeader,
      simulateSection: AaveMultiplyManageComponent,
      vaultDetailsManage: AaveMultiplyManageComponent,
      vaultDetailsView: AaveMultiplyManageComponent,
      secondaryInput: adjustRiskView(multiplyAdjustRiskSliderConfig),
      positionInfo: AaveMultiplyFaq,
      sidebarTitle: 'open-multiply.sidebar.title',
      sidebarButton: 'open-multiply.sidebar.open-btn',
    },
    tokens: {
      collateral: 'ETH',
      debt: 'USDC',
      deposit: 'ETH',
    },
    riskRatios: multiplyAdjustRiskSliderConfig.riskRatios,
    type: 'Multiply',
    protocol: LendingProtocol.AaveV3,
    featureToggle: 'AaveV3MultiplyETHusdc',
    availableActions: allActionsAvailable,
    executeTransactionWith: 'ethers',
  },
  {
    network: NetworkNames.ethereumMainnet,
    networkId: NetworkIds.MAINNET,
    name: 'cbETHusdcV3',
    urlSlug: 'cbethusdc',
    proxyType: ProxyType.DpmProxy,
    viewComponents: {
      headerOpen: AaveOpenHeader,
      headerManage: AaveManageHeader,
      headerView: AaveManageHeader,
      simulateSection: AaveMultiplyManageComponent,
      vaultDetailsManage: AaveMultiplyManageComponent,
      vaultDetailsView: AaveMultiplyManageComponent,
      secondaryInput: adjustRiskView(multiplyAdjustRiskSliderConfig),
      positionInfo: AaveMultiplyFaq,
      sidebarTitle: 'open-multiply.sidebar.title',
      sidebarButton: 'open-multiply.sidebar.open-btn',
    },
    tokens: {
      collateral: 'CBETH',
      debt: 'USDC',
      deposit: 'CBETH',
    },
    riskRatios: multiplyAdjustRiskSliderConfig.riskRatios,
    type: 'Multiply',
    protocol: LendingProtocol.AaveV3,
    featureToggle: 'AaveV3MultiplycbETHusdc',
    availableActions: allActionsAvailable,
    executeTransactionWith: 'ethers',
  },
  {
    network: NetworkNames.ethereumMainnet,
    networkId: NetworkIds.MAINNET,
    name: 'wBTCusdcV3',
    urlSlug: 'wbtcusdc',
    proxyType: ProxyType.DpmProxy,
    viewComponents: {
      headerOpen: AaveOpenHeader,
      headerManage: AaveManageHeader,
      headerView: AaveManageHeader,
      simulateSection: AaveMultiplyManageComponent,
      vaultDetailsManage: AaveMultiplyManageComponent,
      vaultDetailsView: AaveMultiplyManageComponent,
      secondaryInput: adjustRiskView(multiplyAdjustRiskSliderConfig),
      positionInfo: AaveMultiplyFaq,
      sidebarTitle: 'open-multiply.sidebar.title',
      sidebarButton: 'open-multiply.sidebar.open-btn',
    },
    tokens: {
      collateral: 'WBTC',
      debt: 'USDC',
      deposit: 'WBTC',
    },
    riskRatios: multiplyAdjustRiskSliderConfig.riskRatios,
    type: 'Multiply',
    protocol: LendingProtocol.AaveV3,
    featureToggle: 'AaveV3MultiplywBTCusdc',
    availableActions: allActionsAvailable,
    executeTransactionWith: 'ethers',
  },
  {
    network: NetworkNames.ethereumMainnet,
    networkId: NetworkIds.MAINNET,
    name: 'wstethusdcV3',
    urlSlug: 'wstethusdc',
    proxyType: ProxyType.DpmProxy,
    viewComponents: {
      headerOpen: AaveOpenHeader,
      headerManage: AaveManageHeader,
      headerView: AaveManageHeader,
      simulateSection: AaveMultiplyManageComponent,
      vaultDetailsManage: AaveMultiplyManageComponent,
      vaultDetailsView: AaveMultiplyManageComponent,
      secondaryInput: adjustRiskView(multiplyAdjustRiskSliderConfig),
      positionInfo: AaveMultiplyFaq,
      sidebarTitle: 'open-multiply.sidebar.title',
      sidebarButton: 'open-multiply.sidebar.open-btn',
    },
    tokens: {
      collateral: 'WSTETH',
      debt: 'USDC',
      deposit: 'WSTETH',
    },
    riskRatios: multiplyAdjustRiskSliderConfig.riskRatios,
    type: 'Multiply',
    protocol: LendingProtocol.AaveV3,
    featureToggle: 'AaveV3MultiplywstETHusdc',
    availableActions: allActionsAvailable,
    executeTransactionWith: 'ethers',
  },
  {
    network: NetworkNames.ethereumMainnet,
    networkId: NetworkIds.MAINNET,
    name: 'rethusdcV3',
    urlSlug: 'rethusdc',
    proxyType: ProxyType.DpmProxy,
    viewComponents: {
      headerOpen: AaveOpenHeader,
      headerManage: AaveManageHeader,
      headerView: AaveManageHeader,
      simulateSection: AaveMultiplyManageComponent,
      vaultDetailsManage: AaveMultiplyManageComponent,
      vaultDetailsView: AaveMultiplyManageComponent,
      secondaryInput: adjustRiskView(multiplyAdjustRiskSliderConfig),
      positionInfo: AaveMultiplyFaq,
      sidebarTitle: 'open-multiply.sidebar.title',
      sidebarButton: 'open-multiply.sidebar.open-btn',
    },
    tokens: {
      collateral: 'RETH',
      debt: 'USDC',
      deposit: 'RETH',
    },
    riskRatios: multiplyAdjustRiskSliderConfig.riskRatios,
    type: 'Multiply',
    protocol: LendingProtocol.AaveV3,
    featureToggle: 'AaveV3MultiplyrETHusdc',
    availableActions: allActionsAvailable,
    executeTransactionWith: 'ethers',
  },
]