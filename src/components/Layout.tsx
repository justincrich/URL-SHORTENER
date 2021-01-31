import React from 'react'
import styled from 'styled-components/macro'
import { color } from '../styles/color'

interface LayoutProps {
    className?: string
    children: JSX.Element | JSX.Element[] | string
    hideProfile?: boolean
    headerLeft?: JSX.Element
    headerRight?: JSX.Element
    headerCenter?: JSX.Element
}
export const Layout = ({ className, children }: LayoutProps): JSX.Element => {
    return <Container className={className}>{children}</Container>
}

const Container = styled.div`
    width: 100%;
    min-width: 320px;
    height: 100%;
    background-color: ${color.background.app};
    display: flex;
    flex-flow: row nowrap;
    flex: 1 1 auto;
`

Layout.Container = Container
