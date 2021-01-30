import React from 'react'
import styled from 'styled-components'
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
    return (
        <Container className={className}>
            <Column>
                <Content>{children}</Content>
            </Column>
        </Container>
    )
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

const Content = styled.div`
    display: flex;
    flex-flow: column nowrap;
    flex: 1 1 auto;
    overflow: hidden;
    max-width: 100%;
`

const Column = styled.div`
    flex-flow: column nowrap;
    display: flex;
    flex: 1 1 auto;
    max-width: 100%;
`

Layout.Container = Container
