import type { LendingProtocol, LendingProtocolLabel } from 'lendingProtocols'
import {
  MarketingProductBoxComposition,
  MarketingTemplateComparisonTableProps,
  MarketingTemplatePalette,
} from 'features/marketing-layouts/types'
import { LandingPageRawBlocks } from 'contentful/types'
import { ProductHubProductType } from 'features/productHub/types'

export interface LandingPageRawBlocksCollection {
  total: string
  items: {
    sys: {
      id: string
    }
    title: string
    subtitle: string
    description: {
      json: string
    }
    contentCollection: {
      total: string
      items: {
        __typename: LandingPageRawBlocks
        sys: {
          id: string
        }
      }[]
    }
  }[]
}

export interface LandingPageRawResponse {
  data: {
    landingPageCollection: {
      items: {
        hero: {
          protocolCollection: {
            items: {
              name: LendingProtocolLabel
              slug: LendingProtocol
            }[]
          }
          title: string
          description: string
          image: {
            filename: string
            url: string
          }
          link: {
            label: string
            url: string
          }
        }
        palette: MarketingTemplatePalette
        blocksCollection: LandingPageRawBlocksCollection
      }[]
    }
  }
}

export interface LendingPageBannerRawResponse {
  __typename: LandingPageRawBlocks.BANNER
  title: string
  description: {
    json: string
  }
  cta: {
    label: string
    url: string
  }
}

export interface LendingPageComparisonTableRawResponse {
  __typename: LandingPageRawBlocks.COMPARISON_TABLE
  table: MarketingTemplateComparisonTableProps
}

export interface LendingPageBenefitBoxRawResponse {
  __typename: LandingPageRawBlocks.BENEFIT_BOX
  title: string
  description: {
    json: string
  }
  icon: {
    url: string
    title: string
  }
}

export interface LendingPageInfoBoxRawResponse {
  __typename: LandingPageRawBlocks.INFO_BOX
  title: string
  description: {
    json: string
  }
  image: {
    title: string
    url: string
  }
  link: {
    label: string
    url: string
  }
  tokens: string[]
}

export interface LendingPageProductBoxRawResponse {
  __typename: LandingPageRawBlocks.PRODUCT_BOX
  title: string
  description: {
    json: string
  }
  type: string
  image: {
    title: string
    url: string
  }
  link: {
    label: string
    url: string
  }
  composition: MarketingProductBoxComposition
  actionsListCollection: {
    items: {
      label: string
      description: string
      icon: {
        url: string
        title: string
      }
    }[]
  }
}

export interface ProductFinderRawResponse {
  __typename: LandingPageRawBlocks.PRODUCT_FINDER
  name: string
  token: string
  product: {
    slug: ProductHubProductType
    name: string
  }
  initialProtocolCollection: {
    items: {
      slug: LendingProtocol
      name: LendingProtocolLabel
    }[]
  }
  initialNetworkCollection: {
    items: {
      slug: string
      name: string
    }[]
  }
  promoCardsCollection: {
    items: {
      name: string
      network: { name: string; slug: string }
      primaryToken: string
      secondaryToken: string
      protocol: {
        name: string
        slug: string
      }
      product: {
        name: string
        slug: string
      }
    }[]
  }
}

export type EntryCollectionRawItemResponse = {
  sys: {
    id: string
  }
} & (
  | LendingPageBannerRawResponse
  | LendingPageBenefitBoxRawResponse
  | LendingPageInfoBoxRawResponse
  | LendingPageProductBoxRawResponse
  | ProductFinderRawResponse
)

export interface EntryRawResponse {
  data: {
    entryCollection: {
      total: string
      items: EntryCollectionRawItemResponse[]
    }
  }
}
