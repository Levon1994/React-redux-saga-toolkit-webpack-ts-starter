import Fetch from './fetch';

export default class CreateActionCreator {
    static read = ({ type, ...options }: { type: string, path: string }) => CreateActionCreator.dispatch(Fetch.get(options), type);

    static create = ({ type, ...options }: { type: string, path: string }) => CreateActionCreator.dispatch(Fetch.post(options), `${type}_CREATE`);

    static update = ({ type, ...options }: { type: string, path: string }) => CreateActionCreator.dispatch(Fetch.patch(options), `${type}_UPDATE`);

    static delete = ({ type, ...options }: { type: string, path: string }) => CreateActionCreator.dispatch(Fetch.delete(options), `${type}_DELETE`);

    static dispatch = (promise: any, type: string) => (dispatch: any) => {
        promise
            .then((response: any) => dispatch({
                type,
                payload: response,
            }))
            .catch((error: any) => dispatch({
                type: `${type}_FAILURE`,
                payload: error,
            }));

        return promise;
    };
};
