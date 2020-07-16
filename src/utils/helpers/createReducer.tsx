const createReducer = (type: string, uniqueKey?: any) => (state = [], action: any) => {
    const { payload } = action;

    switch (action.type) {
        case type:
            return payload;
        case `${type}_CREATE`:
            return uniqueKey
                ? [ payload, ...state ]
                : payload;
        case `${type}_UPDATE`:
            return uniqueKey
                ? state.map(<T extends object>(item: T): T => 
                    item[uniqueKey] === payload[uniqueKey]
                        ? { ...(item as object), ...payload } as T
                        : item
                  )
                : payload
        case `${type}_DELETE`:
            return uniqueKey
                ? state.filter(item => item[uniqueKey] !== payload[uniqueKey])
                : payload;
        default:
            return state;
    }
}

export default createReducer;
