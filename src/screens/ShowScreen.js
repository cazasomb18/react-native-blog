import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { FontAwesome } from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
	const { state } = useContext(Context);

	const blogPost = state.find((blogPost) => blogPost.id === navigation.getParam('id'));

	return (
		<View>
			<Text>{blogPost.title}</Text>
			<Text>{blogPost.content}</Text>
		</View>
	);
};

ShowScreen.navigationOptions = ({ navigation }) => {
	return {
		headerRight: (
			<TouchableOpacity 
				onPress={() => 
					navigation.navigate('Edit', { id: navigation.getParam('id') })
				}
			>
				<FontAwesome style={styles.icon} name='pencil' size={35} />
			</TouchableOpacity>
		)
	};
};

const styles = StyleSheet.create({
	icon: {
		marginRight: 10
	}
});

export default ShowScreen;

//SERIES OF STEPS TO GET CONTEXT:
//1: import { useContext } hook;
//2: destructure state value call useContext ( const {state} = useContext(Context);)
	//passing in the Context we need as a param
	//and import the context @ top
//3: create var (blogPost) search {state.find(())} state obj w/ conditional logic:
	//in this case: if blogPost.id === navigation.getParam('id')
	//after locating posts w/ matching IDs pass in {blogPost.title} to render on screen