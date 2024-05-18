import { Feed, Placeholder } from 'semantic-ui-react';

/**
 * Represents a placeholder component for a tweet line.
 *
 * @returns {JSX.Element} The rendered JSX element.
 *
 * @example
 * <TweetLinePlaceHolder />
 */
const TweetLinePlaceHolder = () => {
    return (
    <Feed.Event className="relative hover:bg-gray-100">
        <div
            className="bg-white flex justify-between align-middle w-full p-4 rounded-lg shadow hover:bg-gray-100">
            <Placeholder style={{ flex: '0 0 auto' }}>
                <Placeholder.Image style={{ width: 70, height: 70 }} />
            </Placeholder>
            <div style={{ flex: '1 1 auto', paddingLeft: 20 }}>
                <Placeholder>
                    <Placeholder.Header>
                        <Placeholder.Line length="full" style={{ marginBottom: 10 }} />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length="very long" />
                        <Placeholder.Line length="medium" />
                    </Placeholder.Paragraph>
                </Placeholder>
            </div>
        </div>
    </Feed.Event>)
}

export default TweetLinePlaceHolder;