import type { NpmPackage } from '@api/types'

export function PackageResult(props: NpmPackage) {
  return (
    <li key={props.package.name}>
      {props.package.name}
    </li>
  )
}
