import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
	switch (action.type) {

		case 'get_blogposts': 
			return action.payload;

		case 'edit_blogpost':
			return state.map((blogPost) => {
				return blogPost.id === action.payload.id ? action.payload : blogPost;
			});

		case 'delete_blogpost':
			return state.filter((blogPost) => blogPost.id !== action.payload);

		default:
			return state;
	};
};

const getBlogPosts = runMyReducer => {
	return async () => {
		const response = await jsonServer.get('/blogposts');
		runMyReducer({ type: 'get_blogposts', payload: response.data });
										// response.data === [{}, {}, {}]
	};
	
};

const addBlogPost = runMyReducer => {
	return async (title, content, callback) => {
		await jsonServer.post('/blogposts', { title, content });

		if(callback) {
			callback();
		}
	};
};

const deleteBlogPost = runMyReducer => {
	return async (id) => {
		await jsonServer.delete(`/blogposts/${id}`);

		runMyReducer({ type: 'delete_blogpost', payload: id })
	};
}

const editBlogPost = runMyReducer => {
	return async (id, title, content, callback) => {
		await jsonServer.put(`/blogposts/${id}`, { title, content });

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
	{ addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts }, 
	[]
);

//b/c app is wrapped in a custom component (BlogContext.Provider), 
//children element will be passed down as a prop from app to custom 
//component called as a prop called 'children', can use this technique
//to create custom components and accept some other component as an 
//argument, will show up in custom component as a prop called 'children',
//argument will be shown inside of our blog provider. You can actually 
//imagine that children is the <App/> component in this file