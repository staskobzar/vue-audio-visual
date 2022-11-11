export * from './utils'
export * from './Bars'
export * from './Line'
export * from './Circle'
export * from './Waveform'
export * from './Media'
import { commonProps } from './common'

export const PropsCommon = commonProps

export interface Props {
  canvWidth: number
  canvHeight: number
}
