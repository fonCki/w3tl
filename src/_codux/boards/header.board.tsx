import { createBoard } from '@wixc3/react-board';
import { Header } from '@components/Header';
import { RUBBER_DUCKY, SCROOGE } from '../../data';

export default createBoard({
    name: 'Header',
    Board: () => (
        <div>
            <Header
                cart={[
                    { product: RUBBER_DUCKY, size: 'S', quantity: 2 },
                    { product: RUBBER_DUCKY, size: 'XL', quantity: 1 },
                ]}
                user={SCROOGE}
            />
        </div>
    ),
    environmentProps: {
        canvasWidth: 800,
    },
    isSnippet: true,
});
