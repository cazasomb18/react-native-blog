import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
	switch (action.type) {
		case 'delete_blogpost':
		return state.filter((blogPost) => blogPost.id !== action.payload)
		case 'add_blogpost': 
			return [
				...state, 
				{ 
					id: Math.floor(Math.random() * 99999), 
					title: action.payload.title,
					cotent: action.payload.content
				}
			];
		default:
			return state;
	};
};

const addBlogPost = runMyReducer => {
	return (title, content) => {
		runMyReducer({ type: 'add_blogpost', payload: { title, content } });
	};
};

const deleteBlogPost = runMyReducer => {
	return (id) => {
		runMyReducer({ type: 'delete_blogpost', payload: id })
	};
}

export const { Context, Provider } = createDataContext(
	blogReducer, 
	{ addBlogPost, deleteBlogPost }, 
	[]
);

//b/c app is wrapped in a custom component (BlogContext.Provider), 
//children element will be passed down as a prop from app to custom 
//component called as a prop called 'children', can use this technique
//to create custom components and accept some other component as an 
//argument, will show up in custom component as a prop called 'children',
//argument will be shown inside of our blog provider. You can actually 
//imagine that children is the <App/> component in this file