import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
	switch (action.type) {
		case 'edit_blogpost':
			return state.map((blogPost) => {
				return blogPost.id === action.payload.id ? action.payload : blogPost;
			});
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
	return (title, content, callback) => {
		runMyReducer({ type: 'add_blogpost', payload: { title, content } });
		if(callback) {
			callback();
		}
	};
};

const deleteBlogPost = runMyReducer => {
	return (id) => {
		runMyReducer({ type: 'delete_blogpost', payload: id })
	};
}

const editBlogPost = runMyReducer => {
	return (id, title, content, callback) => {
		runMyReducer({ 
			type: 'edit_blogpost', 
			payload: { id, title, content }
		});
		if(callback) {
			callback();
		}
	};
};

export const { Context, Provider } = createDataContext(
	blogReducer, 
	{ addBlogPost, deleteBlogPost, editBlogPost }, 
	[{ title: 'TEST POST', content: 'TEST CONTENT', id: 1 }]
);

//b/c app is wrapped in a custom component (BlogContext.Provider), 
//children element will be passed down as a prop from app to custom 
//component called as a prop called 'children', can use this technique
//to create custom components and accept some other component as an 
//argument, will show up in custom component as a prop called 'children',
//argument will be shown inside of our blog provider. You can actually 
//imagine that children is the <App/> component in this file