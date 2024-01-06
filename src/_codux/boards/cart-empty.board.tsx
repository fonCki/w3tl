import { createBoard } from '@wixc3/react-board';
import { CartIcon } from '@components/Icons';
import { RUBBER_DUCKY } from '../../data';

export default createBoard({
    name: 'Cart (empty)',
    Board: () => (
        <div>
            <CartIcon cart={[]} />
        </div>
    ),
    isSnippet: true,
});
