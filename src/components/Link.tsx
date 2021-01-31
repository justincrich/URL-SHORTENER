import React from 'react'
import styled, { css } from 'styled-components/macro'
import { mixins } from '../styles/mixins'
import { color } from '../styles/color'
import { Icon as RawIcon, IconsProps } from './Icon/index'
import { SPACING } from '../styles/mixins/constants'

interface LinkProps {
    children: string
    to: string
    icon?: IconsProps['iconName']
    className?: string
    target?: string
}
export const Link = (props: LinkProps): JSX.Element => {
    const { children, to, className, icon, target } = props
    return (
        <Component className={className} href={to} target={target}>
            {icon && <Icon iconName={icon} />}
            <Text>{children}</Text>
        </Component>
    )
}

export const linkStyles = css`
 ${mixins.text('paragraph')}
  color: ${color.link.primary};
  text-decoration: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`

const Component = styled.a`
    ${linkStyles}
`

const Icon = styled(RawIcon).attrs({
    color: 'activity',
})`
    margin-right: ${SPACING[1]};
`

const Text = styled.span``
