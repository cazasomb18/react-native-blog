import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';

const ShowScreen = ({ navigation }) => {
	const { state } = useContext(Context);

	const blogPost = state.find((blogPost) => blogPost.id === navigation.getParam('id'));

	return (
		<View>
			<Text>{blogPost.title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({});

export default ShowScreen;

//SERIES OF STEPS TO GET CONTEXT:
//1: import { useContext } hook;
//2: destructure state value call useContext ( const {state} = useContext(Context);)
	//passing in the Context we need as a param
	//and import the context @ top
//3: create var (blogPost) search {state.find(())} state obj w/ conditional logic:
	//in this case: if blogPost.id === navigation.getParam('id')
	//after locating posts w/ matching IDs pass in {blogPost.title} to render on screen