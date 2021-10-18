import * as worker from 'monaco-editor/esm/vs/editor/editor.worker';
import { GraphQLWorker } from './GraphQLWorker';
self.onmessage = () => {
    try {
        worker.initialize((ctx, createData) => {
            return new GraphQLWorker(ctx, createData);
        });
    }
    catch (err) {
        throw err;
    }
};
//# sourceMappingURL=graphql.worker.js.map