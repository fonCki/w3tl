// jquery.semantic-ui.d.ts
import 'jquery';

declare global {
    interface JQuery {
        shape(behavior?: string, ...args: any[]): JQuery;
    }
}
