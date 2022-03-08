import Link from 'next/link'
import { FC, useMemo } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { startCase } from 'lodash'

interface AppBreadcrumbProps {
  dashboard: boolean,
  steps?: string[],
  children: string
}

interface IMappedState {
  label: string,
  to: string
}

const mappedStates: Record<string, Partial<IMappedState>> = {

}

const AppBreadcrumb: FC<AppBreadcrumbProps> = ({ children = 'root', dashboard = false, steps = [] }) => {
  const computedSteps = useMemo<IMappedState[]>(() => {
    return steps.filter(step => !!mappedStates[step])
      .map(step => {
        let mappedState = mappedStates[step]
        return { label: startCase(step), to: `/${step}`, ...mappedState }
      })
  }, [steps])
  return (
    <Breadcrumb>
      {dashboard ? (
        <Link href="/dashboard" passHref>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Link> 
      ) : null}
      {computedSteps.map((step, index) => (
        <Link href={step.to} passHref key={index}>
          <Breadcrumb.Item>{step.label}</Breadcrumb.Item>
        </Link> 
      ))}
      <Breadcrumb.Item active>{ children }</Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default AppBreadcrumb