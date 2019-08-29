import React, { useReducer } from 'react';

export default (reducer, actions, initialState) => {
	const Context = React.createContext();

	const Provider = ({ children }) => {
		const [state, runMyReducer] = useReducer(reducer, initialState);

		// actions === { addBlogPost: (runMyReducer) => { return () => } }
		const boundActions = {};

		for (let key in actions) {
			boundActions[key] = actions[key](runMyReducer);
			//key === 'addBlogPost'
		}

		return <Context.Provider value={{ state, ...boundActions}}>
			{children}
		</Context.Provider>
	};

	return { Context, Provider };
};