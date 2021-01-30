import React from 'react'

export class ErrorGuard extends React.Component<
    {
        children: JSX.Element | JSX.Element[]
    },
    { error: Error | null }
> {
    constructor(props) {
        super(props)
        this.state = { error: null }
    }

    static getDerivedStateFromError(error: Error): { error: Error } {
        return { error }
    }

    render(): React.ReactNode {
        const { error } = this.state
        const { children } = this.props
        if (error) {
            return <div>something went wrong</div>
        }
        return children
    }
}
