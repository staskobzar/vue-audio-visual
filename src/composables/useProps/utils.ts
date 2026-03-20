import { unref, type MaybeRef } from 'vue'

export const isUndef = (v: string | string[] | number | boolean | object | undefined): boolean => v === undefined

export function resolvePropNum(
  val: MaybeRef<{type: NumberConstructor; default: number}>,
  defVal: number
): number {
  const realVal = unref(val)
  return isUndef(realVal) ? defVal : Number(realVal)
}

export function resolvePropColor(
  val: MaybeRef<{type: (StringConstructor | ArrayConstructor)[]}>,
  def: string | string[]
): string | string[] {
  const color = unref(val)
  if (Array.isArray(color)) {
    return color
  }

  return color ? String(color) : def
}

export function resolvePropString(
  val: MaybeRef<{type: StringConstructor}>,
  def: string
): string {
  const v = unref(val)
  return isUndef(v) ? def : String(v)
}

export function resolvePropBool(
  val: MaybeRef<{type: BooleanConstructor}>,
  def: boolean
): boolean {
  const v = unref(val)
  return isUndef(v) ? def : Boolean(v)
}
