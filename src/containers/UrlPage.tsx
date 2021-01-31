import React from 'react'
import styled from 'styled-components/macro'
import isEqual from 'lodash/isEqual'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector } from 'react-redux'
import { Button as RawButton } from '../components/Button'
import { Input as RawInput } from '../components/Input'
import { Layout } from '../components/Layout'
import { color } from '../styles'
import { BORDER_RADIUS, SPACING } from '../styles/mixins/constants'
import { Spacer } from '../components/Spacer'
import { useUrlShortener } from '../hooks/useShortUrl'
import { useReduxDispatch } from '../services/index'
import { addShortUrl, selectShortUrls } from '../services/urls'
import { Link } from '../components/Link'
import { text } from '../styles/mixins/text'
import { Label } from '../components/Label'

interface UrlPageProps {
    className?: string
}

type FormData = { url: string }

const validationSchema = yup.object().shape({
    url: yup.string().required('Text input required').url('Invalid URL'),
})

export const UrlPage = (props: UrlPageProps): JSX.Element => {
    const { className } = props
    const { register, handleSubmit, errors } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
    })
    const recentlyShortenedUrls = useSelector(selectShortUrls, isEqual)
    const {
        isLoading,
        error: serverError,
        shortUrl,
        getShortUrl,
    } = useUrlShortener()
    const dispatch = useReduxDispatch()

    const handleSuccessfulSubmission = async (
        data: FormData
    ): Promise<void> => {
        const nextShortUrl = await getShortUrl(data.url)
        if (nextShortUrl) {
            dispatch(addShortUrl(nextShortUrl))
        }
    }

    const ActionElement = (
        <>
            <Spacer size={1} />
            <Button
                onClick={handleSubmit(handleSuccessfulSubmission)}
                size="small"
                disabled={Boolean(isLoading)}
            >
                Submit
            </Button>
        </>
    )

    const Message = shortUrl ? (
        <>
            <Spacer size={1} vertical />
            <SuccessMessage>
                Short URL successfully created:
                <Link to={shortUrl} target="_blank">
                    {shortUrl}
                </Link>
            </SuccessMessage>
        </>
    ) : (
        <div />
    )

    return (
        <Container className={className}>
            <Header>Short URL Generator</Header>
            <Content>
                <Input
                    name="url"
                    label="Long URL"
                    placeholder="Enter a valid URL"
                    ref={register({ required: true })}
                    onEnterPress={handleSubmit(handleSuccessfulSubmission)}
                    error={serverError || errors?.url?.message}
                    actionElement={ActionElement}
                />
                {Message}
            </Content>
            <>
                {recentlyShortenedUrls.length > 0 ? (
                    <>
                        <Spacer size={4} vertical />
                        <Content>
                            <Label>
                                Recently Generated Short Urls (
                                {recentlyShortenedUrls.length}
)
</Label>
                            <UrlContainer>
                                {recentlyShortenedUrls.map((url, index) => (
                                    <>
                                        {index > 0 && (
                                            <Spacer vertical size={1} />
                                        )}
                                        <Link to={url} target="_blank">
                                            {url}
                                        </Link>
                                    </>
                                ))}
                            </UrlContainer>
                        </Content>
                    </>
                ) : (
                    <div />
                )}
            </>
        </Container>
    )
}

const Container = styled(Layout)`
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
    padding: ${SPACING[1]};
`

const SuccessMessage = styled.div`
    ${text('sub')}
`

const Button = styled(RawButton)`
    align-self: flex-end;
`

const Input = styled(RawInput)`
    flex: 1 1 auto;
`

const Content = styled.div`
    background-color: ${color.background.content};
    padding: ${SPACING[2]};
    border-radius: ${BORDER_RADIUS};
    max-width: 600px;
    max-height: 150px;
    width: 100%;
`

const Header = styled.h1`
    position: absolute;
    top: ${SPACING[1]};
    left: ${SPACING[1]};
`

const UrlContainer = styled.div`
    overflow: auto;
    display: flex;
    flex-flow: column nowrap;
    flex: 1 1 auto;
`
