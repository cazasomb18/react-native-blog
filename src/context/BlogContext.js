import React, { useReducer } from 'react';

const BlogContext = React.createContext();

const blogReducer = (state, action) => {
	switch (action.type) {
		case 'add_blogpost': 
			return [...state, { title: `Blog Post #${state.length + 1}` }];
		default:
			return state;
	}
};

export const BlogProvider = ({ children }) => {
	const [blogPosts, runMyReducer] = useReducer(blogReducer, []);

	const addBlogPost = () => {
		runMyReducer({ type: 'add_blogpost' });
	};

	return (
		<BlogContext.Provider value={{ data: blogPosts, addBlogPost }}>
			{children}
		</BlogContext.Provider>
	);
};

export default BlogContext;

//b/c app is wrapped in a custom component (BlogContext.Provider), 
//children element will be passed down as a prop from app to custom 
//component called as a prop called 'children', can use this technique
//to create custom components and accept some other component as an 
//argument, will show up in custom component as a prop called 'children',
//argument will be shown inside of our blog provider. You can actually 
//imagine that children is the <App/> component in this file